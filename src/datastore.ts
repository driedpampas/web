import type {
	Store,
	Options,
	IncrementResponse,
	ClientRateLimitInfo,
} from 'express-rate-limit'

type RLStoreOptions = {
	/**
	 * Optional field to differentiate hit counts when multiple rate-limits are in use
	 */
	prefix?: string;

	/**
	 * Cloudflare D1 database binding
	 */
	d1Binding: D1Database;
};

/**
 * A `Store` that stores the hit count for each client.
 */
class RLStore implements Store {
	prefix!: string;
	windowMs!: number;
	db!: D1Database;

	constructor(options: RLStoreOptions) {
		this.db = options.d1Binding;
		this.prefix = options.prefix ?? 'rl_';
	}

	init(options: Options): void {
		this.windowMs = options.windowMs;
	}

	prefixKey(key: string): string {
		return `${this.prefix}${key}`;
	}

	async get(key: string): Promise<ClientRateLimitInfo | undefined> {
		const prefixedKey = this.prefixKey(key);
		const result = await this.db.prepare(`SELECT totalHits, resetTime FROM rate_limits WHERE key = ?`).bind(prefixedKey).first();
		if (result) {
			return {
				totalHits: result.totalHits as number,
				resetTime: new Date(result.resetTime as string)
			};
		}
		return undefined;
	}

	async increment(key: string): Promise<IncrementResponse> {
		const prefixedKey = this.prefixKey(key);
		let result = await this.db.prepare(`SELECT totalHits, resetTime FROM rate_limits WHERE key = ?`).bind(prefixedKey).first();
		if (result) {
			const totalHits = result.totalHits as number + 1;
			await this.db.prepare(`UPDATE rate_limits SET totalHits = ? WHERE key = ?`).bind(totalHits, prefixedKey).run();
			return {
				totalHits,
				resetTime: new Date(result.resetTime as string)
			};
		} else {
			const resetTime = Date.now() + this.windowMs;
			await this.db.prepare(`INSERT INTO rate_limits (key, totalHits, resetTime) VALUES (?, ?, ?)`).bind(prefixedKey, 1, resetTime).run();
			return {
				totalHits: 1,
				resetTime: new Date(resetTime)
			};
		}
	}

	async decrement(key: string): Promise<void> {
		const prefixedKey = this.prefixKey(key);
		const result = await this.db.prepare(`SELECT totalHits FROM rate_limits WHERE key = ?`).bind(prefixedKey).first();
		if (result && result.totalHits as number > 0) {
			const totalHits = result.totalHits as number - 1;
			await this.db.prepare(`UPDATE rate_limits SET totalHits = ? WHERE key = ?`).bind(totalHits, prefixedKey).run();
		}
	}

	async resetKey(key: string): Promise<void> {
		const prefixedKey = this.prefixKey(key);
		await this.db.prepare(`DELETE FROM rate_limits WHERE key = ?`).bind(prefixedKey).run();
	}

	async resetAll(): Promise<void> {
		await this.db.prepare(`DELETE FROM rate_limits`).run();
	}
}

// Export the store so others can use it
export default RLStore;

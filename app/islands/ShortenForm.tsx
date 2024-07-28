import { useState } from 'hono/jsx';

const ShortenForm = () => {
  const [link, setLink] = useState('');
  const [shortenedLink, setShortenedLink] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setIsError(false);

    try {
      const response = await fetch('/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ src: link }), // Sending the original link as 'src'
      });

      if (response.ok) {
        const data: any = await response.json();
        setShortenedLink(data.url); // Extracting the shortened link from the JSON response
      } else {
        const data: any = response;
        setIsError(true);
        setShortenedLink(data.statusText);
        console.error('Failed to shorten the link');
      }
    } catch (error) {
      console.error('An error occurred while shortening the link:', error);
      setIsError(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="link-input"
          name="link"
          placeholder="Enter a link"
          value={link}
          onChange={(e) => setLink((e.target as HTMLInputElement)?.value)}
          required
        />
        <button type="submit" id="submit-link">Submit</button>
      </form>
      {shortenedLink && (
        <div id="shortened-link">
          {isError ? (
            <span>{shortenedLink}</span>
          ) : (
            <a className="Sa" href={shortenedLink}>{shortenedLink}</a>
          )}
        </div>
      )}
    </div>
  );
};

export default ShortenForm;
import { default as GetRoute } from './get';
import { default as AddRoute } from './add';
import { default as Shorten } from './page';
import { default as LoginPage } from './user';
import { default as LinksPage } from './links';
import { default as Access } from './access'

export function initializeRoutes(app: any) {
    GetRoute(app);
    AddRoute(app);
    Shorten(app);
    LoginPage(app);
    LinksPage(app);
    Access(app)
}
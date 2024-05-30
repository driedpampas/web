import { default as GetRoute } from './get';
import { default as AddRoute } from './add';
import { default as AddPage } from './page';
import { default as LoginPage } from './login';
import { default as LinksPage } from './links';

export function initializeRoutes(app: any) {
    GetRoute(app);
    AddRoute(app);
    AddPage(app);
    LoginPage(app);
    LinksPage(app);
}
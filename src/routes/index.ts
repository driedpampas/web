import { default as GetRoute } from '../interact/get';
import { default as AddRoute } from '../interact/add';
import { default as Shorten } from './page';
import { default as LoginPage } from '../accounts/user';
import { default as Remove } from '../accounts/remove';
import { default as LinksPage } from './links';
import { default as Generic } from './generic'

export function initializeRoutes(app: any) {
    GetRoute(app);
    AddRoute(app);
    Shorten(app);
    LoginPage(app);
    LinksPage(app);
    Generic(app);
    Remove(app);
}
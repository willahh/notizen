// https://docs.mongodb.com/realm/web/quickstart/
import * as Realm from 'realm-web';

export const REALM_APP_ID = 'notizenrealmapp-lcmoi'; // e.g. myapp-abcde
export const app: Realm.App = new Realm.App({ id: REALM_APP_ID });


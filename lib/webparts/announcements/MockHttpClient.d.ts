/// <reference types="es6-promise" />
import { ISPList } from './AnnouncementsWebPart';
export default class MockHttpClient {
    private static _items;
    static get(): Promise<ISPList[]>;
}

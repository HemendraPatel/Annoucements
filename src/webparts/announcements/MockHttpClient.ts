import { ISPList } from './AnnouncementsWebPart';

export default class MockHttpClient  {

    private static _items: ISPList[] = [{ Title: 'Test Announcement 1', Id: '1', Expires: '2017-04-22T04:00:00Z' },
                                        { Title: 'Test Announcement 2', Id: '2', Expires: '2017-03-24T04:00:00Z'},
                                        { Title: 'Test Announcement 3', Id: '3', Expires: '2017-01-12T04:00:00Z'}];

    public static get(): Promise<ISPList[]> {
    return new Promise<ISPList[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }
}

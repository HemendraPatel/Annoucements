import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
import { IAnnouncementsWebPartProps } from './IAnnouncementsWebPartProps';
export interface ISPLists {
    value: ISPList[];
}
export interface ISPList {
    Title: string;
    Id: string;
    Expires: string;
}
export default class AnnouncementsWebPart extends BaseClientSideWebPart<IAnnouncementsWebPartProps> {
    private _getListData();
    private _getMockListData();
    private _getMonthYear(datestr);
    private _getDay(datestr);
    private _renderListAsync();
    private _renderList(items);
    render(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}

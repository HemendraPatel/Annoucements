import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

/* Hemendra Patel - Import SP Environment Interactions */
import { escape } from '@microsoft/sp-lodash-subset';
/* Hemendra Patel - Update/Import Style for calendarDate */
import styles from './Announcements.module.scss';

import * as strings from 'announcementsStrings';
import { IAnnouncementsWebPartProps } from './IAnnouncementsWebPartProps';

/* Hemendra Patel - ADD Code for Sample Data If rendered on local workbench */
import MockHttpClient from './MockHttpClient';
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';

/* Hemendra Patel - Define/Export Interface for SP List */
export interface ISPLists {
    value: ISPList[];
}
/* Hemendra Patel - Define/Export Announcement List Columns */
export interface ISPList {
    Title: string;
    Id: string;
    Expires: string;
}

export default class AnnouncementsWebPart extends BaseClientSideWebPart<IAnnouncementsWebPartProps> {

/* My Code start here */
/*
private _getListData(): Promise<ISPLists> {
  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {
      return response.json();
    });
}
*/

/* Hemendra Patel - Get All SP Announcements from SP List */
private _getListData(): Promise<ISPLists> {
return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('Announcements')/Items`, SPHttpClient.configurations.v1)
  .then((response: SPHttpClientResponse) => {
  return response.json();
  });
}

/* Hemendra Patel - Get All Sample Announcements from Mock List */
private _getMockListData(): Promise<ISPLists> {
      return MockHttpClient.get()
        .then((data: ISPList[]) => {
          var listData: ISPLists = { value: data };
          return listData;
        }) as Promise<ISPLists>;
}

/* Hemendra Patel - Format Date into Month Year */
private _getMonthYear (datestr: string): string {
 var months:string[];
 months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 var mth: number = parseInt(datestr.substring(5, 7)) - 1;
 return (months[mth] + " " + datestr.substring(0, 4));
}

/* Hemendra Patel - Format Date into Day */
private _getDay (datestr: string): string {
 return (datestr.substring(8, 10));
}

/* Hemendra Patel - Check Environment and Render Results */
private _renderListAsync(): void {
    // Local environment
    if (Environment.type === EnvironmentType.Local) {
      this._getMockListData().then((response) => {
        this._renderList(response.value);
      });
    }
    else if (Environment.type == EnvironmentType.SharePoint ||
              Environment.type == EnvironmentType.ClassicSharePoint) {
        this._getListData()
        .then((response) => {
          this._renderList(response.value);
        });
    }
}

private _renderList(items: ISPList[]): void {
/*  let html: string = '';
  items.forEach((item: ISPList) => {
    html += `
      <ul class="${styles.list}">
          <li class="${styles.listItem}">
              <span class="ms-font-l">${item.Title}</span>
          </li>
      </ul>`;
  });

  const listContainer: Element = this.domElement.querySelector('#spListContainer');
  listContainer.innerHTML = html;
*/

  let html: string = '<table width=100% border-collapse: collapse; >';
  items.forEach((item: ISPList) => {
    html = html + `
        <tr>
        <td width=10%>
        <div class="${styles.calendarDate}">
            <strong>${this._getMonthYear(item.Expires)}</strong>
            <span>${this._getDay(item.Expires)}</span>
        </div>
        <td>
        <p class="ms-font-l ms-fontColor-black">${item.Title}</p>
        </td>
    </tr>
    `;
  });
  html += `</table>`;

  const listContainer: Element = this.domElement.querySelector('#spListContainer');
  listContainer.innerHTML = html;
}

/* My Code end here */
  public render(): void {
  this.domElement.innerHTML = `
    <div class="${styles.helloWorld}">
      <p class="ms-font-l ms-fontColor-black">Loading from ${escape(this.context.pageContext.web.title)}</p>
      <div id="spListContainer" />
    </div>`;
  this._renderListAsync();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

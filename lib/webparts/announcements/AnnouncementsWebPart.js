"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
/* Hemendra Patel - Import SP Environment Interactions */
var sp_lodash_subset_1 = require("@microsoft/sp-lodash-subset");
/* Hemendra Patel - Update/Import Style for calendarDate */
var Announcements_module_scss_1 = require("./Announcements.module.scss");
var strings = require("announcementsStrings");
/* Hemendra Patel - ADD Code for Sample Data If rendered on local workbench */
var MockHttpClient_1 = require("./MockHttpClient");
var sp_core_library_2 = require("@microsoft/sp-core-library");
var sp_http_1 = require("@microsoft/sp-http");
var AnnouncementsWebPart = (function (_super) {
    __extends(AnnouncementsWebPart, _super);
    function AnnouncementsWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    AnnouncementsWebPart.prototype._getListData = function () {
        return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('Announcements')/Items", sp_http_1.SPHttpClient.configurations.v1)
            .then(function (response) {
            return response.json();
        });
    };
    /* Hemendra Patel - Get All Sample Announcements from Mock List */
    AnnouncementsWebPart.prototype._getMockListData = function () {
        return MockHttpClient_1.default.get()
            .then(function (data) {
            var listData = { value: data };
            return listData;
        });
    };
    /* Hemendra Patel - Format Date into Month Year */
    AnnouncementsWebPart.prototype._getMonthYear = function (datestr) {
        var months;
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var mth = parseInt(datestr.substring(5, 7)) - 1;
        return (months[mth] + " " + datestr.substring(0, 4));
    };
    /* Hemendra Patel - Format Date into Day */
    AnnouncementsWebPart.prototype._getDay = function (datestr) {
        return (datestr.substring(8, 10));
    };
    /* Hemendra Patel - Check Environment and Render Results */
    AnnouncementsWebPart.prototype._renderListAsync = function () {
        var _this = this;
        // Local environment
        if (sp_core_library_2.Environment.type === sp_core_library_2.EnvironmentType.Local) {
            this._getMockListData().then(function (response) {
                _this._renderList(response.value);
            });
        }
        else if (sp_core_library_2.Environment.type == sp_core_library_2.EnvironmentType.SharePoint ||
            sp_core_library_2.Environment.type == sp_core_library_2.EnvironmentType.ClassicSharePoint) {
            this._getListData()
                .then(function (response) {
                _this._renderList(response.value);
            });
        }
    };
    AnnouncementsWebPart.prototype._renderList = function (items) {
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
        var _this = this;
        var html = '<table width=100% border-collapse: collapse; >';
        items.forEach(function (item) {
            html = html + ("\n        <tr>\n        <td width=10%>\n        <div class=\"" + Announcements_module_scss_1.default.calendarDate + "\">\n            <strong>" + _this._getMonthYear(item.Expires) + "</strong>\n            <span>" + _this._getDay(item.Expires) + "</span>\n        </div>\n        <td>\n        <p class=\"ms-font-l ms-fontColor-black\">" + item.Title + "</p>\n        </td>\n    </tr>\n    ");
        });
        html += "</table>";
        var listContainer = this.domElement.querySelector('#spListContainer');
        listContainer.innerHTML = html;
    };
    /* My Code end here */
    AnnouncementsWebPart.prototype.render = function () {
        this.domElement.innerHTML = "\n    <div class=\"" + Announcements_module_scss_1.default.helloWorld + "\">\n      <p class=\"ms-font-l ms-fontColor-black\">Loading from " + sp_lodash_subset_1.escape(this.context.pageContext.web.title) + "</p>\n      <div id=\"spListContainer\" />\n    </div>";
        this._renderListAsync();
    };
    Object.defineProperty(AnnouncementsWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    AnnouncementsWebPart.prototype.getPropertyPaneConfiguration = function () {
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
                                sp_webpart_base_1.PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return AnnouncementsWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AnnouncementsWebPart;

//# sourceMappingURL=AnnouncementsWebPart.js.map

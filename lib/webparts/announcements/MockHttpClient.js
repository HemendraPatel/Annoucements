"use strict";
var MockHttpClient = (function () {
    function MockHttpClient() {
    }
    MockHttpClient.get = function () {
        return new Promise(function (resolve) {
            resolve(MockHttpClient._items);
        });
    };
    return MockHttpClient;
}());
MockHttpClient._items = [{ Title: 'Test Announcement 1', Id: '1', Expires: '2017-04-22T04:00:00Z' },
    { Title: 'Test Announcement 2', Id: '2', Expires: '2017-03-24T04:00:00Z' },
    { Title: 'Test Announcement 3', Id: '3', Expires: '2017-01-12T04:00:00Z' }];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MockHttpClient;

//# sourceMappingURL=MockHttpClient.js.map

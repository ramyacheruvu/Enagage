"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular2_toaster_1 = require("angular2-toaster");
var ToasterHelperService = /** @class */ (function () {
    function ToasterHelperService(toasterService) {
        this.toasterConfig = new angular2_toaster_1.ToasterConfig({
            positionClass: 'toast-bottom-right',
            animation: 'fade',
            showCloseButton: false,
            timeout: 10000
        });
        this._toasterService = toasterService;
    }
    ToasterHelperService.prototype.popErrorToast = function () {
        var toast = {
            type: 'error',
            title: 'Error',
            body: 'Something is wrong. Contact adminstrator.',
        };
        this._toasterService.pop(toast);
    };
    ToasterHelperService.prototype.popSaveSuccessToast = function () {
        var toast = {
            type: 'success',
            title: 'Success',
            body: 'Save sucess.',
        };
        this._toasterService.pop(toast);
    };
    ToasterHelperService.prototype.getConfig = function () {
        return this.toasterConfig;
    };
    return ToasterHelperService;
}());
exports.ToasterHelperService = ToasterHelperService;
//# sourceMappingURL=toaster-helper.js.map
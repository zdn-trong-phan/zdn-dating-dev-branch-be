"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.CloudinaryController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var CloudinaryController = /** @class */ (function () {
    function CloudinaryController(_cloudinaryService) {
        this._cloudinaryService = _cloudinaryService;
    }
    CloudinaryController.prototype.uploadImage = function (files) {
        return this._cloudinaryService.uploadImagesToCloudinary(files);
    };
    __decorate([
        common_1.Post('upload'),
        common_1.UseInterceptors(platform_express_1.FilesInterceptor('files')),
        __param(0, common_1.UploadedFiles())
    ], CloudinaryController.prototype, "uploadImage");
    CloudinaryController = __decorate([
        common_1.Controller()
    ], CloudinaryController);
    return CloudinaryController;
}());
exports.CloudinaryController = CloudinaryController;

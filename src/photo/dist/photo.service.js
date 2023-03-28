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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PhotoService = void 0;
var typeorm_1 = require("@nestjs/typeorm");
var common_1 = require("@nestjs/common");
var photo_entity_1 = require("./entities/photo.entity");
var PhotoService = /** @class */ (function () {
    function PhotoService(_photo, _cloudinaryService) {
        this._photo = _photo;
        this._cloudinaryService = _cloudinaryService;
    }
    PhotoService.prototype.getPhotoByUserId = function (user) {
        return __awaiter(this, void 0, Promise, function () {
            var id, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = user.id;
                        return [4 /*yield*/, this._photo.find({ where: { userId: id } })];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, {
                                statusCode: common_1.HttpStatus.OK,
                                data: result
                            }];
                    case 2:
                        err_1 = _a.sent();
                        throw new common_1.BadRequestException(common_1.HttpStatus.BAD_REQUEST, err_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PhotoService.prototype.uploadImages = function (files, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._cloudinaryService.uploadImagesToCloudinary(files)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [4 /*yield*/, this.storeImages(userId, result.data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                statusCode: common_1.HttpStatus.CREATED,
                                message: 'Uploaded'
                            }];
                    case 3:
                        err_2 = _a.sent();
                        console.log(err_2.message);
                        throw new common_1.BadRequestException(common_1.HttpStatus.BAD_REQUEST, 'Upload images failed');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PhotoService.prototype.storeImages = function (userId, images) {
        return __awaiter(this, void 0, void 0, function () {
            var i, err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < images.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._photo.save({
                                userId: userId,
                                photoUrl: images[i].photoUrl,
                                publicId: images[i].publicId,
                                isFavorite: false
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_3 = _a.sent();
                        // store url failed => delete in cloudinary
                        console.log('Store failed');
                        images.map(function (i) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this._cloudinaryService.deleteImagesInCloudinary(i.publicId)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        throw new common_1.BadRequestException(common_1.HttpStatus.FAILED_DEPENDENCY, 'Store photo failed');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PhotoService.prototype.deleteImage = function (userId, publicId) {
        return __awaiter(this, void 0, Promise, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        // const { userId, publicId } = deleteReq;
                        return [4 /*yield*/, this._photo["delete"]({
                                userId: userId,
                                publicId: publicId
                            })];
                    case 1:
                        // const { userId, publicId } = deleteReq;
                        _a.sent();
                        return [4 /*yield*/, this._cloudinaryService.deleteImagesInCloudinary(publicId)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                statusCode: common_1.HttpStatus.NO_CONTENT,
                                message: 'Deleted'
                            }];
                    case 3:
                        err_4 = _a.sent();
                        throw new common_1.BadRequestException(common_1.HttpStatus.BAD_REQUEST, 'Delete Failed');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PhotoService.prototype.updateImage = function (file, userId, publicId) {
        return __awaiter(this, void 0, Promise, function () {
            var err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._photo["delete"]({ publicId: publicId })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._cloudinaryService.updateImagesInCloudinary(publicId, file)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                statusCode: common_1.HttpStatus.NO_CONTENT,
                                message: "Updated"
                            }];
                    case 3:
                        err_5 = _a.sent();
                        throw new common_1.BadRequestException(common_1.HttpStatus.BAD_REQUEST, 'Update image failed');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PhotoService.prototype.updateFavorite = function (userId, publicId) {
        return __awaiter(this, void 0, Promise, function () {
            var err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._photo.update({
                                isFavorite: true
                            }, {
                                userId: userId,
                                publicId: publicId
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                statusCode: common_1.HttpStatus.NO_CONTENT,
                                message: "Updated favorite"
                            }];
                    case 2:
                        err_6 = _a.sent();
                        throw new common_1.BadRequestException(common_1.HttpStatus.BAD_REQUEST, 'Update favorite failed');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        __param(0, common_1.UploadedFiles())
    ], PhotoService.prototype, "uploadImages");
    __decorate([
        __param(0, common_1.UploadedFile())
    ], PhotoService.prototype, "updateImage");
    PhotoService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(photo_entity_1.Photo))
    ], PhotoService);
    return PhotoService;
}());
exports.PhotoService = PhotoService;

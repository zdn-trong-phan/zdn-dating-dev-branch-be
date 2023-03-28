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
exports.ProfileService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var profile_entity_1 = require("./entities/profile.entity");
var ProfileService = /** @class */ (function () {
    function ProfileService(_profileRepository) {
        this._profileRepository = _profileRepository;
    }
    ProfileService.prototype.create = function (createProfileDto) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._profileRepository.create(createProfileDto)];
                    case 1:
                        profile = _a.sent();
                        return [2 /*return*/, profile];
                    case 2:
                        err_1 = _a.sent();
                        throw new common_1.BadRequestException(err_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProfileService.prototype.save = function (createProfileDto) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._profileRepository.save(createProfileDto)];
                    case 1:
                        profile = _a.sent();
                        return [2 /*return*/, profile];
                    case 2:
                        err_2 = _a.sent();
                        throw new common_1.BadRequestException(err_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProfileService.prototype.findOneByUserId = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var profile, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('userId: ', userId);
                        return [4 /*yield*/, this._profileRepository.findOne({
                                where: { userId: userId }
                            })];
                    case 1:
                        profile = _a.sent();
                        console.log('profile: ', profile);
                        if (!profile) {
                            throw new common_1.HttpException('No profile found with that id!', common_1.HttpStatus.NOT_FOUND);
                        }
                        return [2 /*return*/, {
                                statusCode: common_1.HttpStatus.OK,
                                data: profile
                            }];
                    case 2:
                        err_3 = _a.sent();
                        throw new common_1.BadRequestException(err_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProfileService.prototype.update = function (userId, updateProfileDto) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, updatedProfile, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.findOneByUserId(userId)];
                    case 1:
                        profile = _a.sent();
                        updatedProfile = Object.assign(profile, updateProfileDto);
                        return [4 /*yield*/, this._profileRepository.save(updatedProfile)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_4 = _a.sent();
                        throw new common_1.BadRequestException(err_4.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProfileService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(profile_entity_1.Profile))
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;

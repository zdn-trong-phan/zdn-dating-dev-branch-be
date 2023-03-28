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
exports.ProfileController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var auth_guard_1 = require("../auth/guards/auth.guard");
var user_decorator_1 = require("../user/decorator/user.decorator");
var ProfileController = /** @class */ (function () {
    function ProfileController(profileService) {
        this.profileService = profileService;
    }
    ProfileController.prototype.create = function (createProfileDto) {
        return this.profileService.create(createProfileDto);
    };
    ProfileController.prototype.findProfile = function (user) {
        return this.profileService.findOneByUserId(user.id);
    };
    ProfileController.prototype.update = function (user, updateProfileDto) {
        return this.profileService.update(user.id, updateProfileDto);
    };
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body())
    ], ProfileController.prototype, "create");
    __decorate([
        swagger_1.ApiBearerAuth(),
        common_1.UseGuards(auth_guard_1.AuthenticationGuard),
        common_1.Get(),
        __param(0, user_decorator_1.User())
    ], ProfileController.prototype, "findProfile");
    __decorate([
        swagger_1.ApiBearerAuth(),
        common_1.UseGuards(auth_guard_1.AuthenticationGuard),
        common_1.Put(),
        __param(0, user_decorator_1.User()),
        __param(1, common_1.Body())
    ], ProfileController.prototype, "update");
    ProfileController = __decorate([
        common_1.Controller('profile')
    ], ProfileController);
    return ProfileController;
}());
exports.ProfileController = ProfileController;

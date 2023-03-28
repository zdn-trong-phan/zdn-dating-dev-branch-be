"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var user_module_1 = require("./user/user.module");
var profile_module_1 = require("./profile/profile.module");
var notification_module_1 = require("./notification/notification.module");
var conversation_module_1 = require("./conversation/conversation.module");
var message_module_1 = require("./message/message.module");
var match_module_1 = require("./match/match.module");
var black_list_module_1 = require("./black-list/black-list.module");
var photo_module_1 = require("./photo/photo.module");
var typeorm_1 = require("@nestjs/typeorm");
var config_1 = require("@nestjs/config");
var location_module_1 = require("./location/location.module");
var dotenv_1 = require("dotenv");
var auth_module_1 = require("./auth/auth.module");
var user_entity_1 = require("./user/entities/user.entity");
var profile_entity_1 = require("./profile/entities/profile.entity");
var match_entity_1 = require("./match/entities/match.entity");
var notification_entity_1 = require("./notification/entities/notification.entity");
var location_entity_1 = require("./location/entities/location.entity");
var conversation_entity_1 = require("./conversation/entities/conversation.entity");
var message_entity_1 = require("./message/entities/message.entity");
var black_list_entity_1 = require("./black-list/entities/black-list.entity");
var photo_entity_1 = require("./photo/entities/photo.entity");
var cloudinary_module_1 = require("./cloudinary/cloudinary.module");
dotenv_1.config();
var entities = [
    user_entity_1.User,
    profile_entity_1.Profile,
    match_entity_1.Match,
    photo_entity_1.Photo,
    notification_entity_1.Notification,
    black_list_entity_1.BlackList,
    location_entity_1.Location,
    message_entity_1.Message,
    conversation_entity_1.Conversation,
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: function (configService) { return ({
                        type: 'postgres',
                        host: configService.get('DATABASE_ZODINET_HOST'),
                        port: configService.get('DATABASE_PORT'),
                        username: configService.get('DATABASE_USERNAME'),
                        password: configService.get('DATABASE_PASSWORD'),
                        database: configService.get('DATABASE_NAME'),
                        entities: __spreadArrays(entities)
                    }); }
                }),
                user_module_1.UserModule,
                profile_module_1.ProfileModule,
                notification_module_1.NotificationModule,
                black_list_module_1.BlackListModule,
                match_module_1.MatchModule,
                conversation_module_1.ConversationModule,
                message_module_1.MessageModule,
                photo_module_1.PhotoModule,
                location_module_1.LocationModule,
                auth_module_1.AuthModule,
                cloudinary_module_1.CloudinaryModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

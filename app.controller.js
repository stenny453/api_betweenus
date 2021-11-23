"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const app_service_1 = require("./app.service");
const model_auth_guard_1 = require("./users/model/guards/model-auth.guard");
const user_decorator_1 = require("./decorators/user.decorator");
const jwt_admin_auth_guard_1 = require("./admin/guards/jwt-admin-auth.guard");
const app_gateway_1 = require("./app.gateway");
const path_upload = 'https://betweenus-live.com/uploads/';
let AppController = class AppController {
    constructor(appService, configService, appGateway) {
        this.appService = appService;
        this.configService = configService;
        this.appGateway = appGateway;
    }
    getHello() {
        return this.appService.getHello();
    }
    uploadFiles(files) {
        return {
            "path_recto": path_upload + files.file_recto[0].filename,
            "path_verso": path_upload + files.file_verso[0].filename,
            "path_cin": path_upload + files.file_cin[0].filename,
            "path_soft": path_upload + files.file_soft[0].filename
        };
    }
    uploadAlbums(files) {
        const paths = [];
        for (let index = 0; index < files.length; index++) {
            paths.push(path_upload + files[index].filename);
        }
        return {
            paths: paths
        };
    }
    updateProfile(file) {
        return {
            path: path_upload + file.filename
        };
    }
    async verifyToken(data, user) {
        return {
            role: user.role
        };
    }
    async verifyAdminToken(data, user) {
        return {
            role: user.role
        };
    }
    async responseCentralPay(data) {
        console.log('Response Central Pay ', data);
        return await this.appGateway.responseCentralPay(data.object.paymentRequestId, data);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Post('modelsary'),
    common_1.UseInterceptors(platform_express_1.FileFieldsInterceptor([
        { name: 'file_recto', maxCount: 1 },
        { name: 'file_verso', maxCount: 1 },
        { name: 'file_cin', maxCount: 1 },
        { name: 'file_soft', maxCount: 1 },
    ])),
    __param(0, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadFiles", null);
__decorate([
    common_1.Post('upload/album'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('files')),
    __param(0, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadAlbums", null);
__decorate([
    common_1.Post('upload/profile'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateProfile", null);
__decorate([
    common_1.UseGuards(model_auth_guard_1.ModelAuthGuard),
    common_1.Post('verify_token'),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "verifyToken", null);
__decorate([
    common_1.UseGuards(jwt_admin_auth_guard_1.JwtAdminAuthGuard),
    common_1.Post('verify_admin_token'),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "verifyAdminToken", null);
__decorate([
    common_1.Post('responseCentralPay'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "responseCentralPay", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        config_1.ConfigService,
        app_gateway_1.AppGateway])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map
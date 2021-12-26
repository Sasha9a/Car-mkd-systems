/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const logger_middleware_1 = __webpack_require__("./apps/api/src/app/core/middlewares/logger.middleware.ts");
const auth_module_1 = __webpack_require__("./apps/api/src/app/modules/auth/auth.module.ts");
const category_module_1 = __webpack_require__("./apps/api/src/app/modules/category/category.module.ts");
const file_module_1 = __webpack_require__("./apps/api/src/app/modules/file/file.module.ts");
const model_car_module_1 = __webpack_require__("./apps/api/src/app/modules/model-car/model.car.module.ts");
const product_module_1 = __webpack_require__("./apps/api/src/app/modules/product/product.module.ts");
const user_module_1 = __webpack_require__("./apps/api/src/app/modules/user/user.module.ts");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const environment_1 = __webpack_require__("./apps/api/src/environments/environment.ts");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes({
            path: '*',
            method: common_1.RequestMethod.ALL
        });
    }
};
AppModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot(environment_1.environment.connection.db),
            common_1.forwardRef(() => auth_module_1.AuthModule),
            user_module_1.UserModule,
            model_car_module_1.ModelCarModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
            file_module_1.FileModule
        ],
        controllers: [],
        providers: []
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/api/src/app/core/decorators/role.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__("@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => common_1.SetMetadata(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),

/***/ "./apps/api/src/app/core/guards/jwt-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends passport_1.AuthGuard('jwt') {
};
JwtAuthGuard = tslib_1.__decorate([
    common_1.Injectable()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),

/***/ "./apps/api/src/app/core/guards/role.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const role_decorator_1 = __webpack_require__("./apps/api/src/app/core/decorators/role.decorator.ts");
const user_service_1 = __webpack_require__("./apps/api/src/app/modules/user/user.service.ts");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
let RoleGuard = class RoleGuard {
    constructor(reflector, userService) {
        this.reflector = reflector;
        this.userService = userService;
    }
    canActivate(context) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const requiredRoles = this.reflector.getAllAndOverride(role_decorator_1.ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ]);
            if (!requiredRoles) {
                return true;
            }
            const { user } = context.switchToHttp().getRequest();
            if (!user) {
                return false;
            }
            const verifyUser = yield this.userService.findById(user._id);
            if (!verifyUser) {
                return false;
            }
            return requiredRoles.some((role) => { var _a; return (_a = verifyUser.roles) === null || _a === void 0 ? void 0 : _a.includes(role); });
        });
    }
};
RoleGuard = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(1, common_1.Inject(common_1.forwardRef(() => user_service_1.UserService))),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object])
], RoleGuard);
exports.RoleGuard = RoleGuard;


/***/ }),

/***/ "./apps/api/src/app/core/middlewares/logger.middleware.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerMiddleware = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const moment = __webpack_require__("moment-timezone");
let LoggerMiddleware = class LoggerMiddleware {
    use(req, res, next) {
        let result = `[${moment().format('HH:mm:ss DD.MM.YYYY')}][${req.method} ${req.url} ${JSON.stringify(req.query)}]`;
        result = result.concat(` ${JSON.stringify(req.body)}`);
        console.log(result);
        next();
    }
};
LoggerMiddleware = tslib_1.__decorate([
    common_1.Injectable()
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;


/***/ }),

/***/ "./apps/api/src/app/core/pipes/validate.object.id.pipes.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidateObjectId = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose = __webpack_require__("mongoose");
let ValidateObjectId = class ValidateObjectId {
    transform(value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const isValid = mongoose.Types.ObjectId.isValid(value);
            if (!isValid)
                throw new common_1.BadRequestException('Invalid ID!');
            return value;
        });
    }
};
ValidateObjectId = tslib_1.__decorate([
    common_1.Injectable()
], ValidateObjectId);
exports.ValidateObjectId = ValidateObjectId;


/***/ }),

/***/ "./apps/api/src/app/modules/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const jwt_auth_guard_1 = __webpack_require__("./apps/api/src/app/core/guards/jwt-auth.guard.ts");
const role_guard_1 = __webpack_require__("./apps/api/src/app/core/guards/role.guard.ts");
const auth_service_1 = __webpack_require__("./apps/api/src/app/modules/auth/auth.service.ts");
const jwt_strategy_1 = __webpack_require__("./apps/api/src/app/modules/auth/jwt.strategy.ts");
const user_module_1 = __webpack_require__("./apps/api/src/app/modules/user/user.module.ts");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const environment_1 = __webpack_require__("./apps/api/src/environments/environment.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => user_module_1.UserModule),
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt',
                property: 'user',
                session: true
            }),
            jwt_1.JwtModule.register({
                secret: environment_1.environment.connection.secret,
                signOptions: {
                    expiresIn: environment_1.environment.connection.expiresIn
                }
            })
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./apps/api/src/app/modules/auth/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    login(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payload = { user: { _id: user._id, login: user.login, roles: user.roles } };
            return {
                accessToken: this.jwtService.sign(payload)
            };
        });
    }
};
AuthService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./apps/api/src/app/modules/auth/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const environment_1 = __webpack_require__("./apps/api/src/environments/environment.ts");
let JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: environment_1.environment.connection.secret,
        });
    }
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return payload.user;
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./apps/api/src/app/modules/category/category.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryController = void 0;
const tslib_1 = __webpack_require__("tslib");
const role_decorator_1 = __webpack_require__("./apps/api/src/app/core/decorators/role.decorator.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/api/src/app/core/guards/jwt-auth.guard.ts");
const role_guard_1 = __webpack_require__("./apps/api/src/app/core/guards/role.guard.ts");
const validate_object_id_pipes_1 = __webpack_require__("./apps/api/src/app/core/pipes/validate.object.id.pipes.ts");
const category_service_1 = __webpack_require__("./apps/api/src/app/modules/category/category.service.ts");
const product_service_1 = __webpack_require__("./apps/api/src/app/modules/product/product.service.ts");
const category_form_dto_1 = __webpack_require__("./libs/shared/src/dtos/category/category.form.dto.ts");
const characteristic_form_dto_1 = __webpack_require__("./libs/shared/src/dtos/category/characteristic.form.dto.ts");
const role_enum_1 = __webpack_require__("./libs/shared/src/enums/role.enum.ts");
const common_1 = __webpack_require__("@nestjs/common");
const express_1 = __webpack_require__("express");
let CategoryController = class CategoryController {
    constructor(categoryService, productService) {
        this.categoryService = categoryService;
        this.productService = productService;
    }
    getAll(res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryService.findAll();
            return res.status(common_1.HttpStatus.OK).json(category).end();
        });
    }
    getAllDropdown(res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryService.findAllDropdown();
            return res.status(common_1.HttpStatus.OK).json(category).end();
        });
    }
    getCategory(res, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryService.findCategory(id);
            if (!category) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send("Категория не существует").end();
            }
            return res.status(common_1.HttpStatus.OK).json(category).end();
        });
    }
    createCharacteristic(res, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryService.checkCategory(body.category._id);
            if (!category) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({ category: "Категория не существует" }).end();
            }
            const createdCharacteristic = yield this.categoryService.createCharacteristic(body);
            yield this.categoryService.addCharacteristicToCategory(createdCharacteristic);
            return res.status(common_1.HttpStatus.CREATED).json(createdCharacteristic).end();
        });
    }
    createCategory(res, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const createdCategory = yield this.categoryService.createCategory(body);
            return res.status(common_1.HttpStatus.CREATED).json(createdCategory).end();
        });
    }
    updateCategory(res, id, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedCategory = yield this.categoryService.updateCategory(id, body);
            if (!updatedCategory) {
                throw new common_1.NotFoundException("Нет такого объекта!");
            }
            return res.status(common_1.HttpStatus.OK).json(updatedCategory).end();
        });
    }
    updateCharacteristic(res, id, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedCharacteristic = yield this.categoryService.updateCharacteristic(id, body);
            if (!updatedCharacteristic) {
                throw new common_1.NotFoundException("Нет такого объекта!");
            }
            return res.status(common_1.HttpStatus.OK).json(updatedCharacteristic).end();
        });
    }
    updateOrderCharacteristics(res, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.categoryService.updateOrderCharacteristics(body);
            return res.status(common_1.HttpStatus.OK).end();
        });
    }
    deleteCategory(res, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deletedCategory = yield this.categoryService.deleteCategory(id);
            if (!deletedCategory) {
                throw new common_1.NotFoundException("Нет такого объекта!");
            }
            yield this.productService.isPublicToFalse(deletedCategory);
            return res.status(common_1.HttpStatus.OK).end();
        });
    }
    deleteCharacteristic(res, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deletedCharacteristic = yield this.categoryService.deleteCharacteristic(id);
            if (!deletedCharacteristic) {
                throw new common_1.NotFoundException("Нет такого объекта!");
            }
            return res.status(common_1.HttpStatus.OK).end();
        });
    }
};
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Get(),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "getAll", null);
tslib_1.__decorate([
    common_1.Get('/all'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "getAllDropdown", null);
tslib_1.__decorate([
    common_1.Get('/:id'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategory", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Post('/characteristic'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object, typeof (_e = typeof characteristic_form_dto_1.CharacteristicFormDto !== "undefined" && characteristic_form_dto_1.CharacteristicFormDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "createCharacteristic", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Post(),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object, typeof (_g = typeof category_form_dto_1.CategoryFormDto !== "undefined" && category_form_dto_1.CategoryFormDto) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Put('/:id'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())),
    tslib_1.__param(2, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object, String, typeof (_j = typeof category_form_dto_1.CategoryFormDto !== "undefined" && category_form_dto_1.CategoryFormDto) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCategory", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Put('/characteristic/object/:id'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())),
    tslib_1.__param(2, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _k : Object, String, typeof (_l = typeof characteristic_form_dto_1.CharacteristicFormDto !== "undefined" && characteristic_form_dto_1.CharacteristicFormDto) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "updateCharacteristic", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Put('/characteristic/order'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _m : Object, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "updateOrderCharacteristics", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Delete('/:id'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_o = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _o : Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCategory", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Delete('/characteristic/:id'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_p = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _p : Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteCharacteristic", null);
CategoryController = tslib_1.__decorate([
    common_1.Controller('category'),
    tslib_1.__metadata("design:paramtypes", [typeof (_q = typeof category_service_1.CategoryService !== "undefined" && category_service_1.CategoryService) === "function" ? _q : Object, typeof (_r = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _r : Object])
], CategoryController);
exports.CategoryController = CategoryController;


/***/ }),

/***/ "./apps/api/src/app/modules/category/category.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const category_controller_1 = __webpack_require__("./apps/api/src/app/modules/category/category.controller.ts");
const category_service_1 = __webpack_require__("./apps/api/src/app/modules/category/category.service.ts");
const product_module_1 = __webpack_require__("./apps/api/src/app/modules/product/product.module.ts");
const user_module_1 = __webpack_require__("./apps/api/src/app/modules/user/user.module.ts");
const category_schema_1 = __webpack_require__("./libs/shared/src/schemas/category.schema.ts");
const characteristic_schema_1 = __webpack_require__("./libs/shared/src/schemas/characteristic.schema.ts");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
let CategoryModule = class CategoryModule {
};
CategoryModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema }, { name: characteristic_schema_1.Characteristic.name, schema: characteristic_schema_1.CharacteristicSchema }]),
            user_module_1.UserModule,
            product_module_1.ProductModule
        ],
        controllers: [category_controller_1.CategoryController],
        providers: [category_service_1.CategoryService]
    })
], CategoryModule);
exports.CategoryModule = CategoryModule;


/***/ }),

/***/ "./apps/api/src/app/modules/category/category.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryService = void 0;
const tslib_1 = __webpack_require__("tslib");
const category_schema_1 = __webpack_require__("./libs/shared/src/schemas/category.schema.ts");
const characteristic_schema_1 = __webpack_require__("./libs/shared/src/schemas/characteristic.schema.ts");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let CategoryService = class CategoryService {
    constructor(categoryModel, characteristicModel) {
        this.categoryModel = categoryModel;
        this.characteristicModel = characteristicModel;
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryModel.find().sort({ name: 1 }).populate('characteristics').exec();
        });
    }
    findAllDropdown() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryModel.find({}, 'name').sort({ name: 1 }).exec();
        });
    }
    findCategory(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryModel.findById(id).populate('characteristics').exec();
        });
    }
    checkCategory(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryModel.exists({ _id: id });
        });
    }
    createCategory(category) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const createdCategory = yield new this.categoryModel(category);
            return yield createdCategory.save();
        });
    }
    createCharacteristic(characteristic) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const createdCharacteristic = yield new this.characteristicModel(characteristic);
            return yield createdCharacteristic.save();
        });
    }
    addCharacteristicToCategory(characteristic) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryModel.updateOne({ _id: characteristic.category._id }, { $push: { characteristics: characteristic._id } }).exec();
        });
    }
    updateCategory(id, category) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.categoryModel.findOneAndUpdate({ _id: id }, { $set: category }, { new: true }).exec();
        });
    }
    updateCharacteristic(id, characteristic) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.characteristicModel.findOneAndUpdate({ _id: id }, { $set: characteristic }, { new: true }).exec();
        });
    }
    updateOrderCharacteristics(characteristics) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const characteristic of characteristics) {
                yield this.characteristicModel.updateOne({ _id: characteristic._id }, { order: characteristic.order });
            }
        });
    }
    deleteCategory(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryModel.findById(id);
            if (!category) {
                return null;
            }
            yield this.characteristicModel.deleteMany({ _id: { $in: category.characteristics } });
            return yield this.categoryModel.findByIdAndDelete(id).exec();
        });
    }
    deleteCharacteristic(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.characteristicModel.findByIdAndDelete(id).exec();
        });
    }
};
CategoryService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, mongoose_1.InjectModel(category_schema_1.Category.name)),
    tslib_1.__param(1, mongoose_1.InjectModel(characteristic_schema_1.Characteristic.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], CategoryService);
exports.CategoryService = CategoryService;


/***/ }),

/***/ "./apps/api/src/app/modules/file/file.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileController = void 0;
const tslib_1 = __webpack_require__("tslib");
const role_decorator_1 = __webpack_require__("./apps/api/src/app/core/decorators/role.decorator.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/api/src/app/core/guards/jwt-auth.guard.ts");
const role_guard_1 = __webpack_require__("./apps/api/src/app/core/guards/role.guard.ts");
const file_service_1 = __webpack_require__("./apps/api/src/app/modules/file/file.service.ts");
const role_enum_1 = __webpack_require__("./libs/shared/src/enums/role.enum.ts");
const common_1 = __webpack_require__("@nestjs/common");
const platform_express_1 = __webpack_require__("@nestjs/platform-express");
const express_1 = __webpack_require__("express");
const multer_1 = __webpack_require__("multer");
const uuid = __webpack_require__("uuid");
const path_1 = __webpack_require__("path");
const fs = __webpack_require__("fs");
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    getFile(res, path) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return res.sendFile(path, { root: './public' });
        });
    }
    upload(res, file) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newFile = {
                name: file.originalname,
                path: file.filename,
                size: file.size,
                mime: file.mimetype
            };
            const createdFile = yield this.fileService.upload(newFile);
            return res.status(common_1.HttpStatus.CREATED).json(createdFile).end();
        });
    }
    deleteFile(res, path) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deletedFile = yield this.fileService.deleteFile(path);
            if (!deletedFile) {
                throw new common_1.NotFoundException("Нет такого файла!");
            }
            fs.unlinkSync('./public/' + path);
            return res.status(common_1.HttpStatus.OK).end();
        });
    }
};
tslib_1.__decorate([
    common_1.Get(':path'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Param('path')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "getFile", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Post(),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', {
        storage: multer_1.diskStorage({
            destination: './public',
            filename(req, file, callback) {
                callback(null, `${uuid.v4()}${path_1.extname(file.originalname)}`);
            }
        })
    })),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.UploadedFile()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object, typeof (_d = typeof express_1.Express !== "undefined" && (_c = express_1.Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "upload", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Delete(':path'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Param('path')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], FileController.prototype, "deleteFile", null);
FileController = tslib_1.__decorate([
    common_1.Controller('file'),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof file_service_1.FileService !== "undefined" && file_service_1.FileService) === "function" ? _f : Object])
], FileController);
exports.FileController = FileController;


/***/ }),

/***/ "./apps/api/src/app/modules/file/file.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const file_controller_1 = __webpack_require__("./apps/api/src/app/modules/file/file.controller.ts");
const file_service_1 = __webpack_require__("./apps/api/src/app/modules/file/file.service.ts");
const user_module_1 = __webpack_require__("./apps/api/src/app/modules/user/user.module.ts");
const file_schema_1 = __webpack_require__("./libs/shared/src/schemas/file.schema.ts");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
let FileModule = class FileModule {
};
FileModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: file_schema_1.File.name, schema: file_schema_1.FileSchema }]),
            user_module_1.UserModule
        ],
        controllers: [file_controller_1.FileController],
        providers: [file_service_1.FileService],
        exports: [file_service_1.FileService]
    })
], FileModule);
exports.FileModule = FileModule;


/***/ }),

/***/ "./apps/api/src/app/modules/file/file.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileService = void 0;
const tslib_1 = __webpack_require__("tslib");
const file_schema_1 = __webpack_require__("./libs/shared/src/schemas/file.schema.ts");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let FileService = class FileService {
    constructor(fileModel) {
        this.fileModel = fileModel;
    }
    upload(file) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const uploadFile = yield new this.fileModel(file);
            return uploadFile.save();
        });
    }
    deleteFile(path) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.fileModel.findOneAndDelete({ path: path }).exec();
        });
    }
};
FileService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, mongoose_1.InjectModel(file_schema_1.File.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], FileService);
exports.FileService = FileService;


/***/ }),

/***/ "./apps/api/src/app/modules/model-car/model.car.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModelCarController = void 0;
const tslib_1 = __webpack_require__("tslib");
const role_decorator_1 = __webpack_require__("./apps/api/src/app/core/decorators/role.decorator.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/api/src/app/core/guards/jwt-auth.guard.ts");
const role_guard_1 = __webpack_require__("./apps/api/src/app/core/guards/role.guard.ts");
const validate_object_id_pipes_1 = __webpack_require__("./apps/api/src/app/core/pipes/validate.object.id.pipes.ts");
const model_car_service_1 = __webpack_require__("./apps/api/src/app/modules/model-car/model.car.service.ts");
const brand_car_form_dto_1 = __webpack_require__("./libs/shared/src/dtos/modelCar/brand.car.form.dto.ts");
const model_car_form_dto_1 = __webpack_require__("./libs/shared/src/dtos/modelCar/model.car.form.dto.ts");
const role_enum_1 = __webpack_require__("./libs/shared/src/enums/role.enum.ts");
const common_1 = __webpack_require__("@nestjs/common");
const express_1 = __webpack_require__("express");
let ModelCarController = class ModelCarController {
    constructor(modelCarService) {
        this.modelCarService = modelCarService;
    }
    getAll(res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const carModels = yield this.modelCarService.findAll();
            return res.status(common_1.HttpStatus.OK).json(carModels).end();
        });
    }
    getAllBrandDropdown(res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const brands = yield this.modelCarService.findAllBrandDropdown();
            return res.status(common_1.HttpStatus.OK).json(brands).end();
        });
    }
    getAllModelDropdown(res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const models = yield this.modelCarService.findAllModelDropdown();
            return res.status(common_1.HttpStatus.OK).json(models).end();
        });
    }
    createModel(res, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const firm = yield this.modelCarService.checkBrand(body.brand._id);
            if (!firm) {
                return res.status(common_1.HttpStatus.NOT_FOUND).json({ model: "Фирма не существует" }).end();
            }
            const createdModel = yield this.modelCarService.createModel(body);
            yield this.modelCarService.addModelToBrand(createdModel);
            return res.status(common_1.HttpStatus.CREATED).json(createdModel).end();
        });
    }
    createBrand(res, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const createdBrand = yield this.modelCarService.createBrand(body);
            return res.status(common_1.HttpStatus.CREATED).json(createdBrand).end();
        });
    }
    updateBrand(res, id, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedBrand = yield this.modelCarService.updateBrand(id, body);
            if (!updatedBrand) {
                throw new common_1.NotFoundException("Нет такого объекта!");
            }
            return res.status(common_1.HttpStatus.OK).json(updatedBrand).end();
        });
    }
    updateModel(res, id, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedModel = yield this.modelCarService.updateModel(id, body);
            if (!updatedModel) {
                throw new common_1.NotFoundException("Нет такого объекта!");
            }
            return res.status(common_1.HttpStatus.OK).json(updatedModel).end();
        });
    }
    deleteBrand(res, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deletedBrand = yield this.modelCarService.deleteBrand(id);
            if (!deletedBrand) {
                throw new common_1.NotFoundException("Нет такого объекта!");
            }
            return res.status(common_1.HttpStatus.OK).end();
        });
    }
    deleteModel(res, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deletedModel = yield this.modelCarService.deleteModel(id);
            if (!deletedModel) {
                throw new common_1.NotFoundException("Нет такого объекта!");
            }
            return res.status(common_1.HttpStatus.OK).end();
        });
    }
};
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Get(),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModelCarController.prototype, "getAll", null);
tslib_1.__decorate([
    common_1.Get('/brand/all'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModelCarController.prototype, "getAllBrandDropdown", null);
tslib_1.__decorate([
    common_1.Get('/model/all'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModelCarController.prototype, "getAllModelDropdown", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Post('/model'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object, typeof (_e = typeof model_car_form_dto_1.ModelCarFormDto !== "undefined" && model_car_form_dto_1.ModelCarFormDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModelCarController.prototype, "createModel", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Post('/brand'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object, typeof (_g = typeof brand_car_form_dto_1.BrandCarFormDto !== "undefined" && brand_car_form_dto_1.BrandCarFormDto) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModelCarController.prototype, "createBrand", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Put('/brand/:id'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())),
    tslib_1.__param(2, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object, String, typeof (_j = typeof brand_car_form_dto_1.BrandCarFormDto !== "undefined" && brand_car_form_dto_1.BrandCarFormDto) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModelCarController.prototype, "updateBrand", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Put('/model/:id'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())),
    tslib_1.__param(2, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _k : Object, String, typeof (_l = typeof model_car_form_dto_1.ModelCarFormDto !== "undefined" && model_car_form_dto_1.ModelCarFormDto) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ModelCarController.prototype, "updateModel", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Delete('/brand/:id'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _m : Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ModelCarController.prototype, "deleteBrand", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Delete('/model/:id'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_o = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _o : Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ModelCarController.prototype, "deleteModel", null);
ModelCarController = tslib_1.__decorate([
    common_1.Controller('car-model'),
    tslib_1.__metadata("design:paramtypes", [typeof (_p = typeof model_car_service_1.ModelCarService !== "undefined" && model_car_service_1.ModelCarService) === "function" ? _p : Object])
], ModelCarController);
exports.ModelCarController = ModelCarController;


/***/ }),

/***/ "./apps/api/src/app/modules/model-car/model.car.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModelCarModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const model_car_controller_1 = __webpack_require__("./apps/api/src/app/modules/model-car/model.car.controller.ts");
const model_car_service_1 = __webpack_require__("./apps/api/src/app/modules/model-car/model.car.service.ts");
const user_module_1 = __webpack_require__("./apps/api/src/app/modules/user/user.module.ts");
const brand_car_schema_1 = __webpack_require__("./libs/shared/src/schemas/brand.car.schema.ts");
const model_car_schema_1 = __webpack_require__("./libs/shared/src/schemas/model.car.schema.ts");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
let ModelCarModule = class ModelCarModule {
};
ModelCarModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: model_car_schema_1.ModelCar.name, schema: model_car_schema_1.ModelCarSchema }, { name: brand_car_schema_1.BrandCar.name, schema: brand_car_schema_1.BrandCarSchema }]),
            user_module_1.UserModule
        ],
        controllers: [model_car_controller_1.ModelCarController],
        providers: [model_car_service_1.ModelCarService]
    })
], ModelCarModule);
exports.ModelCarModule = ModelCarModule;


/***/ }),

/***/ "./apps/api/src/app/modules/model-car/model.car.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModelCarService = void 0;
const tslib_1 = __webpack_require__("tslib");
const brand_car_schema_1 = __webpack_require__("./libs/shared/src/schemas/brand.car.schema.ts");
const model_car_schema_1 = __webpack_require__("./libs/shared/src/schemas/model.car.schema.ts");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let ModelCarService = class ModelCarService {
    constructor(modelCarModel, brandCarModel) {
        this.modelCarModel = modelCarModel;
        this.brandCarModel = brandCarModel;
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.brandCarModel.find().sort({ brand: 1 }).populate('models').exec();
        });
    }
    findAllBrandDropdown() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.brandCarModel.find({}, 'brand').sort({ brand: 1 }).exec();
        });
    }
    findAllModelDropdown() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.modelCarModel.find().sort({ model: 1 }).populate('brand', { brand: 1, _id: 0 }).exec();
        });
    }
    checkBrand(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.brandCarModel.exists({ _id: id });
        });
    }
    createBrand(brand) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const createdBrand = yield new this.brandCarModel(brand);
            return yield createdBrand.save();
        });
    }
    createModel(model) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const createdModel = yield new this.modelCarModel(model);
            return yield createdModel.save();
        });
    }
    addModelToBrand(model) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.brandCarModel.updateOne({ _id: model.brand._id }, { $push: { models: model._id } }).exec();
        });
    }
    updateBrand(id, brand) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.brandCarModel.findOneAndUpdate({ _id: id }, { $set: brand }, { new: true }).exec();
        });
    }
    updateModel(id, model) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.modelCarModel.findOneAndUpdate({ _id: id }, { $set: model }, { new: true }).exec();
        });
    }
    deleteBrand(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const brand = yield this.brandCarModel.findById(id);
            if (!brand) {
                return null;
            }
            yield this.modelCarModel.deleteMany({ _id: { $in: brand.models } });
            return yield this.brandCarModel.findByIdAndDelete(id).exec();
        });
    }
    deleteModel(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.modelCarModel.findByIdAndDelete(id).exec();
        });
    }
};
ModelCarService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, mongoose_1.InjectModel(model_car_schema_1.ModelCar.name)),
    tslib_1.__param(1, mongoose_1.InjectModel(brand_car_schema_1.BrandCar.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], ModelCarService);
exports.ModelCarService = ModelCarService;


/***/ }),

/***/ "./apps/api/src/app/modules/product/product.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const tslib_1 = __webpack_require__("tslib");
const role_decorator_1 = __webpack_require__("./apps/api/src/app/core/decorators/role.decorator.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/api/src/app/core/guards/jwt-auth.guard.ts");
const role_guard_1 = __webpack_require__("./apps/api/src/app/core/guards/role.guard.ts");
const validate_object_id_pipes_1 = __webpack_require__("./apps/api/src/app/core/pipes/validate.object.id.pipes.ts");
const file_service_1 = __webpack_require__("./apps/api/src/app/modules/file/file.service.ts");
const product_service_1 = __webpack_require__("./apps/api/src/app/modules/product/product.service.ts");
const user_service_1 = __webpack_require__("./apps/api/src/app/modules/user/user.service.ts");
const product_form_dto_1 = __webpack_require__("./libs/shared/src/dtos/product/product.form.dto.ts");
const product_query_dto_1 = __webpack_require__("./libs/shared/src/dtos/product/product.query.dto.ts");
const role_enum_1 = __webpack_require__("./libs/shared/src/enums/role.enum.ts");
const common_1 = __webpack_require__("@nestjs/common");
const express_1 = __webpack_require__("express");
const fs = __webpack_require__("fs");
let ProductController = class ProductController {
    constructor(productService, userService, fileService) {
        this.productService = productService;
        this.userService = userService;
        this.fileService = fileService;
    }
    findAll(res, req, query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = req.headers.authorization ? yield this.userService.findByToken(req.headers.authorization.replace("Bearer ", "")) : null;
            const products = yield this.productService.findAll(query, user);
            if (!user) {
                products.forEach((product) => {
                    product.modifications.forEach((modification) => {
                        delete modification.pricePartner;
                        delete modification.discountPartner;
                    });
                });
            }
            const count = yield this.productService.countFindAll(query, user);
            return res.status(common_1.HttpStatus.OK).json({
                items: products,
                count: count
            }).end();
        });
    }
    findById(res, req, id) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findById(id);
            if (!product) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send("Товар не существует").end();
            }
            const user = req.headers.authorization ? yield this.userService.findByToken(req.headers.authorization.replace("Bearer ", "")) : null;
            if ((!user || !((_a = user.roles) === null || _a === void 0 ? void 0 : _a.includes(role_enum_1.RoleEnum.ADMIN))) && !product.isPublic) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send("Ошибка доступа").end();
            }
            if (!user) {
                product.modifications.forEach((modification) => {
                    delete modification.pricePartner;
                    delete modification.discountPartner;
                });
            }
            return res.status(common_1.HttpStatus.OK).json(product).end();
        });
    }
    createProduct(res, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const createdProduct = yield this.productService.createProduct(body);
            if (!createdProduct) {
                throw new common_1.NotFoundException("Произошла ошибка!");
            }
            return res.status(common_1.HttpStatus.CREATED).json(createdProduct).end();
        });
    }
    updateProduct(res, id, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield this.productService.updateProduct(id, body);
            if (!updatedProduct) {
                throw new common_1.NotFoundException("Нет такого товара!");
            }
            return res.status(common_1.HttpStatus.OK).json(updatedProduct).end();
        });
    }
    deleteProduct(res, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deletedProduct = yield this.productService.deleteProduct(id);
            if (!deletedProduct) {
                throw new common_1.NotFoundException("Нет такого объекта!");
            }
            for (const image of deletedProduct.images) {
                yield this.fileService.deleteFile(image.path);
                fs.unlinkSync('./public/' + image.path);
            }
            return res.status(common_1.HttpStatus.OK).end();
        });
    }
};
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Req()),
    tslib_1.__param(2, common_1.Query()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object, typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object, typeof (_c = typeof product_query_dto_1.ProductQueryDto !== "undefined" && product_query_dto_1.ProductQueryDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
tslib_1.__decorate([
    common_1.Get(':id'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Req()),
    tslib_1.__param(2, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object, typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "findById", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Post(),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object, typeof (_g = typeof product_form_dto_1.ProductFormDto !== "undefined" && product_form_dto_1.ProductFormDto) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Put(':id'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())),
    tslib_1.__param(2, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object, String, typeof (_j = typeof product_form_dto_1.ProductFormDto !== "undefined" && product_form_dto_1.ProductFormDto) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Delete(':id'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _k : Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
ProductController = tslib_1.__decorate([
    common_1.Controller('product'),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _l : Object, typeof (_m = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _m : Object, typeof (_o = typeof file_service_1.FileService !== "undefined" && file_service_1.FileService) === "function" ? _o : Object])
], ProductController);
exports.ProductController = ProductController;


/***/ }),

/***/ "./apps/api/src/app/modules/product/product.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const file_module_1 = __webpack_require__("./apps/api/src/app/modules/file/file.module.ts");
const product_controller_1 = __webpack_require__("./apps/api/src/app/modules/product/product.controller.ts");
const product_service_1 = __webpack_require__("./apps/api/src/app/modules/product/product.service.ts");
const user_module_1 = __webpack_require__("./apps/api/src/app/modules/user/user.module.ts");
const product_schema_1 = __webpack_require__("./libs/shared/src/schemas/product.schema.ts");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
let ProductModule = class ProductModule {
};
ProductModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema }]),
            user_module_1.UserModule,
            file_module_1.FileModule
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService],
        exports: [product_service_1.ProductService]
    })
], ProductModule);
exports.ProductModule = ProductModule;


/***/ }),

/***/ "./apps/api/src/app/modules/product/product.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductService = void 0;
const tslib_1 = __webpack_require__("tslib");
const role_enum_1 = __webpack_require__("./libs/shared/src/enums/role.enum.ts");
const product_schema_1 = __webpack_require__("./libs/shared/src/schemas/product.schema.ts");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const mongoose_query_parser_1 = __webpack_require__("mongoose-query-parser");
let ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    findAll(queryParams, user) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const parser = new mongoose_query_parser_1.MongooseQueryParser({
                skipKey: 'offset',
                limitKey: 'limit'
            });
            const filter = parser.parse(queryParams);
            if (!user || !((_a = user.roles) === null || _a === void 0 ? void 0 : _a.includes(role_enum_1.RoleEnum.ADMIN))) {
                filter.filter.isPublic = true;
            }
            return yield this.productModel.find(filter.filter)
                .skip(filter.skip)
                .limit(filter.limit)
                .populate('images').exec();
        });
    }
    countFindAll(queryParams, user) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const parser = new mongoose_query_parser_1.MongooseQueryParser({
                skipKey: 'offset',
                limitKey: 'limit'
            });
            const filter = parser.parse(queryParams);
            if (!user || !((_a = user.roles) === null || _a === void 0 ? void 0 : _a.includes(role_enum_1.RoleEnum.ADMIN))) {
                filter.filter.isPublic = true;
            }
            return yield this.productModel.count(filter.filter).exec();
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productModel.findById(id)
                .populate('category')
                .populate('images')
                .populate({ path: 'modelsCar', populate: { path: 'brand' } }).exec();
        });
    }
    createProduct(product) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const createdProduct = new this.productModel(product);
                return yield createdProduct.save();
            }
            catch (_a) {
                return null;
            }
        });
    }
    updateProduct(id, product) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productModel.findOneAndUpdate({ _id: id }, { $set: product }, { new: true }).exec();
        });
    }
    deleteProduct(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productModel.findByIdAndDelete(id).exec();
        });
    }
    isPublicToFalse(category) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.productModel.updateMany({ category: category }, { $set: { isPublic: false } }).exec();
        });
    }
};
ProductService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, mongoose_1.InjectModel(product_schema_1.Product.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ProductService);
exports.ProductService = ProductService;


/***/ }),

/***/ "./apps/api/src/app/modules/user/user.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__("tslib");
const role_decorator_1 = __webpack_require__("./apps/api/src/app/core/decorators/role.decorator.ts");
const jwt_auth_guard_1 = __webpack_require__("./apps/api/src/app/core/guards/jwt-auth.guard.ts");
const role_guard_1 = __webpack_require__("./apps/api/src/app/core/guards/role.guard.ts");
const auth_service_1 = __webpack_require__("./apps/api/src/app/modules/auth/auth.service.ts");
const user_session_dto_1 = __webpack_require__("./libs/shared/src/dtos/user/user.session.dto.ts");
const role_enum_1 = __webpack_require__("./libs/shared/src/enums/role.enum.ts");
const common_1 = __webpack_require__("@nestjs/common");
const user_service_1 = __webpack_require__("./apps/api/src/app/modules/user/user.service.ts");
const user_form_dto_1 = __webpack_require__("./libs/shared/src/dtos/user/user.form.dto.ts");
const express_1 = __webpack_require__("express");
const bcrypt = __webpack_require__("bcrypt");
let UserController = class UserController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    getAll(res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.findAll();
            return res.status(common_1.HttpStatus.OK).json(users).end();
        });
    }
    check(res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return res.status(common_1.HttpStatus.NO_CONTENT).end();
        });
    }
    getPassword(res, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            password = bcrypt.hashSync(password, 10);
            return res.status(common_1.HttpStatus.OK).json(password).end();
        });
    }
    addUser(res, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            body.password = bcrypt.hashSync(body.password, 10);
            const newUser = yield this.userService.create(body);
            return res.status(common_1.HttpStatus.CREATED).json(newUser).end();
        });
    }
    login(res, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findByLogin(body.login);
            const errors = {
                login: null,
                password: null
            };
            if (!user) {
                errors.login = ['Нет такого аккаунта'];
                return res.status(common_1.HttpStatus.NOT_FOUND).json(errors).end();
            }
            if (bcrypt.compareSync(body.password, user.password)) {
                const token = yield this.authService.login(user);
                const login = {
                    _id: user._id,
                    login: user.login,
                    token: token.accessToken,
                    roles: user.roles
                };
                yield this.userService.setToken(user._id, token.accessToken);
                return res.status(common_1.HttpStatus.OK).json(login).end();
            }
            else {
                errors.password = ['Неверный пароль'];
                return res.status(common_1.HttpStatus.NOT_FOUND).json(errors).end();
            }
        });
    }
    logout(res, body) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.userService.logout(body._id);
            return res.status(common_1.HttpStatus.OK).end();
        });
    }
};
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
tslib_1.__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/check'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "check", null);
tslib_1.__decorate([
    common_1.Post('/get-pass'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getPassword", null);
tslib_1.__decorate([
    role_decorator_1.Roles(role_enum_1.RoleEnum.ADMIN),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    common_1.Post(),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object, typeof (_e = typeof user_form_dto_1.UserFormDto !== "undefined" && user_form_dto_1.UserFormDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
tslib_1.__decorate([
    common_1.Post('/login'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object, typeof (_g = typeof user_form_dto_1.UserFormDto !== "undefined" && user_form_dto_1.UserFormDto) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    common_1.Post('/logout'),
    tslib_1.__param(0, common_1.Res()),
    tslib_1.__param(1, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object, typeof (_j = typeof user_session_dto_1.UserSessionDto !== "undefined" && user_session_dto_1.UserSessionDto) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
UserController = tslib_1.__decorate([
    common_1.Controller('user'),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _k : Object, typeof (_l = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _l : Object])
], UserController);
exports.UserController = UserController;


/***/ }),

/***/ "./apps/api/src/app/modules/user/user.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const auth_module_1 = __webpack_require__("./apps/api/src/app/modules/auth/auth.module.ts");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const user_controller_1 = __webpack_require__("./apps/api/src/app/modules/user/user.controller.ts");
const user_service_1 = __webpack_require__("./apps/api/src/app/modules/user/user.service.ts");
const user_schema_1 = __webpack_require__("./libs/shared/src/schemas/user.schema.ts");
let UserModule = class UserModule {
};
UserModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            common_1.forwardRef(() => auth_module_1.AuthModule)
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService]
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),

/***/ "./apps/api/src/app/modules/user/user.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const user_schema_1 = __webpack_require__("./libs/shared/src/schemas/user.schema.ts");
const mongoose_2 = __webpack_require__("mongoose");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    create(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const createUser = yield new this.userModel(user);
            return createUser.save();
        });
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.find().exec();
        });
    }
    findById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findById(id).exec();
        });
    }
    findByLogin(login) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ login: login }).exec();
        });
    }
    findByToken(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findOne({ token: token }).exec();
        });
    }
    setToken(id, token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.updateOne({ _id: id }, { $set: { token: token } }).exec();
        });
    }
    logout(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.updateOne({ _id: id }, { $unset: { token: '' } }).exec();
        });
    }
};
UserService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, mongoose_1.InjectModel(user_schema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ "./apps/api/src/environments/environment.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = void 0;
exports.environment = {
    production: false,
    connection: {
        secret: process.env.SECRET || 'd2103dfe7288ccb50a4a7af9ff90ec52',
        db: process.env.DB || 'mongodb://localhost:27017/car',
        expiresIn: Number(process.env.EXPIRES_IN) || 2592000
    }
};


/***/ }),

/***/ "./libs/shared/src/dtos/base.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
let BaseDto = class BaseDto {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseDto.prototype, "_id", void 0);
BaseDto = tslib_1.__decorate([
    class_transformer_1.Expose()
], BaseDto);
exports.BaseDto = BaseDto;


/***/ }),

/***/ "./libs/shared/src/dtos/category/category.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const base_dto_1 = __webpack_require__("./libs/shared/src/dtos/base.dto.ts");
const characteristic_dto_1 = __webpack_require__("./libs/shared/src/dtos/category/characteristic.dto.ts");
const class_transformer_1 = __webpack_require__("class-transformer");
let CategoryDto = class CategoryDto extends base_dto_1.BaseDto {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    tslib_1.__metadata("design:type", String)
], CategoryDto.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => characteristic_dto_1.CharacteristicDto),
    tslib_1.__metadata("design:type", Array)
], CategoryDto.prototype, "characteristics", void 0);
CategoryDto = tslib_1.__decorate([
    class_transformer_1.Expose()
], CategoryDto);
exports.CategoryDto = CategoryDto;


/***/ }),

/***/ "./libs/shared/src/dtos/category/category.form.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryFormDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
let CategoryFormDto = class CategoryFormDto {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString({ message: "Введите значение" }),
    tslib_1.__metadata("design:type", String)
], CategoryFormDto.prototype, "name", void 0);
CategoryFormDto = tslib_1.__decorate([
    class_transformer_1.Expose()
], CategoryFormDto);
exports.CategoryFormDto = CategoryFormDto;


/***/ }),

/***/ "./libs/shared/src/dtos/category/characteristic.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CharacteristicDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const base_dto_1 = __webpack_require__("./libs/shared/src/dtos/base.dto.ts");
const category_dto_1 = __webpack_require__("./libs/shared/src/dtos/category/category.dto.ts");
const class_transformer_1 = __webpack_require__("class-transformer");
let CharacteristicDto = class CharacteristicDto extends base_dto_1.BaseDto {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    tslib_1.__metadata("design:type", String)
], CharacteristicDto.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    tslib_1.__metadata("design:type", Number)
], CharacteristicDto.prototype, "order", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => category_dto_1.CategoryDto),
    tslib_1.__metadata("design:type", typeof (_a = typeof category_dto_1.CategoryDto !== "undefined" && category_dto_1.CategoryDto) === "function" ? _a : Object)
], CharacteristicDto.prototype, "category", void 0);
CharacteristicDto = tslib_1.__decorate([
    class_transformer_1.Expose()
], CharacteristicDto);
exports.CharacteristicDto = CharacteristicDto;


/***/ }),

/***/ "./libs/shared/src/dtos/category/characteristic.form.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CharacteristicFormDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const category_dto_1 = __webpack_require__("./libs/shared/src/dtos/category/category.dto.ts");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
let CharacteristicFormDto = class CharacteristicFormDto {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString({ message: "Введите значение" }),
    tslib_1.__metadata("design:type", String)
], CharacteristicFormDto.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDefined({ message: "Введите значение" }),
    tslib_1.__metadata("design:type", Number)
], CharacteristicFormDto.prototype, "order", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDefined({ message: "Не выбрана категория" }),
    class_transformer_1.Type(() => category_dto_1.CategoryDto),
    tslib_1.__metadata("design:type", typeof (_a = typeof category_dto_1.CategoryDto !== "undefined" && category_dto_1.CategoryDto) === "function" ? _a : Object)
], CharacteristicFormDto.prototype, "category", void 0);
CharacteristicFormDto = tslib_1.__decorate([
    class_transformer_1.Expose()
], CharacteristicFormDto);
exports.CharacteristicFormDto = CharacteristicFormDto;


/***/ }),

/***/ "./libs/shared/src/dtos/file.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const base_dto_1 = __webpack_require__("./libs/shared/src/dtos/base.dto.ts");
const class_transformer_1 = __webpack_require__("class-transformer");
let FileDto = class FileDto extends base_dto_1.BaseDto {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    tslib_1.__metadata("design:type", String)
], FileDto.prototype, "path", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    tslib_1.__metadata("design:type", String)
], FileDto.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    tslib_1.__metadata("design:type", String)
], FileDto.prototype, "mime", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    tslib_1.__metadata("design:type", Number)
], FileDto.prototype, "size", void 0);
FileDto = tslib_1.__decorate([
    class_transformer_1.Expose()
], FileDto);
exports.FileDto = FileDto;


/***/ }),

/***/ "./libs/shared/src/dtos/modelCar/brand.car.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BrandCarDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const base_dto_1 = __webpack_require__("./libs/shared/src/dtos/base.dto.ts");
const class_transformer_1 = __webpack_require__("class-transformer");
const model_car_dto_1 = __webpack_require__("./libs/shared/src/dtos/modelCar/model.car.dto.ts");
let BrandCarDto = class BrandCarDto extends base_dto_1.BaseDto {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    tslib_1.__metadata("design:type", String)
], BrandCarDto.prototype, "brand", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => model_car_dto_1.ModelCarDto),
    tslib_1.__metadata("design:type", Array)
], BrandCarDto.prototype, "models", void 0);
BrandCarDto = tslib_1.__decorate([
    class_transformer_1.Expose()
], BrandCarDto);
exports.BrandCarDto = BrandCarDto;


/***/ }),

/***/ "./libs/shared/src/dtos/modelCar/brand.car.form.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BrandCarFormDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
let BrandCarFormDto = class BrandCarFormDto {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString({ message: "Введите значение" }),
    tslib_1.__metadata("design:type", String)
], BrandCarFormDto.prototype, "brand", void 0);
BrandCarFormDto = tslib_1.__decorate([
    class_transformer_1.Expose()
], BrandCarFormDto);
exports.BrandCarFormDto = BrandCarFormDto;


/***/ }),

/***/ "./libs/shared/src/dtos/modelCar/model.car.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModelCarDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const base_dto_1 = __webpack_require__("./libs/shared/src/dtos/base.dto.ts");
const brand_car_dto_1 = __webpack_require__("./libs/shared/src/dtos/modelCar/brand.car.dto.ts");
const class_transformer_1 = __webpack_require__("class-transformer");
let ModelCarDto = class ModelCarDto extends base_dto_1.BaseDto {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(() => brand_car_dto_1.BrandCarDto),
    tslib_1.__metadata("design:type", typeof (_a = typeof brand_car_dto_1.BrandCarDto !== "undefined" && brand_car_dto_1.BrandCarDto) === "function" ? _a : Object)
], ModelCarDto.prototype, "brand", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    tslib_1.__metadata("design:type", String)
], ModelCarDto.prototype, "model", void 0);
ModelCarDto = tslib_1.__decorate([
    class_transformer_1.Expose()
], ModelCarDto);
exports.ModelCarDto = ModelCarDto;


/***/ }),

/***/ "./libs/shared/src/dtos/modelCar/model.car.form.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModelCarFormDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const brand_car_dto_1 = __webpack_require__("./libs/shared/src/dtos/modelCar/brand.car.dto.ts");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
let ModelCarFormDto = class ModelCarFormDto {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString({ message: "Введите значение" }),
    tslib_1.__metadata("design:type", String)
], ModelCarFormDto.prototype, "model", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDefined({ message: "Не выбран бренд" }),
    class_transformer_1.Type(() => brand_car_dto_1.BrandCarDto),
    tslib_1.__metadata("design:type", typeof (_a = typeof brand_car_dto_1.BrandCarDto !== "undefined" && brand_car_dto_1.BrandCarDto) === "function" ? _a : Object)
], ModelCarFormDto.prototype, "brand", void 0);
ModelCarFormDto = tslib_1.__decorate([
    class_transformer_1.Expose()
], ModelCarFormDto);
exports.ModelCarFormDto = ModelCarFormDto;


/***/ }),

/***/ "./libs/shared/src/dtos/pagination.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaginationDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
let PaginationDto = class PaginationDto {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    class_transformer_1.Transform((param) => parseInt(param.value, 0)),
    tslib_1.__metadata("design:type", Number)
], PaginationDto.prototype, "limit", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    class_transformer_1.Transform((param) => parseInt(param.value, 0)),
    tslib_1.__metadata("design:type", Number)
], PaginationDto.prototype, "offset", void 0);
PaginationDto = tslib_1.__decorate([
    class_transformer_1.Expose()
], PaginationDto);
exports.PaginationDto = PaginationDto;


/***/ }),

/***/ "./libs/shared/src/dtos/product/modification.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModificationDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_transformer_1 = __webpack_require__("class-transformer");
let ModificationDto = class ModificationDto {
    constructor() {
        this.params = {};
    }
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    tslib_1.__metadata("design:type", String)
], ModificationDto.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    tslib_1.__metadata("design:type", Number)
], ModificationDto.prototype, "price", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    tslib_1.__metadata("design:type", Number)
], ModificationDto.prototype, "discount", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    tslib_1.__metadata("design:type", Number)
], ModificationDto.prototype, "pricePartner", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    tslib_1.__metadata("design:type", Number)
], ModificationDto.prototype, "discountPartner", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], ModificationDto.prototype, "params", void 0);
ModificationDto = tslib_1.__decorate([
    class_transformer_1.Expose()
], ModificationDto);
exports.ModificationDto = ModificationDto;


/***/ }),

/***/ "./libs/shared/src/dtos/product/product.form.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductFormDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const category_dto_1 = __webpack_require__("./libs/shared/src/dtos/category/category.dto.ts");
const file_dto_1 = __webpack_require__("./libs/shared/src/dtos/file.dto.ts");
const model_car_dto_1 = __webpack_require__("./libs/shared/src/dtos/modelCar/model.car.dto.ts");
const modification_dto_1 = __webpack_require__("./libs/shared/src/dtos/product/modification.dto.ts");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
let ProductFormDto = class ProductFormDto {
    constructor() {
        this.images = [];
        this.modelsCar = [];
        this.modifications = [];
    }
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString({ message: "Введите значение" }),
    tslib_1.__metadata("design:type", String)
], ProductFormDto.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsInt({ message: "Введите значение" }),
    tslib_1.__metadata("design:type", Number)
], ProductFormDto.prototype, "amount", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDefined({ message: "Не выбрана категория" }),
    class_transformer_1.Type(() => category_dto_1.CategoryDto),
    tslib_1.__metadata("design:type", typeof (_a = typeof category_dto_1.CategoryDto !== "undefined" && category_dto_1.CategoryDto) === "function" ? _a : Object)
], ProductFormDto.prototype, "category", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => file_dto_1.FileDto),
    tslib_1.__metadata("design:type", Array)
], ProductFormDto.prototype, "images", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", Boolean)
], ProductFormDto.prototype, "isPublic", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => model_car_dto_1.ModelCarDto),
    tslib_1.__metadata("design:type", Array)
], ProductFormDto.prototype, "modelsCar", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => modification_dto_1.ModificationDto),
    tslib_1.__metadata("design:type", Array)
], ProductFormDto.prototype, "modifications", void 0);
ProductFormDto = tslib_1.__decorate([
    class_transformer_1.Expose()
], ProductFormDto);
exports.ProductFormDto = ProductFormDto;


/***/ }),

/***/ "./libs/shared/src/dtos/product/product.query.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductQueryDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const pagination_dto_1 = __webpack_require__("./libs/shared/src/dtos/pagination.dto.ts");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
let ProductQueryDto = class ProductQueryDto extends pagination_dto_1.PaginationDto {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", Array)
], ProductQueryDto.prototype, "categories", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", Array)
], ProductQueryDto.prototype, "brands", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", Array)
], ProductQueryDto.prototype, "models", void 0);
ProductQueryDto = tslib_1.__decorate([
    class_transformer_1.Expose()
], ProductQueryDto);
exports.ProductQueryDto = ProductQueryDto;


/***/ }),

/***/ "./libs/shared/src/dtos/user/user.form.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserFormDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
let UserFormDto = class UserFormDto {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString({ message: "Введите логин" }),
    tslib_1.__metadata("design:type", String)
], UserFormDto.prototype, "login", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString({ message: "Введите пароль" }),
    tslib_1.__metadata("design:type", String)
], UserFormDto.prototype, "password", void 0);
UserFormDto = tslib_1.__decorate([
    class_transformer_1.Expose()
], UserFormDto);
exports.UserFormDto = UserFormDto;


/***/ }),

/***/ "./libs/shared/src/dtos/user/user.session.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSessionDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
let UserSessionDto = class UserSessionDto {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UserSessionDto.prototype, "_id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UserSessionDto.prototype, "login", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UserSessionDto.prototype, "token", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    tslib_1.__metadata("design:type", Array)
], UserSessionDto.prototype, "roles", void 0);
UserSessionDto = tslib_1.__decorate([
    class_transformer_1.Expose()
], UserSessionDto);
exports.UserSessionDto = UserSessionDto;


/***/ }),

/***/ "./libs/shared/src/enums/role.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleEnum = void 0;
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["ADMIN"] = "ADMIN";
    RoleEnum["PARTNER"] = "PARTNER";
})(RoleEnum = exports.RoleEnum || (exports.RoleEnum = {}));


/***/ }),

/***/ "./libs/shared/src/schemas/brand.car.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BrandCarSchema = exports.BrandCar = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose = __webpack_require__("mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let BrandCar = class BrandCar extends mongoose_2.Document {
};
tslib_1.__decorate([
    mongoose_1.Prop({ required: true }),
    tslib_1.__metadata("design:type", String)
], BrandCar.prototype, "brand", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ type: [{ type: [mongoose.Schema.Types.ObjectId], ref: "ModelCar" }] }),
    tslib_1.__metadata("design:type", Array)
], BrandCar.prototype, "models", void 0);
BrandCar = tslib_1.__decorate([
    mongoose_1.Schema({ versionKey: false })
], BrandCar);
exports.BrandCar = BrandCar;
exports.BrandCarSchema = mongoose_1.SchemaFactory.createForClass(BrandCar);


/***/ }),

/***/ "./libs/shared/src/schemas/category.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategorySchema = exports.Category = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose = __webpack_require__("mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let Category = class Category extends mongoose_2.Document {
};
tslib_1.__decorate([
    mongoose_1.Prop({ required: true }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ type: [{ type: [mongoose.Schema.Types.ObjectId], ref: "Characteristic" }] }),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "characteristics", void 0);
Category = tslib_1.__decorate([
    mongoose_1.Schema({ versionKey: false })
], Category);
exports.Category = Category;
exports.CategorySchema = mongoose_1.SchemaFactory.createForClass(Category);


/***/ }),

/***/ "./libs/shared/src/schemas/characteristic.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CharacteristicSchema = exports.Characteristic = void 0;
const tslib_1 = __webpack_require__("tslib");
const category_schema_1 = __webpack_require__("./libs/shared/src/schemas/category.schema.ts");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose = __webpack_require__("mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let Characteristic = class Characteristic extends mongoose_2.Document {
};
tslib_1.__decorate([
    mongoose_1.Prop({ required: true }),
    tslib_1.__metadata("design:type", String)
], Characteristic.prototype, "name", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ required: true }),
    tslib_1.__metadata("design:type", Number)
], Characteristic.prototype, "order", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Category" }),
    tslib_1.__metadata("design:type", typeof (_a = typeof category_schema_1.Category !== "undefined" && category_schema_1.Category) === "function" ? _a : Object)
], Characteristic.prototype, "category", void 0);
Characteristic = tslib_1.__decorate([
    mongoose_1.Schema({ versionKey: false })
], Characteristic);
exports.Characteristic = Characteristic;
exports.CharacteristicSchema = mongoose_1.SchemaFactory.createForClass(Characteristic);


/***/ }),

/***/ "./libs/shared/src/schemas/file.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileSchema = exports.File = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let File = class File extends mongoose_2.Document {
};
tslib_1.__decorate([
    mongoose_1.Prop({ required: true }),
    tslib_1.__metadata("design:type", String)
], File.prototype, "path", void 0);
tslib_1.__decorate([
    mongoose_1.Prop(),
    tslib_1.__metadata("design:type", String)
], File.prototype, "name", void 0);
tslib_1.__decorate([
    mongoose_1.Prop(),
    tslib_1.__metadata("design:type", String)
], File.prototype, "mime", void 0);
tslib_1.__decorate([
    mongoose_1.Prop(),
    tslib_1.__metadata("design:type", Number)
], File.prototype, "size", void 0);
File = tslib_1.__decorate([
    mongoose_1.Schema({ versionKey: false })
], File);
exports.File = File;
exports.FileSchema = mongoose_1.SchemaFactory.createForClass(File);


/***/ }),

/***/ "./libs/shared/src/schemas/model.car.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModelCarSchema = exports.ModelCar = void 0;
const tslib_1 = __webpack_require__("tslib");
const brand_car_schema_1 = __webpack_require__("./libs/shared/src/schemas/brand.car.schema.ts");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose = __webpack_require__("mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let ModelCar = class ModelCar extends mongoose_2.Document {
};
tslib_1.__decorate([
    mongoose_1.Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "BrandCar" }),
    tslib_1.__metadata("design:type", typeof (_a = typeof brand_car_schema_1.BrandCar !== "undefined" && brand_car_schema_1.BrandCar) === "function" ? _a : Object)
], ModelCar.prototype, "brand", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ required: true }),
    tslib_1.__metadata("design:type", String)
], ModelCar.prototype, "model", void 0);
ModelCar = tslib_1.__decorate([
    mongoose_1.Schema({ versionKey: false })
], ModelCar);
exports.ModelCar = ModelCar;
exports.ModelCarSchema = mongoose_1.SchemaFactory.createForClass(ModelCar);


/***/ }),

/***/ "./libs/shared/src/schemas/product.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductSchema = exports.Product = void 0;
const tslib_1 = __webpack_require__("tslib");
const modification_dto_1 = __webpack_require__("./libs/shared/src/dtos/product/modification.dto.ts");
const category_schema_1 = __webpack_require__("./libs/shared/src/schemas/category.schema.ts");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const class_transformer_1 = __webpack_require__("class-transformer");
const mongoose = __webpack_require__("mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let Product = class Product extends mongoose_2.Document {
};
tslib_1.__decorate([
    mongoose_1.Prop({ required: true }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "name", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ required: true }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "amount", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Category" }),
    tslib_1.__metadata("design:type", typeof (_a = typeof category_schema_1.Category !== "undefined" && category_schema_1.Category) === "function" ? _a : Object)
], Product.prototype, "category", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ type: [{ type: [mongoose.Schema.Types.ObjectId], ref: "File" }], default: [] }),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "images", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Product.prototype, "isPublic", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ type: [{ type: [mongoose.Schema.Types.ObjectId], ref: "ModelCar" }], default: [] }),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "modelsCar", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ type: [mongoose.Schema.Types.Mixed], default: [] }),
    class_transformer_1.Type(() => modification_dto_1.ModificationDto),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "modifications", void 0);
Product = tslib_1.__decorate([
    mongoose_1.Schema({ versionKey: false })
], Product);
exports.Product = Product;
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);


/***/ }),

/***/ "./libs/shared/src/schemas/user.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
let User = class User extends mongoose_2.Document {
};
tslib_1.__decorate([
    mongoose_1.Prop({ required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "login", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ required: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    mongoose_1.Prop({ required: true }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "roles", void 0);
tslib_1.__decorate([
    mongoose_1.Prop(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "token", void 0);
User = tslib_1.__decorate([
    mongoose_1.Schema({ versionKey: false })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/mongoose":
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/platform-express":
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-transformer":
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "moment-timezone":
/***/ ((module) => {

module.exports = require("moment-timezone");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "mongoose-query-parser":
/***/ ((module) => {

module.exports = require("mongoose-query-parser");

/***/ }),

/***/ "multer":
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "uuid":
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "fs":
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./apps/api/src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        app.enableCors();
        const port = process.env.PORT || 3333;
        yield app.listen(port, () => {
            common_1.Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
        });
    });
}
bootstrap().catch(common_1.Logger.error);

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map
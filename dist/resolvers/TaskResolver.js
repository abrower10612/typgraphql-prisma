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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const TaskCreateInput_1 = __importDefault(require("../entities/task/create/TaskCreateInput"));
const Task_1 = __importDefault(require("../entities/task/Task"));
const TaskStatusInput_1 = __importDefault(require("../entities/task/update/TaskStatusInput"));
const User_1 = __importDefault(require("../entities/user/User"));
let TaskResolver = class TaskResolver {
    /**
     * get all tasks for speciic user
     * @param ownerId
     * @param ctx
     * @returns
     */
    async getTasks(ownerId, ctx) {
        const owner = await new User_1.default().findOne(ownerId);
        return ctx.prisma.task.findMany({
            where: {
                owner,
            },
        });
    }
    /**
     * get all tasks with status INCOMPLETE for specific user
     * @param ownerId
     * @param ctx
     * @returns
     */
    async getIncompleteTasks(ownerId, ctx) {
        const owner = await new User_1.default().findOne(ownerId);
        return ctx.prisma.task.findMany({
            where: {
                owner,
                status: 'INCOMPLETE',
            },
        });
    }
    /**
     * get all tasks with status COMPLETE for specific user
     * @param ownerId
     * @param ctx
     * @returns
     */
    async getCompleteTasks(ownerId, ctx) {
        const owner = await new User_1.default().findOne(ownerId);
        return ctx.prisma.task.findMany({
            where: {
                owner,
                status: 'COMPLETE',
            },
        });
    }
    /**
     * create a new task for a specific user
     * @param data
     * @param ctx
     * @returns
     */
    async createTask(data, ctx) {
        const owner = await new User_1.default().findOne(data.ownerId);
        return ctx.prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                ownerId: owner.id,
            },
        });
    }
    /**
     * toggle the status of a user's task between INCOMPLETE and COMPLETE
     * @param data
     * @param ctx
     * @returns
     */
    async toggleTaskStatus(data, ctx) {
        const owner = await new User_1.default().findOne(data.ownerId);
        const task = await ctx.prisma.task.findFirstOrThrow({
            where: {
                id: data.id,
                ownerId: owner.id,
            },
        });
        return ctx.prisma.task.update({
            where: {
                id: data.id,
            },
            data: {
                status: task.status === 'COMPLETE' ? 'INCOMPLETE' : 'COMPLETE',
            },
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Task_1.default]),
    __param(0, (0, type_graphql_1.Arg)('ownerId')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "getTasks", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Task_1.default]),
    __param(0, (0, type_graphql_1.Arg)('ownerId')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "getIncompleteTasks", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Task_1.default]),
    __param(0, (0, type_graphql_1.Arg)('ownerId')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "getCompleteTasks", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Task_1.default),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TaskCreateInput_1.default, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "createTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Task_1.default),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TaskStatusInput_1.default, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "toggleTaskStatus", null);
TaskResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TaskResolver);
exports.default = TaskResolver;

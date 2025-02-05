import { KoaContext, KoaRouter, TemplateAppContext, TemplateAppState } from "../types/koa";
import * as userService from "../service/user"
import { CreateUserRequest, GetAllUsersResponse, GetUserByIdResponse, LoginResponse, UpdateUserRequest, UpdateUserResponse, GetUserRequest } from "../types/user";
import { IdParams } from "../types/common";
import Router from "@koa/router";
import Joi from "joi";
import validate from '../core/validation';
import { requireAuthentication, makeRequireRole } from '../core/authentication'; 
import Role from '../core/roles';
import { Next } from "koa";
import { authDelay } from "../core/authentication";

const checkUserId = (ctx: KoaContext<unknown, GetUserRequest>, next: Next) => {
   const { userId, roles } = ctx.state.session;
   const { id } = ctx.params;
 
   if (id !== 'me' && id !== userId && !roles.includes(Role.ADMIN)) {
     return ctx.throw(
       403,
       "You are not allowed to view this user's information",
       { code: 'FORBIDDEN' },
     );
   }
   return next();
 };

const getAllUsers = async (ctx: KoaContext<GetAllUsersResponse>) => {
   const users = await userService.getAll();
   ctx.body = {
     items: users,
   };
 };

getAllUsers.validationScheme = null;

const getUserById = async (ctx : KoaContext<GetUserByIdResponse, GetUserRequest>) => {
   const user = await userService.getById(
      ctx.params.id === 'me' ? ctx.state.session.userId : ctx.params.id,
   );
   ctx.status = 200;
   ctx.body = user;
}

getUserById.validationScheme = {
   params: {
      id: Joi.alternatives().try(Joi.number().integer().positive(), Joi.string().valid('me')),
   },
}

const createUser = async (ctx : KoaContext<LoginResponse, void, CreateUserRequest>) => {
   const token : any = await userService.create(ctx.request.body);

   ctx.status = 200;
   ctx.body = { token };
}

createUser.validationScheme = {
   body : {
      firstName : Joi.string(),
      lastName : Joi.string(),
      emailadres : Joi.string().email(),
      password : Joi.string(),
      image : Joi.string(),
   }
}

const updateUser = async (ctx : KoaContext<UpdateUserResponse, IdParams, UpdateUserRequest>) => {
   const user = await userService.updateById(Number(ctx.params.id), ctx.request.body);
   ctx.body = user
}

updateUser.validationScheme = {
   params : {
      id : Joi.number().integer().positive()
   },
   body : {
      firstName : Joi.string(),
      lastName : Joi.string(),
      emailadres : Joi.string().email(),
   }
}

const deleteUser = async (ctx : KoaContext<void, IdParams>) => {
   await userService.deleteById(Number(ctx.params.id));
   ctx.status = 204; 
}

deleteUser.validationScheme = {
   params : {
      id : Joi.number().integer().positive()
   }
}

export default (parent: KoaRouter) => {
   const router = new Router<TemplateAppState, TemplateAppContext>({
     prefix: '/users',
   });

   const requireAdmin = makeRequireRole(Role.ADMIN);

   router.get("/", requireAuthentication, validate(getAllUsers.validationScheme), getAllUsers);
   router.get("/:id", requireAuthentication, validate(getUserById.validationScheme), checkUserId, getUserById);
   router.post("/", authDelay, validate(createUser.validationScheme), createUser);
   router.put("/:id", requireAuthentication, validate(updateUser.validationScheme), checkUserId, updateUser);
   router.delete("/:id", requireAdmin, requireAuthentication, validate(deleteUser.validationScheme), checkUserId, deleteUser);

   parent.use(router.routes()).use(router.allowedMethods());
};

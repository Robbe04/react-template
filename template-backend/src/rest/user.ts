import { KoaContext, KoaRouter, TemplateAppContext, TemplateAppState } from "../types/koa";
import * as userService from "../service/user"
import { CreateUserRequest, CreateUserResponse, GetAllUsersResponse, GetUserByIdResponse, UpdateUserRequest, UpdateUserResponse } from "../types/user";
import { IdParams } from "../types/common";
import Router from "@koa/router";
import Joi from "joi";
import validate from '../core/validation';


const getAllUsers = async (ctx: KoaContext<GetAllUsersResponse>) => {
   const users = await userService.getAll();
   ctx.body = {
     items: users,
   };
 };

getAllUsers.validationScheme = null;

const getUserById = async (ctx : KoaContext<GetUserByIdResponse, IdParams>) => {
   const user = await userService.getById(Number(ctx.params.id));
   ctx.body = user
}

getUserById.validationScheme = {
   params: {
      id: Joi.number().integer().positive(),
   },
}

const createUser = async (ctx : KoaContext<CreateUserResponse, void, CreateUserRequest>) => {
   const user = await userService.create(ctx.request.body);
   ctx.body = user;
   ctx.status = 201;
}

createUser.validationScheme = {
   body : {
      firstName : Joi.string(),
      lastName : Joi.string(),
      emailadres : Joi.string().email(),
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

   router.get("/", validate(getAllUsers.validationScheme), getAllUsers);
   router.get("/:id", validate(getUserById.validationScheme), getUserById);
   router.post("/", validate(createUser.validationScheme), createUser);
   router.put("/:id", validate(updateUser.validationScheme), updateUser);
   router.delete("/:id", validate(deleteUser.validationScheme), deleteUser);

   parent.use(router.routes()).use(router.allowedMethods());
};

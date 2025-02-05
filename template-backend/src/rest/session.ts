import Router from '@koa/router';
import Joi from 'joi';
import validate from '../core/validation';
import * as userService from '../service/user';
import type {KoaContext, KoaRouter, TemplateAppState, TemplateAppContext} from '../types/koa';
import type { LoginResponse, LoginRequest } from '../types/user';
import { authDelay } from '../core/authentication';

const login = async (ctx: KoaContext<LoginResponse, void, LoginRequest>) => {
  const { emailadres, password } = ctx.request.body;
  const token = await userService.login(emailadres, password);

  ctx.status = 200;
  ctx.body = { token };
};

login.validationScheme = {
  body: {
    emailadres: Joi.string().email(),
    password: Joi.string(),
  },
};

export default function installSessionRouter(parent: KoaRouter) {
  const router = new Router<TemplateAppState, TemplateAppContext>({
    prefix: '/sessions',
  });

  router.post('/', authDelay, validate(login.validationScheme), login);

  parent.use(router.routes()).use(router.allowedMethods());
}

import Router from "@koa/router";
import type { TemplateAppContext, TemplateAppState, KoaApplication } from "../types/koa";
import userRoutes from "../rest/user";
import productRouter from "../rest/product"
import loginRouter from "../rest/session"

export default (app: KoaApplication) => {
  const router = new Router<TemplateAppState, TemplateAppContext>({
    prefix: "/api", 
  });

  userRoutes(router);
  productRouter(router);
  loginRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};

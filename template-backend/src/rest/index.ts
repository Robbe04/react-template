import Router from "@koa/router";
import type { TemplateAppContext, TemplateAppState, KoaApplication } from "../types/koa";
import userRoutes from "../rest/user";

export default (app: KoaApplication) => {
  const router = new Router<TemplateAppState, TemplateAppContext>({
    prefix: "/api", 
  });

  userRoutes(router);

  app.use(router.routes()).use(router.allowedMethods());
};

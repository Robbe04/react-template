import { getLogger } from "../core/logging";
import bodyParser from 'koa-bodyparser'; 
import Router from '@koa/router'; 
import { initializeData } from './data';

const Koa = require('koa'); 
const app = new Koa(); 

async function main() : Promise<void> {
  app.use(bodyParser());

const router = new Router();

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(9000, () => {
  getLogger().info('🚀 Server listening on http://127.0.0.1:9000');
});

await initializeData();
}

main();


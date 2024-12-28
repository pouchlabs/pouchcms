import app from "./core/entry.js";
import { createServer as createViteServer} from 'vite'
import glob from "fast-glob"
import {join} from "path";
import { rmSync } from "fs";
import { logError } from "./utils/index.js";
import chokidar from "chokidar";
import {handler} from "@pouchcms/cms/handler"
const watcher = chokidar.watch([join(process.cwd(),"./.pouchcms"),"./src"],{
    persistent: true
  });
export async function startDevServer(){

 // Create Vite server in middleware mode and configure the app type as
 // 'custom', disabling Vite's own HTML serving logic so parent server
 // can take control
 const vite = await createViteServer({
   server: { 
    middlewareMode: true 
   },
   appType: 'custom'
 })
app.use(vite.middlewares) 
//  watcher.on("change",()=>{
//     vite.restart()
//     vite.ws.send({ type: 'full-reload' })
//    }) 
//app.use(handler)
 setTimeout(async() => {   
 
    try {
        const entries = await glob.glob(["./vite.config.js.*.*","./vite.config.js.*",
            "./vite.config.ts.*.*",
            "./vite.config.ts.*",
        ])
        entries.forEach(e=>{
         rmSync(e,{recursive:true})
        })
    } catch (error) {
        logError(error.message)
        process.exit(1)
    }
 },2);

}
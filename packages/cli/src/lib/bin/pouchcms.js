#!/usr/bin/env node

import sade from "sade";
import {join} from "path";
import { init } from "../init.js";
import {existsSync} from "fs";

import {logWarning} from "../utils/index.js";


const prog = sade("pouchcms");
prog
  .version("1.0.0")

  //init
  prog.command("init")
  .describe('init initializes new pouchcms project')
  .option('-d, --dir', 'project directory',join(process.cwd()))
  .option('-devport, --devport', 'dev server port, default <7090>',7090)
  .option('-prodport, --prodport', 'prod server port, default <7092> ',7092)
  .example('init -d="/webapp" -prodport=3000')
  .example('init --dir="./webapp"')
  .example('init')
  .action(async (opts) => {
     init(opts)
  });
  prog
  .command('dev')
  .describe('dev starts a vite dev server')
  .option('-p, --port', 'prod server port, default <7090> ',7090)
  .example('dev')
  .example('dev --port 2000')
  .action(async(opts) => {
      global.POUCH_MODE = opts.port || opts.p || 7090;
   if(!existsSync(join(process.cwd(),"./.pouchcms/config.json"))){
    logWarning("pouchcms config is missing")
    process.exit(1)
   }
     const startDevServer = (await import("../dev.js")).startDevServer;
   
     startDevServer()
  });

  prog
  .command('start')
  .describe('start starts a production server')
  .option('-p, --port', 'server port ',7092)
  .example('start -p 4000')
  .example('start --port 4000')
  .example('start')
  .action((opts) => {
    if(!existsSync(join(process.cwd(),"./.pouchcms/config.json"))){
        logWarning("pouchcms config is missing")
        process.exit(1)
     }
     console.log(opts)
  });

prog.parse(process.argv);
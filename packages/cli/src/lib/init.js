//import { config } from "./config.js";
import {join} from "path";
import { existsSync,mkdirSync} from "fs";
import { createFolder,logError,logWarning } from "./utils/index.js";
import { JSONFilePreset } from "lowdb/node";
import { readJson } from "./utils/index.js";

const pkg = JSON.parse(readJson(join(process.cwd(),"./package.json")))

const defaultconf = {
    plugins:[],
    pkg,
    confpath:join(process.cwd(),"./.pouchcms/config.json"),
    path:join(process.cwd(),"./.pouchcms"),
    prodport:7092,
    devport:7090
}

async function verify(path,opts){
    
  if(!existsSync(join(path,"./.pouchcms"))){
    //
    try {
        mkdirSync(join(path,"./.pouchcms"),{recursive:true})
        const conf = await JSONFilePreset(join(path,"./.pouchcms/config.json"),defaultconf)
        conf.data.confpath=join(path,"./.pouchcms/config.json");
        conf.data.path = join(path,"./.pouchcms")
        conf.data.devport = opts.devport || 7090;
        conf.data.prodport = opts.prodport || 7092;
        conf.write()
    } catch (error) {
       logError(error.message)
       process.exit(1) 
    }
    return 
  }
     //exists
     if(existsSync(join(path,"./.pouchcms"))){
        logWarning(`seems like pouchcms is already initialised in:\n ${path}`)
        process.exit(0)
    }
 
}
export async function init(opts){
    const path = join(opts.d) || join(opts.dir);
    //int parent folder
    if(!existsSync(path)){
        //create
        try {
      
         mkdirSync(path,{recursive:true})
         
            setTimeout(async()=>{
                verify(path,opts)
            },5)
          
       
        } catch (error) {
           logError(error.message)
        }
        return
       }
       verify(path,opts)
     
}
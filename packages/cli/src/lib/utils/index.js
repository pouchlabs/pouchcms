import {existsSync,readFileSync,mkdirSync} from "fs";
import colors from "kleur";

export function logError(msg=""){
  console.log(new Error(`${colors.bold().red("[pouchcms]: ")} ${msg}`))
}
export function logWarning(msg=""){
  console.log(new Error(`${colors.bold().yellow("[pouchcms]: ")} ${msg}`))
}
export function createFolder(path=""){
  if(!existsSync(path)){
    //create
    try {
  
      mkdirSync(path,{recursive:true})
    } catch (error) {
       logError(error.message)
    }
   }
}
export function readJson(path=""){

  if(existsSync(path)){
    let file;
    try {
      file = readFileSync(path,{encoding:"utf8"})
       return file
    } catch (error) {
      logError(error.message)
      return null
      
    }
 
  }
  logError("json path does not exist")
}
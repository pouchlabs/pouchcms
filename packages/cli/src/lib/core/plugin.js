import app from "./entry.js";
import { logError } from "../utils/index.js";

export default class Plugin{
   constructor(name=""){
      if(name && typeof name === "string" && name.length > 0){
         //register
        return app.Router(name)
      }else{
        logError("plugin name must be a string")
      }
   }
}

 
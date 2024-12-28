import { JSONFilePreset } from "lowdb/node";
import { readJson } from "./utils/index.js";
import {join} from "path";

const pkg = JSON.parse(readJson(join(process.cwd(),"./package.json")))

const defaultconf = {
    plugins:[],
    pkg,
    confpath:join(process.cwd(),"./.pouchcms/config.json"),
    path:join(process.cwd(),"./.pouchcms")
}

export const config = JSONFilePreset(defaultconf.confpath,defaultconf)
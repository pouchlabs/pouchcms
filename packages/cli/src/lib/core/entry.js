import { Fastee } from "fasteejs";
 const mode = globalThis.POUCH_MODE;
 const port = mode
const app = new Fastee({port:port})
export default app;


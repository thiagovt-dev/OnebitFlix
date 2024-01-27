import env from "env-var";
const {get} = env

export const DATABASE_URL = get("DATABASE_URL").required().asString();
export const ADMINJS_COOKIE_PASSWORD = get("ADMINJS_COOKIE_PASSWORD").required().asString();
export const JWT_KEY = get("JWT_KEY").required().asString();

import AdminJs from "adminjs";
import AdminJsExpress from "@adminjs/express";
import AdminJsSequelize from "@adminjs/sequelize";
import { database } from "../database/index.js";
import { adminJsResource } from "./resources/index.js";
import { Components, componentLoader } from "./componentLoader.js";
import { locale } from "./locale.js";
import { dashboardHandler } from "./handlers/dashboard.js";
import brandingOptions from "./features/branding.js";
import authenticationOptions from "./features/authentication.js";


AdminJs.registerAdapter(AdminJsSequelize);

export const adminJs = new AdminJs({
  databases: [database],
  rootPath: "/admin",
  resources: adminJsResource,
  componentLoader,
  branding: brandingOptions,
  locale, 
  dashboard :{
    component: Components.Dashboard,
    handler: dashboardHandler
  }
});

export const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(
  adminJs,
  authenticationOptions,
  null,{
    resave: false,
    saveUninitialized: false,
  }
);

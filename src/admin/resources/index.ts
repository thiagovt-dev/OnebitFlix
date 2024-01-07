import { ResourceWithOptions } from "adminjs";
import { Category } from "../../models/index.js";
import { categoryResourceOptions } from "./category.js";

export const adminJsResource: ResourceWithOptions[] = [
  { 
    resource: Category, 
    options: categoryResourceOptions 
},
];

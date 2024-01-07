import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";
import * as url from "url";
import { componentLoader } from "../componentLoader.js";
import uploadFileFeature from "@adminjs/upload";

export const courseResourceOptions: ResourceOptions = {
  navigation: "Catálogo",
  editProperties: [
    "name",
    "synopsis",
    "uploadThumbnail",
    "featured",
    "categoryId",
  ],
  filterProperties: [
    "name",
    "synopsis",
    "featured",
    "categoryId",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["id", "name", "featured", "categoryId"],
  showProperties: [
    "id",
    "name",
    "synopsis",
    "featured",
    "thumbnailUrl",
    "categoryId",
    "createdAt",
    "updatedAt",
  ],
};

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export const courseResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, "../../../public"),
        opts: {
          baseUrl: "",
        },
      },
    },
    componentLoader,
    validation: { mimeTypes: ["image/png", "image/jpg", "image/gif"] },
    properties: {
      key: "thumbnailUrl",
      file: "uploadThumbnail",
    },
    uploadPath: (record, filename) =>
      `thumbnails/course-${record.get("id")}/${filename}`,
  }),
];

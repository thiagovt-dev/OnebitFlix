import uploadFileFeature from "@adminjs/upload";
import { FeatureType, ResourceOptions } from "adminjs";
import path from "path";
import * as url from "url";
import { componentLoader } from "../componentLoader.js";

export const episodeResourceOptions: ResourceOptions = {
  navigation: "Catálogo",
  editProperties: [
    "name",
    "synopsis",
    "courseId",
    "order",
    "uploadVideo",
    "secondsLong",
  ],
  filterProperties: [
    "name",
    "synopsis",
    "courseId",
    "secondsLong",
    "createdAt",
    "updatedAt",
  ],
  listProperties: ["id", "name", "courseId", "order", "secondsLong"],
  showProperties: [
    "id",
    "name",
    "synopsis",
    "courseId",
    "order",
    "videoUrl",
    "secondsLong",
    "createdAt",
    "updatedAt",
  ],
};
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export const episodeResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, "../../../uploads"),
        opts: {
          baseUrl: "",
        },
      },
    },
    validation: { mimeTypes: ["video/mp4", "video/webm", "video/x-matroska"] },
    componentLoader,
    properties: {
      key: "videoUrl",
      file: "uploadVideo",
    },
    uploadPath: (record, filename) =>
      `videos/course-${record.get("courseId")}/${filename}`,
  }),
];

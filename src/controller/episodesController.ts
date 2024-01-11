import { Request, Response } from "express";
import { episodeService } from "../services/episodeService.js";

export const episodesController = {
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query;
    try {
      if (typeof videoUrl !== "string") throw new Error("videoUrl params must be of type string");
      const range = req.headers.range; // as /bytes=0-1024
      episodeService.streamEpisodeResponse(res, videoUrl, range)
    } catch (err) {
      if (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
      }
    }
  },
};

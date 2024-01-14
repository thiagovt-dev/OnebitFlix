import { Request, Response } from "express";
import { episodeService } from "../services/episodeService.js";
import { AuthorizationRequest } from "../middlewares/auth.js";

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
  getWatchTime: async (req: AuthorizationRequest, res: Response) =>{
    const userId = req.user!.id;
    const { id } = req.params
    try {
      const watchTime = await episodeService.getWatchTime(userId, Number(id))
      return res.status(201).json({watchTime})
    } catch (err) {
      if (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
      }
    }
  },

  setWatchTime: async (req: AuthorizationRequest, res: Response) =>{
    const userId = req.user!.id;
    const episodeId = Number(req.params.id);
    const {seconds} = req.body
    try {
      const watchTime = await episodeService.setWatchTime({ userId, episodeId, seconds });
      return res.status(201).json(watchTime)
    } catch (err) {
      if (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
      }
    }
  }
};

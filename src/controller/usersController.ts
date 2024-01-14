import { Response } from "express";
import { AuthorizationRequest } from "../middlewares/auth.js";
import { userService } from "../services/userService.js";

export const usersController = {
  show: async (req: AuthorizationRequest, res: Response) => {
    const currentUser = req.user!;

    try {
      return res.status(201).json({ currentUser });
    } catch (err) {
      if (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
      }
    }
  },

  update: async (req: AuthorizationRequest, res: Response) => {
    const { id } = req.user!;
    const { firstName, lastName, phone, birth, email } = req.body;

    try {
      const updatedUser = await userService.updateUser(id, {
        firstName,
        lastName,
        phone,
        birth,
        email,
      });

      return res.status(201).json(updatedUser);
    } catch (err) {
      if (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
      }
    }
  },

  updatePass: async (req: AuthorizationRequest, res: Response) => {
    const user = req.user!;
    const { currentPassword, newPassword } = req.body;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    user.checkPassword(currentPassword, async (err, isSame) => {
      try {
        if (err) {
          return res.status(400).json({ message: err.message });
        }   
        if (!isSame) {
          return res.status(400).json({ message: "Invalid password" });
        }

        await userService.updateUserPassword(user.id, newPassword);
        return res.status(204).send();
      } catch (err) {
        if (err) {
          if (err instanceof Error) {
            return res.status(400).json({ message: err.message });
          }
        }
      }
    });
  },

  watching: async (req: AuthorizationRequest, res: Response) => {
    const { id } = req.user!;

    try {
      const watching = await userService.getKeepWatchList(id);
      return res.json({ watching });
    } catch (err) {
      if (err) {
        if (err instanceof Error) {
          return res.status(400).json({ message: err.message });
        }
      }
    }
  },
};

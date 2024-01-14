import { EpisodeInstance } from "../models/Episode.js";
import { User, UserCreationAttributes } from "../models/Users.js";

const filterLastEpisodesByCourse = (episodes: EpisodeInstance[]) => {
  const coursesOnList: number[] = [];

  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!coursesOnList.includes(episode.courseId)) {
      coursesOnList.push(episode.courseId);
      currentList.push(episode);
      return currentList;
    }
    const episodeFromSameCourse = currentList.find((ep) => ep.courseId === episode.courseId);
    if (episodeFromSameCourse!.order > episode.order) return currentList;

    const listWithoutEpisodeFromSameCourse = currentList.filter((ep) => ep.courseId !== episode.courseId);
    listWithoutEpisodeFromSameCourse.push(episode);

    return listWithoutEpisodeFromSameCourse;
  }, [] as EpisodeInstance[]);

  return lastEpisodes;
};

export const userService = {
  findUserByEmail: async (email: string) => {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  },
  createUser: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes);
    return user;
  },

  updateUser: async (
    id: number,
    attributes: {
      firstName: string;
      lastName: string;
      phone: string;
      birth: Date;
      email: string;
    }
  ) => {
    const [affectedRows, updatedUsers] = await User.update(attributes, { where: { id }, returning: true });

    return updatedUsers[0];
  },
  updateUserPassword: async (
    id: number,
    password: string
  ) => {
    const [affectedRows, updatedUsers] = await User.update({password}, { where: { id }, returning: true, individualHooks: true });

    return updatedUsers[0];
  },

  getKeepWatchList: async (id: number) => {
    const userWithWatchingEpisodes = await User.findByPk(id, {
      include: {
        association: "Episodes",
        include: [
          {
            association: "Course",
          },
        ],
        through: {
          as: "watchTime",
        },
      },
    });
    if (!userWithWatchingEpisodes) throw new Error("User not found");

    const keepWatchingList = filterLastEpisodesByCourse(userWithWatchingEpisodes.Episodes!);

    return keepWatchingList;
  },
};

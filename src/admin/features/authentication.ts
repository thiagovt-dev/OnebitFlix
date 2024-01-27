import { AuthenticationOptions } from "@adminjs/express";

import { User } from "../../models/Users.js";
import bcrypt from "bcrypt";
import { ADMINJS_COOKIE_PASSWORD } from "../../config/environment.js";

const authenticationOptions: AuthenticationOptions = {
    authenticate: async (email, password) => {
      const user = await User.findOne({ where: { email } });

      if (user && user.role === 'admin') {
        const matched = await bcrypt.compare(password, user.password);
        if (matched) return user;
      }
      return false;
    },
    cookiePassword: ADMINJS_COOKIE_PASSWORD,
  }

  export default authenticationOptions
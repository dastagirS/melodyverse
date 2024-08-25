import { Context } from "hono";
const User = require("../models/user");

export async function getUser(c: Context) {
  let user = c.get("userId");

  let getUserName = await User.findOne({ user });

  return c.json(getUserName, 201)
}

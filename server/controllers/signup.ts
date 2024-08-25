import { Context } from "hono";
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { sign } from "hono/jwt";

export async function signUp(c: Context) {
  try {
    let { username, email, password } = await c.req.parseBody();

    // checks before hand if the user already exist in the db
    let getUserEmail = await User.findOne({ email });

    if (getUserEmail)
      return c.json("Signup failed: user already exist", 400);

    //hasing the password using bcrypt
    let encryptPassword = await bcrypt.hash(password, 10); // 10 here is the bcrypt salt rounds

    let newUser = new User({ username, email, password: encryptPassword });

    //saves/ creates user info in database
    await newUser.save();

    //signs the user info and generates jwt token
    let token = jwt.sign(
      { username: username, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

  const refreshToken = jwt.sign(
      {username: username,  id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    const result = {
      authSuccess: "true",
      token: token,
      refreshToken: refreshToken,
    };
    return c.json(result, 201);
  } catch (err) {
    return c.json(`Signup failed: ${err}`, 501);
  }
}

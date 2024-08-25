import { Context } from "hono";
import { setCookie } from "hono/cookie";
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export async function login(c: Context) {
  try {
    let { email, password } = await c.req.parseBody();

    //check weather password is available on formdata
    if (!email && !password)
      return c.json("Auth failed: password and email required", 401);

    //search user based on email
    const getEmail = await User.findOne({ email });

    //if neither is present return error
    if (!getEmail) return c.json("Auth failed: user not found", 401);
    const passwordMatch = await bcrypt.compare(password, getEmail.password);
    if (!passwordMatch) {
      return c.json("Auth failed: wrong password", 401);
    }

    //on success signin email with jwt
    const token = jwt.sign({ userId: getEmail._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(
      { userId: getEmail._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    c.set("jwtToken", token);

    setCookie(c, "refreshToken", refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // Setting the expiration time (7 days)
    });

    const result = {
      authSuccess: "true",
      token: token,
      refreshToken: refreshToken,
    };

    return c.json(result, 200);
  } catch (err) {
    const result = {
      authSuccess: "false",
      error: err,
    };
    return c.json(result, 501);
  }
}

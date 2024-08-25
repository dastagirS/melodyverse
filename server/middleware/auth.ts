import { getCookie, getSignedCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
const jwt = require("jsonwebtoken");
const User = require("../models/user");

export const verifyJwtToken = createMiddleware(async (c, next) => {
  const secretKey = process.env.JWT_SECRET;
  //check and get jwt token from header
  //const getJwt = c.req.header("Authorization");

  // if not return error
  //if (!getJwt || !getJwt.startsWith("Bearer ")) {
  // return c.json("Not authorized 1", 401);
  //}

  const getTokenFromCookie = await getSignedCookie(c, "refreshToken");

  if (getTokenFromCookie) {
    jwt.verify(getTokenFromCookie, secretKey, (err :Error, decoded :any) => {
      if (err) {
        // Handle invalid or expired refresh token
        return c.json({ error: "Invalid or expired refresh token" }, 401);
      } else {
        // Generate a new JWT token
        const newJwtToken = jwt.sign({ userId: decoded.userId }, secretKey, {
          expiresIn: "1h",
        });

        // Update the JWT token in session storage
        c.set("jwtToken", newJwtToken);
        next()
      }
    });
  }

  /*
    //splitting token to remove unwanted text
    const token = getJwt.split(" ")[1];
    if (!token) return c.json("Verification failed: Access denied", 401);
    //on success verify the token
    try {
      const decoded = jwt.verify(token, secretKey);
      c.set("userId", decoded.userId);
      //make sures upcoming function runs after verifying
      next();
    } catch (err) {
      return c.body(`verification failed: ${err}`, 401);
    }
  
      */
});

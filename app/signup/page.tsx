"use client";

import { useState } from "react";
import { z, ZodType } from "zod";
import { nameRegex, passwordRegex } from "../utils/regex";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { verifyJwtToken } from "@/server/middleware/auth";

export default function Signup() {
  const router = useRouter();

  //user type
  type userInputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  //zod schema for validation
  const userSchema: ZodType<userInputs> = z
    .object({
      name: z.string().min(2).max(30).regex(nameRegex),
      email: z.string().email(),
      password: z
        .string()
        .regex(
          passwordRegex,
          "Password should contain atleast 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character",
        )
        .min(5, { message: "Password should be more than 6 letters" })
        .max(30, { message: "Password should be less than 30 letters" }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password doesn't match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userInputs>({ resolver: zodResolver(userSchema) });

  async function signUpUser(data: userInputs) {
    const formdata = new FormData();
    formdata.append("username", data.name);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    try {
      const req = await fetch("/api/signup", {
        method: "POST",
        body: formdata,
      });
      const res = await req.json();
     // router.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  //show hide password transition and state management
  const [showPass, setShowPass] = useState("password");

  function showPassword() {
    if (showPass === "password") {
      setShowPass("text");
    }
  }

  function hidePassword() {
    if (showPass === "text") {
      setShowPass("password");
    }
  }

  return (
    <div className="main">
      <div className="signup-screen">
        <span>
          <img className="logo" src="/logo.png" />
          <i className="slogan">taste the music</i>
        </span>
        <form onSubmit={handleSubmit(signUpUser)}>
          <div className="input-pfp">
            <img src="https://res.cloudinary.com/dxi9wcchp/image/upload/v1668363431/personal/me_whjo7r.jpg" />
            <input type="file" id="pfp" />
            <label htmlFor="pfp">Select your profile photo</label>
          </div>
          <div className="input">
            <input
              type="text"
              className="name"
              placeholder="Name"
              {...register("name")}
            />
          </div>
          {errors.name && <p className="error">Enter a valid name</p>}

          <div className="input">
            <input
              type="email"
              className="email"
              placeholder="Email*"
              required
              {...register("email")}
            />
          </div>
          {errors.email && <p className="error">Enter a valid email</p>}
          <div className="input">
            <input
              type={showPass}
              className="password"
              placeholder="Password*"
              required
              {...register("password")}
            />
            {showPass === "password" ? (
              <img onClick={showPassword} src="/hide.svg" />
            ) : (
              <img onClick={hidePassword} src="/show.svg" />
            )}
          </div>
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <div className="input">
            <input
              required
              type={showPass}
              className="password"
              placeholder="Confirm Password*"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}

          <button type="submit" className="signup-btn">
            Signup
          </button>
          <p>
            <input type="checkbox" required />
            By Filling This Form I Agree To The{" "}
            <a href="" className="link-primary">
              Terms and Conditions
            </a>
          </p>
          <p>
            already have an account?
            <a href="/" className="link-primary">
              login
            </a>
          </p>
        </form>
      </div>
      <div className="signup-art">
        <img className="bg-art" src="/signup-bg.png" />
      </div>
    </div>
  );
}

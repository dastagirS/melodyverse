"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordRegex } from "./utils/regex";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  type userInputs = {
    email: string;
    password: string;
  };

  type response = {
    authSuccess: string;
    refreshToken: string;
    token: string;
  };

  const userSchema: ZodType<userInputs> = z.object({
    email: z.string().email(),
    password: z
      .string()
      .regex(
        passwordRegex,
        "Password should contain atleast 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character",
      )
      .min(5, { message: "Password should be more than 6 letters" })
      .max(30, { message: "Password should be less than 30 letters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userInputs>({ resolver: zodResolver(userSchema) });

  //error state for error upcoming from api
  const [error, setError] = useState("");

  //login function
  async function loginUser(data: userInputs) {
    const formdata = new FormData();
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    try {
      const req = await fetch("/api/login", {
        method: "POST",
        body: formdata,
      });
      const res: response = await req.json();
      router.push("/userProfile")
    } catch (err) {
      console.log(err);
    }
  }

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
      <div className="login-art">
        <img className="bg-art" src="/login-bg.png" />
      </div>
      <div className="login-screen">
        <span>
          <img className="logo" src="/logo.png" />
          <i className="slogan">taste the music</i>
        </span>
        <form onSubmit={handleSubmit(loginUser)}>
          <div className="input">
            <input
              {...register("email")}
              type="email"
              className="email"
              placeholder="Email*"
            />
          </div>
          {errors.email && <p className="error">please enter a valid email</p>}
          <div className="input">
            <input
              {...register("password")}
              type={showPass}
              className="password"
              placeholder="Password*"
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
          <p className="error">{error}</p>
          <button type="submit" className="login-btn">
            Login
          </button>
          <a href="">forgot password?</a>
          <p>
            don't have an account?
            <a href="/signup" className="link-primary">
              signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

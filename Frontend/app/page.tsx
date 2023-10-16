"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const postLogin = async ({ email, password, name }: { email: string; password: string; name: string }) => {
    const res = await fetch("https://oyster-app-2xnwc.ondigitalocean.app/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();

    const token = data.token;    
    localStorage.setItem("token", token);

    return data;
};

const postSignup = async ({ email, password, name }: { email: string; password: string; name: string }) => {
    const res = await fetch("https://oyster-app-2xnwc.ondigitalocean.app/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json(); 
    return data;
};

export default function Home() {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (emailRef.current && passwordRef.current) {
            toast.loading("Sending Request 🚀", { id: "1" });

            if (isLogin) {
                const data = await postLogin({
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value,
                    name: nameRef.current?.value ?? "",
                });
                
                if (data.token) {
                    localStorage.setItem("token", data.token);                    
                    toast.success("Login Successfully", { id: "1" });
                    router.push(`/blog/home/${data.user._id}/${data.token}`);
                }
                else {
                    toast.error("Authentication Error!!!", { id: "1" });
                }
            } else {
                await postSignup({
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value,
                    name: nameRef.current?.value ?? "",
                });
                toast.success("Signup Successful", { id: "1" });
                setIsLogin(true);
            }
        }
    };

    return (
        <Fragment>
            <Toaster />
            <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-slate-800 drop-shadow-xl">
                <h1 className="text-slate-200 text-center text-2xl font-extrabold font-[verdana]">
                    SocioDot Blog App
                </h1>
            </div>
            <div className="w-full m-auto flex my-4">
                <div className="flex flex-col justify-center items-center m-auto">
                    <p className="text-2xl text-slate-200 font-bold p-3">
                        {isLogin ? "Login Page 🔐" : "Signup Page 📝"}
                    </p>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <input
                                ref={nameRef}
                                placeholder="Enter Name"
                                type="text"
                                className="rounded-md px-4 w-full py-2 my-2"
                            />
                        )}
                        <input
                            ref={emailRef}
                            placeholder="Enter Email"
                            type="text"
                            className="rounded-md px-4 w-full py-2 my-2"
                        />
                        <input
                            ref={passwordRef}
                            placeholder="Enter Password"
                            type="password"
                            className="rounded-md px-4 w-full py-2 my-2"
                        />
                        <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover-bg-slate-100">
                            {isLogin ? "Login" : "Signup"}
                        </button>
                    </form>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-slate-200 text-sm mt-2 underline cursor-pointer"
                    >
                        {isLogin ? "Switch to Signup" : "Switch to Login"}
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

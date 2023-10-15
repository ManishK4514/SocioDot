"use client";

import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
type UpdateBlogParams = {
    title: string;
    description: string;
    id: string;
};
const updateBlog = async (data: UpdateBlogParams, id: string, token: string) => {
    const res = fetch(`https://oyster-app-2xnwc.ondigitalocean.app/post/${id}/update`, {
        method: "PATCH",
        body: JSON.stringify({
            heading: data.title,
            description: data.description,
        }),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        //@ts-ignore
        "Content-Type": "application/json",
    });
    return (await res).json();
};

const deleteBlog = async (id: string, token: string) => {
    const res = fetch(`https://oyster-app-2xnwc.ondigitalocean.app/post/${id}/delete`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        //@ts-ignore
        "Content-Type": "application/json",
    });
    return (await res).json();
};

const getBlogById = async (id: string, token: string) => {
    const res = await fetch(`https://oyster-app-2xnwc.ondigitalocean.app/post/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
};

const EditBlog = ({ params }: { params: { userid: string, id: string, token: string } }) => {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        toast.loading("Fetching Blog Details 🚀", { id: "1" });
        getBlogById(params.id, params.token)
            .then((data) => {
                if (data) {
                    if (titleRef.current && descriptionRef.current) {
                        titleRef.current.value = data.heading;
                        descriptionRef.current.value = data.description;
                        toast.success("Fetching Complete", { id: "1" });
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error fetching blog", { id: "1" });
            });
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (titleRef.current && descriptionRef.current) {
            toast.loading("Sending Request 🚀", { id: "1" });
            await updateBlog({
                title: titleRef.current?.value,
                description: descriptionRef.current?.value,
                id: params.id,
            },
            params.id,           
            params.token,            
            );
            toast.success("Blog Posted Successfully", { id: "1" });
            await router.push(`/blog/home/${params.userid}/${params.token}`);
        }
    };
    const handleDelete = async () => {
        toast.loading("Deleting Blog", { id: "2" });
        await deleteBlog(params.id, params.token);
        toast.success("Blog Deleted", { id: "2" });
        await router.push(`/blog/home/${params.userid}/${params.token}`);
    };
    return (
        <Fragment>
            <Toaster />
            <div className="w-full m-auto flex my-4">
                <div className="flex flex-col justify-center items-center m-auto">
                    <p className="text-2xl text-slate-200 font-bold p-3">
                        Edit A Wonderful Blog 🚀
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input
                            ref={titleRef}
                            placeholder="Enter Title"
                            type="text"
                            className="rounded-md px-4 w-full py-2 my-2 "
                        />
                        <textarea
                            ref={descriptionRef}
                            placeholder="Enter Description"
                            className="rounded-md px-4 py-2 w-full my-2"
                        ></textarea>
                        <div className="flex justify-between">
                            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                                Update
                            </button>
                        </div>
                    </form>
                    <button
                        onClick={handleDelete}
                        className="font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg  m-auto mt-2 hover:bg-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default EditBlog;

"use client";

import { useRouter } from "next/navigation";
import { Fragment, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const postBlog = async ({
    author,
    title,
    description,
    image,
    userId,
    token,
}: {
    author: string;
    title: string;
    description: string;
    image: File;
    userId: string;
    token: string;
}) => {
    var url = "";

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dvxwjcwcm");

    fetch("https://api.cloudinary.com/v1_1/dvxwjcwcm/image/upload", {
        method: "post",
        body: data,
    })
        .then((res) => res.json())
        .then(async (data) => {
            console.log(data.url);
            url = data.url;

            const res = await fetch("https://oyster-app-2xnwc.ondigitalocean.app/post", {
                method: "POST",
                body: JSON.stringify({
                    userId,
                    author,
                    heading: title,
                    fileUrl: url,
                    description,
                }),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return await res.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

const AddBlog = ({ params }: { params: { userid: string, token: string } }) => {
    const router = useRouter();
    const authorRef = useRef<HTMLInputElement | null>(null);
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
    const imageRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (
            authorRef.current &&
            titleRef.current &&
            descriptionRef.current &&
            imageRef.current &&
            imageRef.current.files &&
            imageRef.current.files[0]
        ) {
            const author = authorRef.current.value;
            const title = titleRef.current.value;
            const description = descriptionRef.current.value;
            const image = imageRef.current.files[0];

            toast.loading("Sending Request 🚀", { id: "1" });
            try {
                await postBlog({ author, title, description, image, userId: params.userid, token: params.token });
                toast.success("Blog Posted Successfully", { id: "1" });
                router.push(`/blog/home/${params.userid}/${params.token}`);
            } catch (error) {
                toast.error("Error posting the blog", { id: "1" });
            }
        } else {
            toast.error(
                "Please fill in all the required fields and select an image",
                { id: "2" }
            );
        }
    };

    return (
        <Fragment>
            <Toaster />
            <div className="w-full m-auto flex my-4">
                <div className="flex flex-col justify-center items-center m-auto">
                    <p className="text-2xl text-slate-200 font-bold p-3">
                        Add A Wonderful Blog 🚀
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input
                            ref={authorRef}
                            placeholder="Enter Author Name"
                            type="text"
                            className="rounded-md px-4 w-full py-2 my-2"
                        />
                        <input
                            ref={titleRef}
                            placeholder="Enter Title"
                            type="text"
                            className="rounded-md px-4 w-full py-2 my-2"
                        />
                        <textarea
                            ref={descriptionRef}
                            placeholder="Enter Description"
                            className="rounded-md px-4 py-2 w-full my-2"
                        />
                        <input
                            ref={imageRef}
                            type="file"
                            accept="image/*, video/*"
                            className="my-2"
                        />
                        <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default AddBlog;

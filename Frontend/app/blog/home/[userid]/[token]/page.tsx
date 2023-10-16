"use-client";

import Link from "next/link";

const fetchBlogs = async (token: string) => {
    const res = await fetch("https://oyster-app-2xnwc.ondigitalocean.app/post", {
        next: {
            revalidate: 1,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();

    return data.posts;
};

const HomeBlog = async ({
    params,
}: {
    params: { userid: string; token: string };
}) => {
    const posts = await fetchBlogs(params.token);

    return (
        <main className="w-full h-full">
            <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-slate-800 drop-shadow-xl">
                <h1 className="text-slate-200 text-center text-2xl font-extrabold font-[verdana]">
                    SocioDot Blog App
                </h1>
            </div>
            {/* Link */}
            <div className="flex my-5">
                <Link
                    href={`/blog/add/${params.userid}/${params.token}`}
                    className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-200 font-semibold"
                >
                    Add New Blog 📝
                </Link>
            </div>
            {/* Blogs */}
            <div className="w-full flex  flex-col justify-center items-center">
                {posts?.map((post: any) => (
                    <div className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center" key={post.id}>
                        {post.filePath && (
                            <img
                                src={post.filePath}
                                alt="Blog Post Image"
                                className="max-w-full max-h-128 rounded-md"
                            />
                        )}
                        {/* Title and Action */}
                        <div className="flex items-center my-3">
                            <div className="mr-auto">
                                <h2 className="mr-auto font-semibold">
                                    {post.heading}
                                </h2>
                            </div>
                            {params.userid === post.userId && (
                                <Link
                                    href={`/blog/edit/${params.userid}/${post._id}/${params.token}`}
                                    className="px-4 py-1  text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200"
                                >
                                    Edit
                                </Link>
                            )}
                        </div>
                        {/* Date & Description */}
                        <div className="mr-auto my-1">
                            <blockquote className="font-bold text-slate-700">
                                {new Date(post.createdAt).toDateString()}
                            </blockquote>
                        </div>
                        <div className=" mr-auto my-1">
                            <h2>{post.description}</h2>
                        </div>
                        {/* Comments */}
                        <div className="mt-4">
                            <h3 className="font-semibold">Comments:</h3>
                            {post.Comments.map((comment: any) => (
                                <div className="flex items-center my-2" key={comment.id}>
                                    <img
                                        src={comment.userPicturePath}
                                        alt={`${comment.firstName} ${comment.lastName}`}
                                        className="w-8 h-8 rounded-full mr-2"
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            {comment.firstName}{" "}
                                            {comment.lastName}:
                                        </p>
                                        <p>{comment.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default HomeBlog;

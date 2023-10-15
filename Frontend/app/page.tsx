import Link from "next/link";

async function fetchBlogs() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Mjk4ZDkxNWIzOGU2YWIzYjZjODA3NyIsImlhdCI6MTY5NzIyMjE2NH0.MxUru6Sq98QJK39pOzd8x-_al7WSQlumnmwvcwSgn98";
    const res = await fetch("http://localhost:3001/post", {
        next: {
            revalidate: 1,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    
    return data.posts;
}

export default async function Home() {
    const posts = await fetchBlogs();
    console.log(posts);

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
                    href={"/blog/add"}
                    className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-200 font-semibold"
                >
                    Add New Blog 🚀
                </Link>
            </div>
            {/* Blogs */}
            <div className="w-full flex  flex-col justify-center items-center">
                {posts?.map((post: any) => (
                    <div className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center">
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
                            <Link
                                href={`/blog/edit/${post._id}`}
                                className="px-4 py-1  text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200"
                            >
                                Edit
                            </Link>
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
                    </div>
                ))}
            </div>
        </main>
    );
}

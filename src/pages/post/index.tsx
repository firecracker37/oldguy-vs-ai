import { useSession } from "next-auth/react";
import { getServerAuthSession } from "../../server/auth";
import { type GetServerSideProps } from "next";
import { Button } from "~/components/ui/button";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session || session.user?.role != "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

export default function Post() {
  const { data: session } = useSession();

  const [inputs, setInputs] = useState({
    authorId: session?.user.id,
    title: "",
    image: "",
    article: "",
  });
  const newArticle = api.post.createNewPost.useMutation();

  const [publishLoading, setPublishLoading] = useState(false);

  if (!session || session.user?.role != "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const PublishArticle = async () => {
    const { authorId, title, image, article } = inputs;
    if (!authorId || !title || !article) {
      return null;
    }
    setPublishLoading(true);
    try {
      const response = await newArticle.mutateAsync({
        authorId,
        title,
        image,
        article,
      });

      if (response.status === "OK") {
        setInputs({
          ...inputs,
          title: "",
          image: "",
          article: "",
        });
        toast("Article created");
      }

      setPublishLoading(false);
    } catch (error) {
      console.error(error); // Handle the error appropriately
      setPublishLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto w-full max-w-3xl bg-zinc-900 px-2 py-4">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-400">
          Create New Post
        </h1>
        <form>
          <div className="grid grid-cols-3 gap-2">
            <div>Author:</div>
            <div className="col-span-2">
              <Avatar>
                <AvatarImage
                  src={session.user.image || ""}
                  className="mr-2 inline-block h-10 w-10 rounded-full border border-gray-500"
                />
                <AvatarFallback className="bg-gray-700 text-white">
                  {session.user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-xl">{session.user.name}</span>
            </div>
            <div>Title:</div>
            <div className="col-span-2">
              <input
                type="text"
                name="title"
                className="w-full rounded-xl border border-gray-500 bg-transparent px-2 py-1 text-gray-300 outline-none focus:ring focus:ring-inset focus:ring-amber-600"
                placeholder="Article Title"
                value={inputs.title}
                onChange={(e) => {
                  setInputs({ ...inputs, title: e.target.value });
                }}
              />
            </div>
            <div>Image:</div>
            <div className="col-span-2">
              <input
                type="text"
                name="image"
                className="w-full rounded-xl border border-gray-500 bg-transparent px-2 py-1 text-gray-300 outline-none focus:ring focus:ring-inset focus:ring-amber-600"
                placeholder="Image URL (optional)"
                value={inputs.image}
                onChange={(e) => {
                  setInputs({ ...inputs, image: e.target.value });
                }}
              />
            </div>
            <div>Article:</div>
            <div className="col-span-2">
              <TextareaAutosize
                minRows={5}
                className="w-full rounded-xl border border-gray-500 bg-transparent px-2 py-1 text-gray-300 outline-none focus:ring focus:ring-inset focus:ring-amber-600"
                placeholder="Compose article in Markdown"
                value={inputs.article}
                onChange={(e) => {
                  setInputs({ ...inputs, article: e.target.value });
                }}
              ></TextareaAutosize>
            </div>
            <div>
              <Button variant={"secondary"}>Save Draft</Button>
            </div>
            <div>
              <Button
                disabled={publishLoading}
                onClick={(e) => {
                  e.preventDefault();
                  void PublishArticle();
                }}
              >
                Publish Now
              </Button>
            </div>
            <div>
              <Button variant={"destructive"}>Clear Form</Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

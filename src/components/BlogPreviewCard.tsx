import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { api } from "~/utils/api";

type BlogPreviewCardProps = {
  postId: string;
};

export default function BlogPreviewCard({ postId }: BlogPreviewCardProps) {
  const postData = api.post.getPostById.useQuery({ id: postId });

  if (postData.status === "loading") {
    return <div>Loading...</div>;
  }
  if (postData.status === "error") {
    return <div>Error...</div>;
  }
  return (
    <Link href={`/blog/${postData.data.id}`}>
      <div className="my-4 flex gap-2 rounded-xl border border-amber-800 bg-zinc-900 px-4 py-2">
        {postData.data.image && (
          <div className="relative h-[234px] w-[468px]">
            <Image
              src={postData.data.image}
              alt="Article Thumbnail"
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <div>
          <h3 className="pb-2 text-center text-lg">{postData.data.title}</h3>
          {postData.data.description && (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {postData.data.description}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </Link>
  );
}

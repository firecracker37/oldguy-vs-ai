import BlogPreviewCard from "~/components/BlogPreviewCard";
import { api } from "~/utils/api";

export default function BlogPage() {
  const recentPostsQuery = api.post.getRecentPosts.useQuery();

  if (recentPostsQuery.status === "loading") {
    return <div>Loading...</div>;
  }

  if (recentPostsQuery.status === "error") {
    return <div>Error: {recentPostsQuery.error.message}</div>;
  }

  const postIds = recentPostsQuery.data;

  return (
    <div>
      <h1>Recent Posts</h1>
      {postIds.map((id) => (
        <BlogPreviewCard key={id} postId={id} />
      ))}
    </div>
  );
}

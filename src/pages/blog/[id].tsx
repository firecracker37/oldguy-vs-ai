import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { api } from "~/utils/api";
export default function ArticlePage({ id }: { id: string }) {
  const articleData = api.post.getPostById.useQuery({ id: id });
  return (
    <article>
      {articleData.data?.id && (
        <div>
          <h2>{articleData.data.title}</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {articleData.data.article}
          </ReactMarkdown>
        </div>
      )}
    </article>
  );
}

export function getServerSideProps({ params }: { params: { id: string } }) {
  const { id } = params;

  return {
    props: { id }, // will be passed to the page component as props
  };
}

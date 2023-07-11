import { useSession } from "next-auth/react";
import { getServerAuthSession } from "../../server/auth";
import { type GetServerSideProps } from "next";

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

  return <h1>Page</h1>;
}

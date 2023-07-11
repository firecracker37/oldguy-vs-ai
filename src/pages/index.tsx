import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Header from "~/components/Header";
import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>Old Guy vs AI</title>
        <meta
          name="description"
          content="A personal blog project talking about software engineering, artificial intelligence, and general technology. "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Home Page</h1>
    </>
  );
}

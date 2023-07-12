import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
import Header from "~/components/Header";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-zinc-950 text-gray-200">
        <Header />
        <div className="container">
          <Component {...pageProps} />
        </div>
      </div>
      <Toaster />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

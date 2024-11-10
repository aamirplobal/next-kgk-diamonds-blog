import BlogPost from "@/components/blogPosts";
import Loading from "@/components/loading";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main className="grid auto-rows-min gap-4 md:grid-cols-5">
      <Suspense fallback={<Loading />}>
        <BlogPost />
      </Suspense>
    </main>
  );
}

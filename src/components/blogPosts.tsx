import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import DeletePost from "./delete-post";

export interface BlogPost {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  content?: string;
  imageUrl?: string;
}

export default async function BlogPost() {
  if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    console.error("Backend URL is not defined.");
    return;
  }
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogPosts`, {
    cache: "no-store",
  });
  const posts: BlogPost[] = await data.json();

  return (
    <>
      {posts.map((post) => (
        <Card key={post.id} className="mb-4">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{post.title}</CardTitle>
              <DeletePost id={post.id} />
            </div>
            <CardDescription>{post?.content}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end">
              <img
                src={
                  post?.imageUrl ||
                  "https://cdn.pixabay.com/photo/2024/11/02/05/13/winter-9168141_1280.jpg"
                }
                alt={post.title}
                className="rounded-md border"
                height={0}
                width={0}
                sizes="100vw"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

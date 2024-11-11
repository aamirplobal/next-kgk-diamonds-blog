"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddDialog() {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Post</Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden  md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
          <DialogDescription>Enter Blog Post Details</DialogDescription>
        </DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const router = useRouter();

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      console.error("Backend URL is not defined.");
      return;
    }

    const newPost = {
      title,
      content,
      imageUrl,
      published: true, // Assuming new posts are published by default
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogPosts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      );

      if (response.ok) {
        console.log("Post added successfully");
        router.push("/"); // Redirect to home after adding post
      } else {
        console.error("Failed to add post");
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleAIPostGen = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior for the button

    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      console.error("Backend URL is not defined.");
      return;
    }

    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogPosts/1`,
        {
          cache: "no-store",
        }
      );
      const aipost: { title: string; content: string } = await data.json();

      setContent(aipost?.content);
      setTitle(aipost?.title);
    } catch (error) {
      console.error("Error generating AI post:", error);
    }
  };

  return (
    <form
      onSubmit={handleAddPost}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="blogtitle">Title</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="content">Content</Label>
        <Input
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="imageUrl">Image Url</Label>
        <Input
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <Button type="submit">Add Post</Button>
      <Button type="button" variant="outline" onClick={handleAIPostGen}>
        Generate Auto Post
      </Button>
    </form>
  );
}

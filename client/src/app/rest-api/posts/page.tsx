"use client"
import React, { useEffect } from "react";
import useCallAPIState from "@/hooks/useCallAPIState";
import PostService from "@/services/post";
import { Post } from "@/types/post";
import PostCard from "@/components/postCard";

const PostPage = () => {
  const [apiState, updateApiState] = useCallAPIState<Post[]>({
    data: [],
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        updateApiState("start", []);
        const posts = await PostService.getAllPosts();
        
        updateApiState("success", posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        updateApiState("error");
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {apiState.loading && <p>Loading...</p>}
      {apiState.success && (
        <ul>
          {apiState.data.map((post: Post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </ul>
      )}
      {apiState.error && <p>Error fetching posts.</p>}
    </div>
  );
};

export default PostPage;

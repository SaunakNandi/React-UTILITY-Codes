import { useState } from "react";

interface postDataType {
  count: number;
  like: boolean;
  postId: string;
}

export function LikeButton({ post }: { post: postDataType }) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState(post.count);
  const [liked, setLiked] = useState(post.like);

  async function handleLikes() {
    if (isPending) return;
    const previousLike = liked;
    const previousLikeCount = likeCount;

    setLiked(!previousLike);
    setLikeCount(previousLike ? previousLikeCount - 1 : previousLikeCount + 1);
    setIsPending(true);

    try {
      const res = await fetch(`/api/${post.postId}/likes`, {
        method: "POST",
        body: JSON.stringify({ likescount: previousLikeCount + 1 }),
      });
      if (!res.ok) throw new Error("failed to fetch update like ");
    } catch (error) {
      console.log("error ", error);
      setLiked(previousLike);
      setLikeCount(previousLikeCount);
    } finally {
      setIsPending(false);
    }
  }
  return <button onClick={handleLikes}>👍🏻</button>;
}

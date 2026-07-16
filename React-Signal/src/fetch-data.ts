import { batch, effect, signal } from "@preact/signals-react";
export type PostType = {
  id: string;
  body: string;
  title: string;
};
const api_endpoint = "https://dummyjson.com";

export const postData = signal<PostType[]>([]);
export const hasMore = signal<boolean>(false);
export const isLoading = signal<boolean>(false);
export const skipToken = signal<number>(0);

effect(() => {
  if (!hasMore.value && !isLoading.value && postData.value.length > 0)
    localStorage.setItem("cached_posts", JSON.stringify(postData.value));
});

export const fetchPosts = async () => {
  isLoading.value = true;
  try {
    const res = await fetch(
      `${api_endpoint}/posts?limit=5&skip=${skipToken.value}`,
    );
    const responseData = await res.json();
    batch(() => {
      if (responseData.posts.length + skipToken.value < responseData.total) {
        hasMore.value = true;
        skipToken.value += 5;
      } else hasMore.value = false;
      postData.value = [...postData.value, ...responseData.posts];
      isLoading.value = false;
    });
  } catch (error: any) {
    console.log("error in api. call ", error);
    isLoading.value = false;
  }
};

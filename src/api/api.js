import axios from "axios";

export const fetchPosts = async () => {
  return await axios.get("http://localhost:3000/posts?_sort=id&_order=desc");
};

export const fetchTags = async () => {
  return await axios.get("http://localhost:3000/tags");
};

export const addPost = async (post) => {
  const response = await axios.post("http://localhost:3000/posts", post);
  return response;
};

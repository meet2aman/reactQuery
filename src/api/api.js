import axios from "axios";

export const fetchPosts = async (page) => {
  console.log(page);
  return await axios.get(
    `http://localhost:3000/posts?_sort=-id&${
      page ? `_page=${page}&_per_page=5` : ""
    }`
  );
};

export const fetchTags = async () => {
  return await axios.get("http://localhost:3000/tags");
};

export const addPost = async (post) => {
  const response = await axios.post("http://localhost:3000/posts", post);
  return response;
};

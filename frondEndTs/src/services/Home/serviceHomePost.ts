export const fetchPosts = async (setPosts: any) => {
  try {
    const response = await fetch('http://localhost:3500/posts');
    const data = await response.json();
    console.log(data);
    setPosts(data.posts);
  } catch (error) {
    console.log(error);
  }
};

export const ServiceHomeCreatePost = async (
  posts: any,
  text: string,
  setPosts: any,
  setModalEditPostActive: any,
) => {
  const response = await fetch(`http://localhost:3500/posts/${posts[0]._id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ text }),
  });
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    setPosts((prevPosts: any) => {
      return prevPosts.map((post: any) => {
        if (post._id === posts[0]._id) {
          return {
            ...post,
            text: text || '',
          };
        } else {
          return post;
        }
      });
    });

    setModalEditPostActive(false);
  }
  return response;
};

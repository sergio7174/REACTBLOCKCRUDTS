import { IPost } from '../../interface/IPost';

export const handleDeletePost = async (
  postId: string,
  posts: IPost[],
  post: IPost,
  user: any,
  setPosts: any,
) => {
  const postToEdit = posts.find((post: IPost) => post._id === postId);
  if (user?._id === postToEdit?.user._id) {
    try {
      const response = await fetch(`http://localhost:3500/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== postId));
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    alert('You can only delete posts that you created.');
  }
};

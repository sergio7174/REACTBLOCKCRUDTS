export const handleEditPost = async (
  postId: string,
  posts: any,
  user: any,
  setModalEditPostActive: any,
  setText: any,
) => {
  const postToEdit = posts.find((post: any) => post._id === postId);

  if (user?._id === postToEdit?.user._id) {
    setModalEditPostActive(true);
    setText(postToEdit?.text || '');
  } else {
    alert('You can only edit posts that you created.');
  }
};

import { FetchServiceHeader } from './FetchServiceHeader';

export const serviceHeader = async (title: string, text: string, userId: string | undefined) => {
  /* const response = await fetch(`http://localhost:3500/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      title: title,
      text: text,
      userId,
    }),
  });*/
  const post = FetchServiceHeader(title, text, userId);

  /*if (!response.ok) {
    console.log('Failed to create post');
    return;
  }

  const post = await response.json();

  alert('Post text:' + text);
  alert('Post text:' + response.text);
  alert('Post userId:' + userId);*/
  return post;
};

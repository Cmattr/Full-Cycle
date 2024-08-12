import React, { useState } from 'react';

export interface Comment {
    title: string;
    body: string;
  }
  

const BlogPost: React.FC = () => {
  const [comment, setComment] = useState<Comment>({ title: '', body: '' });
  const [comments, setComments] = useState<Comment[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setComment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComments(prevComments => [...prevComments, comment]);
    setComment({ title: '', body: '' }); // Clear the form
  };

  return (
    <div>
      <h1>Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={comment.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            name="body"
            value={comment.body}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <h2>Post</h2>
      <ul>
        {comments.map((c, index) => (
          <li key={index}>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPost;
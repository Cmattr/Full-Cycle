// BlogPost.test.tsx

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogPost from '../Components/BlogPost';

describe('BlogPost', () => {
  it('renders correctly', () => {
    render(<BlogPost />);
    
    // Check if the component's elements are present in the document
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/body/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit comment/i })).toBeInTheDocument();
  });

  it('handles input changes', () => {
    render(<BlogPost />);
    
    // Get input fields
    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    const bodyInput = screen.getByLabelText(/body/i) as HTMLTextAreaElement;
    
    // Simulate user input
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(bodyInput, { target: { value: 'Test Body' } });
    
    // Check if the input values have been updated
    expect(titleInput.value).toBe('Test Title');
    expect(bodyInput.value).toBe('Test Body');
  });

  it('submits the form and stores comment in localStorage', () => {
    // Clear any previous data from localStorage
    localStorage.clear();
    
    render(<BlogPost />);
    
    // Get input fields and button
    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    const bodyInput = screen.getByLabelText(/body/i) as HTMLTextAreaElement;
    const submitButton = screen.getByRole('button', { name: /submit comment/i });
    
    // Simulate user input
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(bodyInput, { target: { value: 'Test Body' } });
    
    // Simulate form submission
    fireEvent.click(submitButton);
    
    // Check if the comment is stored in localStorage
    const storedComments = localStorage.getItem('comments');
    expect(storedComments).not.toBeNull();
    
    // Parse and check if the stored comment matches the input values
    const commentsArray = storedComments ? JSON.parse(storedComments) : [];
    expect(commentsArray).toHaveLength(1);
    expect(commentsArray[0]).toEqual({ title: 'Test Title', body: 'Test Body' });
  });
});

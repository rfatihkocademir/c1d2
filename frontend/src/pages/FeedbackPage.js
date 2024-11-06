// src/pages/FeedbackPage.js
import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { submitFeedback } from '../api/feedbackApi';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    try {
      await submitFeedback({ feedback });
      alert('Feedback submitted successfully');
      setFeedback('');
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Feedback</h2>
      <InputField label="Your Feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
      <Button label="Submit Feedback" onClick={handleSubmit} />
    </div>
  );
};

export default FeedbackPage;
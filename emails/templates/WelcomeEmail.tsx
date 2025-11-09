import * as React from 'react';

interface WelcomeEmailProps {
  firstName: string;
  email: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  firstName,
  email,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>Thanks for joining us.</p>
    <p>Your email: {email}</p>
  </div>
);
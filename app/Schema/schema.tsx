export const validateName = (name: string) => {
  if (!name.trim()) return "Name is required";
  if (name.length < 2) return "Name must be at least 2 characters";
  if (name.length > 35) return "Name must be less than 35 characters";

  // Only letters, numbers, spaces, and safe symbols: - ' . &
  const safePattern = /^[A-Za-z0-9\s\-'_.&]+$/;
  if (!safePattern.test(name)) return "Name contains invalid characters";

  return null;
};

export const validateEmail = (email: string) => {
  const trimmed = email.trim();

  if (!trimmed) return "Email is required";
  if (trimmed.length > 100) return "Email must be less than 100 characters";

  // Basic RFC 5322-compatible email pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(trimmed)) return "Please enter a valid email address";

  return null;
};

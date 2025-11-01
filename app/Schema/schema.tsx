export const validateName = (name: string) => {
  if (!name.trim()) return "Name is required";
  if (name.length < 2) return "Name must be at least 2 characters";
  if (name.length > 35) return "Name must be less than 35 characters";

  // Only letters, numbers, spaces, and safe symbols: - ' . &
  const safePattern = /^[A-Za-z0-9\s\-'_.&]+$/;
  if (!safePattern.test(name)) return "Name contains invalid characters";

  return null;
};

export const validateName = (name: string) => {
  if (!name.trim()) return "Name is required";
  if (name.length < 2) return "Name must be at least 2 characters";
  if (name.length > 15) return "Name must be less than 15 characters";
  if (!/^[A-Za-z\s]+$/.test(name)) return "Only letters are allowed";
  return null;
};

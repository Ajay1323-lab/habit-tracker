export const getUserEmail = () => {
  const saved = localStorage.getItem("userProfile");
  if (!saved) return null;

  const profile = JSON.parse(saved);
  return profile?.email?.trim() || null;
};

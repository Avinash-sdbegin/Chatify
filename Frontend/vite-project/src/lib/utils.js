export const getProfilePicture = (profilepic, username = "User") => {
  if (profilepic && profilepic.trim() !== "") {
    return profilepic;
  }
  const encodedName = encodeURIComponent(username);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=3b82f6&color=fff&size=200&bold=true`;
};

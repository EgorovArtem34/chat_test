export const setLocalStorageUserData = (userData: string) => {
  localStorage.setItem('userData', userData);
}

export const getLocalStorageUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

export const GET_EMAIL = 'GET_EMAIL';

export const getEmail = (userEmail) => ({
  type: GET_EMAIL,
  userEmail,
});

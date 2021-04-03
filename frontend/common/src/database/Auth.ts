interface UserInfo {
  userLogin: string;
  userId: string;
}
export const getCurrentUserInfo = (): UserInfo => {
  return {
    userLogin: 'wravel@gmail.com',
    userId: 'wr123456',
  };
};

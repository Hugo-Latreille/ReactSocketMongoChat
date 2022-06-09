// export const host = "http://localhost:8888";
// export const host = `http://localhost:${process.env.PORT}`
export const host = `http://localhost`;

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allUsers`;
export const sendMessageRoute = `${host}/api/message/addmsg`;
export const getAllMessagesRoute = `${host}/api/message/getmsg`;

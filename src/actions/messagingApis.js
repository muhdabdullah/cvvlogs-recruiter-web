const config = require("../helpers/config.json");
export const getAllChats = (userId) => {
  var id = localStorage.getItem("auth_id1");
  return fetch(`${process.env.REACT_APP_API_END_POINT}/web/all_chats.php`, {
    method: "GET",
    headers: { "Content-Type": "application/json", auth_id: `${id}` },
  });
};

export const getSpecificChat = (chatId) => {
  var id = localStorage.getItem("auth_id1");
  //${process.env.REACT_APP_API_END_POINT}web/all_messages.php?chat_id=44
  return fetch(
    `${process.env.REACT_APP_API_END_POINT}/web/all_messages.php?chat_id=${chatId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", auth_id: `${id}` },
    }
  );
};

export const sendMessages = (chatId, reciever, message, file) => {
  let formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("reciever", reciever);
  formData.append("message", message);
  formData.append("message_file", file);
  var id = localStorage.getItem("auth_id1");
  return fetch(`${process.env.REACT_APP_API_END_POINT}/web/message_new.php`, {
    method: "POST",
    headers: { Accept: "application/json", auth_id: `${id}` },
    body: formData,
  });
};

export const reportMesage = (chatId) => {
  // const[loader,showLoader,hideLoader]=useFullPageLoader()
  //const { userName, password } = credentials;
  var id = localStorage.getItem("auth_id1");
  return fetch(`${process.env.REACT_APP_API_END_POINT}/web/report.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json", auth_id: `${id}` },
    body: JSON.stringify({
      chat_id: chatId,
    }),
  });
};
export const deleteMessage = (chatId) => {
  // const[loader,showLoader,hideLoader]=useFullPageLoader()
  //const { userName, password } = credentials;
  var id = localStorage.getItem("auth_id1");
  return fetch(`${process.env.REACT_APP_API_END_POINT}/web/delete_chat.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json", auth_id: `${id}` },
    body: JSON.stringify({
      chat_id: chatId,
    }),
  });
};

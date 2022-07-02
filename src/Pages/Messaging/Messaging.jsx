import React, { Component } from "react";
import "./Messaging.css";
import Nav2 from "../../Components/Nav2/Nav2";
import MessageProfile from "../../Assests/messaging/message.png";
import PlusIcon from "../../Assests/messaging/Plus.svg";
import ImageIcon from "../../Assests/messaging/image.svg";
import ReportButton from "../../Assests/messaging/report-button.svg";
import {
  getAllChats,
  getSpecificChat,
  sendMessages,
  reportMesage,
  deleteMessage,
} from "../../actions/messagingApis";
import { useState, useEffect } from "react";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import ReactScrollableFeed from "react-scrollable-feed";
import ScrollToBottom from "react-scroll-to-bottom";
import Modal from "react-modal";
import axios from "axios";

//import { useEffect } from "react";
const ROOT_CSS = {
  height: 600,
  width: 400,
};

Modal.setAppElement("#root");

function Messaging(props) {
  const [allChats, setAllChats] = useState([]);
  const [allMsgs, setallMsgs] = useState([]);
  const [chattId, setChattId] = useState(null);
  const [userrId, setUserrId] = useState(null);
  const [file, setFile] = useState(null);
  const [msgText, setMsgText] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [userName, setUserName] = useState("");
  const [is_block_by_cand, setIs_block_by_cand] = useState(false);
  const [is_block_by_req, setIs_block_by_req] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatLoading2, setChatLoading2] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newMsgNotifier, setNewMsgNotifier] = useState(null);

  useEffect(() => {
    setChatLoading2((prev) => (prev = true));

    let query = props.location.search.split("?");
    console.log("ghghgh", query);
    let user =
      query.length == 3
        ? props.location.search.split("?")[1].split("user=")[1]
        : query.length == 4
        ? props.location.search.split("?")[1].split("user=")[1]
        : undefined;
    let chat =
      query.length == 4
        ? props.location.search.split("?")[2].split("chat=")[1]
        : undefined;
    let nameOfNewUser =
      query.length == 3
        ? props.location.search.split("?")[2].split("f_n_ame=")[1]
        : query.length == 4
        ? props.location.search.split("?")[3].split("f_n_ame=")[1]
        : undefined;

    if (user !== undefined) {
      dispayChat(
        chat,
        user,
        nameOfNewUser.includes("%20")
          ? nameOfNewUser.replace("%20", " ")
          : nameOfNewUser
      );
    }
    setInterval(() => getAllChatMessages(), 3000);
  }, []);

  const getAllChatMessages = async () => {
    await getAllChats()
      .then((res) => res.json())
      .then((response) => {
        setChatLoading2((prev) => (prev = false));
        if (
          JSON.stringify(response.data.all_chats) !== JSON.stringify(allChats)
        ) {
          setAllChats((prev) => (prev = response.data.all_chats));
        }
      })
      .catch((e) => {
        setTimeout(getAllChatMessages, 3000);
      });
  };

  const onChatSelect = (chatId, userrId, username, userImg) => {
    setUserName((prev) => (prev = null));
    setUserrId((prev) => (prev = null));
    setallMsgs((prev) => (prev = []));
    setChattId((prev) => (prev = null));

    singleUserMessage(chatId, userrId, username, userImg);
  };

  const singleUserMessage = async (chatId, userrId, username, userImg) => {
    await getSpecificChat(chatId)
      .then((res) => res.json())
      .then((response) => {
        if (
          JSON.stringify(response.data.all_messages) !== JSON.stringify(allMsgs)
        ) {
          setallMsgs((prev) => (prev = response.data.all_messages));
          setIs_block_by_cand((prev) => (prev = response.data.is_block_by_req));
          setNewMsgNotifier((prev) => (prev = 1));
          setIs_block_by_req((prev) => (prev = response.data.is_block_by_cand));
        } else if (
          JSON.stringify(response.data.all_messages) == JSON.stringify(allMsgs)
        ) {
        }

        setChatLoading((prev) => (prev = false));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const sendMessage = async (e) => {
    if (!file) {
      if (msgText == "" || msgText == null || msgText == undefined) {
        alert("Enter Message please!");
        return;
      }
    }
    await sendMessages(chattId, userrId, msgText, file)
      .then((res) => res.json())
      .then((response) => {
        e.preventDefault();
        document.getElementById("msgbox").value = "";
        setFile((prev) => (prev = ""));
        setMsgText((prev) => (prev = ""));
      })
      .catch((e) => {
        setFile((prev) => (prev = ""));
        setMsgText((prev) => (prev = ""));
        document.getElementById("msgbox").value = "";
        setTimeout(singleUserMessage, 3000);
      });
  };

  const reportMeassage = async () => {
    await reportMesage(chattId)
      .then((res) => res.json())
      .then((response) => {
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deleteMeassage = async () => {
    await deleteMessage(chattId)
      .then((res) => res.json())
      .then((response) => {
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openModal = () => {
    setReportModal((prev) => (prev = true));
  };
  const handleBlock = (isblock) => {
    let endPoint = isblock ? "unblock_chat" : "block_chat";
    axios
      .post(
        `${process.env.REACT_APP_API_END_POINT}/web/${endPoint}.php`,
        {
          chat_id: chattId,
        },
        {
          headers: { auth_id: localStorage.getItem("auth_id1") },
        }
      )
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const openModal2 = () => {
    setDeleteModal((prev) => (prev = true));
  };

  const dispayChat = async (chatId, userrId, username, userImg) => {
    setUserName((prev) => (prev = username));
    setUserrId((prev) => (prev = userrId));
    setChatLoading((prev) => (prev = true));
    setallMsgs((prev) => (prev = []));
    setChattId((prev) => (prev = chatId));

    await setInterval(
      () => singleUserMessage(chattId, userrId, userName, userImg),
      5000
    );
  };
  const sendMessagetoNewUser = async (id, cid) => {
    if (msgText == "" || msgText == null || msgText == undefined) {
      alert("Enter Message please!");
      return;
    }
    let chaId = cid == undefined ? "" : cid;
    await sendMessages(chaId, id, msgText)
      .then((res) => res.json())
      .then((response) => {
        let query = props.location.search.split("?");
        let id =
          query.length == 3
            ? props.location.search.split("?")[1].split("=")[1]
            : query.length == 4
            ? props.location.search.split("?")[1].split("=")[1]
            : undefined;
        let cid =
          query.length == 4
            ? props.location.search.split("?")[2].split("=")[1]
            : undefined;
        let nameOfNewUser =
          query.length == 3
            ? props.location.search.split("?")[2].split("=")[1]
            : query.length == 4
            ? props.location.search.split("?")[3].split("=")[1]
            : undefined;
        document.getElementById("msgbox").value = "";
        setFile((prev) => (prev = ""));
        setMsgText((prev) => (prev = ""));
        window.location = `/messages?user=${id}?chat=${response.data.chat_id}?f_n_ame=${nameOfNewUser}`;
      })
      .catch((e) => {
        setTimeout(sendMessagetoNewUser(id), 3000);
      });
  };

  let query = props.location.search.split("?");
  let id =
    query.length == 3
      ? props.location.search.split("?")[1].split("id=")[1]
      : query.length == 4
      ? props.location.search.split("?")[1].split("id=")[1]
      : query.length == 2
      ? props.location.search.split("?")[1].split("id=")[1]
      : undefined;
  let cid =
    query.length == 4
      ? props.location.search.split("?")[2].split("cid=")[1]
      : undefined;
  let nameOfNewUser =
    query.length == 3
      ? props.location.search.split("?")[2].split("name=")[1]
      : query.length == 4
      ? props.location.search.split("?")[3].split("name=")[1]
      : undefined;
  const helloName = () => {
    allChats.map((data) => {
      return data.user_name;
    });
  };
  return (
    <>
      <Nav2 />
      <div className="container py-5 px-4">
        <h1 className="mb-3 messaging-head-main">Messages</h1>
        {allChats.length > 0 || id !== undefined ? (
          <div className="row rounded-lg overflow-hidden shadow">
            {id == undefined ? (
              <div className="col-3 px-0">
                <div className="bg-white">
                  <div className="px-4 py-2">
                    <div className="inner-addon right-addon">
                      <i className="glyphicon glyphicon-search"></i>
                      <input
                        type="text"
                        onChange={(e) =>
                          setSearchItem((prev) => (prev = e.target.value))
                        }
                        className="form-control"
                        placeholder="Search users"
                        style={{
                          borderRadius: "30px",
                          background: "#F8F8F8",
                        }}
                      />
                    </div>
                  </div>
                  <div className="messages-box">
                    <div className="list-group rounded-0">
                      {allChats.length > 0
                        ? allChats
                            .filter((val) => {
                              if (searchItem == "") {
                                return val;
                              } else if (
                                val.user_name
                                  .toLowerCase()
                                  .includes(searchItem.toLowerCase())
                              ) {
                                return val;
                              }
                            })
                            .map((chat, index) => (
                              <>
                                <button
                                  onClick={() =>
                                    dispayChat(
                                      chat.chat_id,
                                      chat.user_id,
                                      chat.user_name,
                                      chat.user_img,
                                      chat.is_client_disabled
                                    )
                                  }
                                  className="list-group-item list-group-item-action text-white rounded-0"
                                >
                                  <div className="media">
                                    {!chat.is_client_disabled ? (
                                      <img
                                        src={chat.user_img}
                                        alt="user"
                                        width="50px"
                                        height="50px"
                                        className="rounded-circle d-lg-block d-md-block d-none"
                                      />
                                    ) : (
                                      <i
                                        className="far fa-user fa-3x"
                                        style={{ color: "lightgray" }}
                                      ></i>
                                    )}

                                    <div
                                      className="media-body ml-lg-2 ml-md-2 ml-4 pl-3 d-lg-block d-md-block d-none"
                                      style={{
                                        width: "fit-content !important",
                                      }}
                                    >
                                      <div className="d-flex align-items-center justify-content-between mb-1">
                                        <h6 className="mb-0 user-namecoloe-blue">
                                          {!chat.is_client_disabled
                                            ? chat.user_name
                                            : "Account Disable"}
                                        </h6>
                                      </div>
                                      <p className="mb-0 text-small skill-color-messaing">
                                        {!chat.is_client_disabled
                                          ? chat.last_message
                                            ? chat.last_message.length < 10
                                              ? chat.last_message
                                              : chat.last_message.slice(0, 10) +
                                                "..."
                                            : ""
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              </>
                            ))
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {id == undefined ? (
              <div className="col-9 px-0 pb-3">
                <div className="px-4 py-2" style={{ background: "#F8F8F8" }}>
                  <div className="row">
                    <div className="col-lg-11 col-md-10 col-9">
                      <h6 className="m-0 p-0 user-namecoloe-blue">
                        {id !== undefined
                          ? nameOfNewUser && nameOfNewUser.includes("%20")
                            ? nameOfNewUser.replace("%20", " ")
                            : nameOfNewUser
                          : userName}
                      </h6>
                    </div>
                    <div className="col-lg-1 col-md-2 col-3">
                      {id !== undefined ||
                      (userName !== "" &&
                        userName !== null &&
                        (userName !== "") !== undefined) ? (
                        <>
                          <img
                            src={ReportButton}
                            alt=""
                            type="button"
                            className="btn dropdown-toggle pl-4 pt-1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          />
                          <ul className="dropdown-menu border-0 text-center trans">
                            <li
                              onClick={() => openModal()}
                              style={{
                                fontSize: "15px",
                                color: "#707070",
                                cursor: "pointer",
                              }}
                            >
                              Report
                            </li>
                            <li
                              onClick={() => handleBlock(is_block_by_req)}
                              style={{
                                fontSize: "15px",
                                color: "#707070",
                                cursor: "pointer",
                              }}
                            >
                              {is_block_by_req ? "Unblock" : "Block"}
                            </li>
                            <li
                              onClick={() => openModal2()}
                              className="pt-2"
                              style={{
                                fontSize: "15px",
                                color: "red",
                                cursor: "pointer",
                              }}
                            >
                              Delete
                            </li>
                          </ul>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className=" py-5 bg-white"
                  style={{ height: "603px", overflowY: "hidden" }}
                >
                  <ReactScrollableFeed>
                    {allMsgs.length > 0 ? (
                      allMsgs.map((msg) => (
                        <>
                          {msg.sent_or_recvd == 1 ? (
                            <div className="media w-50 ml-auto mb-3">
                              <div className="media-body mainmain">
                                <div className="message-text-user-color rounded py-2 px-3 mb-2">
                                  {msg.file_type ? (
                                    <a
                                      className="text-small mb-0 text-white"
                                      href={msg.file_url}
                                      target="__blank"
                                    >
                                      {msg.file_url.split("/").at(-1)}{" "}
                                      <i className="fas fa-file-pdf"></i>
                                    </a>
                                  ) : null}
                                  {msg.message !== "null" ? (
                                    <p
                                      className="text-small mb-0 text-white"
                                      style={{ overflowWrap: "anywhere" }}
                                    >
                                      {msg.message}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="media w-50 mb-3">
                              <div className="media-body ml-3">
                                <div className="message-sender-user-color rounded py-2 px-3 mb-2">
                                  {msg.file_type ? (
                                    <a
                                      className="text-small mb-0 text-white"
                                      href={msg.file_url}
                                      target="__blank"
                                    >
                                      {msg.file_url.split("/").at(-1)}{" "}
                                      <i className="fas fa-file-pdf"></i>
                                    </a>
                                  ) : null}
                                  {msg.message !== "null" ? (
                                    <p
                                      className="text-small mb-0 text-white"
                                      style={{ overflowWrap: "anywhere" }}
                                    >
                                      {msg.message}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      ))
                    ) : (
                      <div className="text-center mt-5 pt-5">
                        <p className="text-muted mt-5 pt-5">
                          Tap to access messages!
                        </p>
                      </div>
                    )}
                  </ReactScrollableFeed>
                </div>

                {id !== undefined ? (
                  <div className="ml-4 mt-2">
                    <div className="row">
                      <div className="col-lg-11 col-md-10 col-9">
                        <input
                          type="text"
                          id="msgbox"
                          onChange={(e) =>
                            setMsgText((prev) => (prev = e.target.value))
                          }
                          className="form-control"
                          placeholder="Type your message here......"
                          style={{
                            borderRadius: "30px",
                            background: "#F8F8F8",
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              console.log("enterrrr");
                            }
                          }}
                        />
                      </div>
                      <div
                        className="col-lg-1 col-md-2 col-3 pl-0 pt-1"
                        style={{ cursor: "pointer" }}
                      >
                        <i
                          className="fas fa-paper-plane border p-2 text-primary"
                          style={{ borderRadius: "50%" }}
                          onClick={() => sendMessagetoNewUser(id, cid)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="ml-4 mt-2">
                    {file ? (
                      <p className="text-small mb-0" target="__blank">
                        {file.name} <i className="fas fa-file-pdf"></i>
                      </p>
                    ) : null}
                    {!is_block_by_cand && !is_block_by_req ? (
                      <div className="row">
                        <div className="col-10">
                          {chattId !== null && chattId !== undefined ? (
                            <div className="row">
                              <div className="col-11 p-0">
                                <input
                                  type="text"
                                  id="msgbox"
                                  onChange={(e) =>
                                    setMsgText(
                                      (prev) => (prev = e.target.value)
                                    )
                                  }
                                  className="form-control"
                                  placeholder="Type your message here......"
                                  style={{
                                    borderRadius: "30px",
                                    background: "#F8F8F8",
                                  }}
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      sendMessage();
                                    }
                                  }}
                                />
                              </div>
                              <div className="col-1 p-0">
                                <div className="image-upload">
                                  <label for="file-input">
                                    <i
                                      className="fas fa-file-upload border p-2 text-primary"
                                      style={{ borderRadius: "50%" }}
                                    ></i>
                                  </label>
                                  <input
                                    id="file-input"
                                    type="file"
                                    accept="application/pdf"
                                    multiple={false}
                                    onChange={(e) => {
                                      setFile(
                                        (prev) => (prev = e.target.files[0])
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div
                          className="col-2 pl-0 pt-1"
                          style={{ cursor: "pointer" }}
                        >
                          {allMsgs.length > 0 ? (
                            <i
                              className="fas fa-paper-plane border p-2 text-primary"
                              style={{ borderRadius: "50%" }}
                              onClick={() => sendMessage()}
                            ></i>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ) : is_block_by_cand ? (
                      "You are block by this user, you will send or receive messages once the user unblock you."
                    ) : (
                      "You have block this candidate, Please unblock to send or receive messages."
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="col-12 px-0 pb-3">
                <div className="px-4 py-2" style={{ background: "#F8F8F8" }}>
                  <div className="row">
                    <div className="col-md-11">
                      <h6 className="m-0 p-0 user-namecoloe-blue">
                        {id !== undefined
                          ? nameOfNewUser && nameOfNewUser.includes("%20")
                            ? nameOfNewUser.replace("%20", " ")
                            : nameOfNewUser
                          : userName}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-5 chat-box bg-white">
                  {allMsgs.length > 0
                    ? allMsgs.map((msg) => (
                        <>
                          {msg.sent_or_recvd == 1 ? (
                            <div className="media w-50 ml-auto mb-3">
                              <div className="media-body mainmain">
                                <div className="message-text-user-color rounded py-2 px-3 mb-2">
                                  <p
                                    className="text-small mb-0 text-white"
                                    style={{ overflowWrap: "break-word" }}
                                  >
                                    {msg.message}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="media w-50 mb-3">
                              <div className="media-body ml-3">
                                <div className="message-sender-user-color rounded py-2 px-3 mb-2">
                                  <p
                                    className="text-small mb-0 text-muted tezt-coodkn"
                                    style={{ overflowWrap: "break-word" }}
                                  >
                                    {msg.message}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      ))
                    : ""}
                </div>
                {id !== undefined ? (
                  <div className="ml-4 mt-2">
                    <div className="row">
                      <div className="col-lg-11 col-md-10 col-9">
                        <input
                          type="text"
                          id="msgbox"
                          onChange={(e) =>
                            setMsgText((prev) => (prev = e.target.value))
                          }
                          className="form-control"
                          placeholder="Type your message here......"
                          style={{
                            borderRadius: "30px",
                            background: "#F8F8F8",
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              sendMessagetoNewUser(id, cid);
                            }
                          }}
                        />
                      </div>
                      <div
                        className="col-lg-1 col-md-2 col-3 pl-0 pt-1"
                        style={{ cursor: "pointer" }}
                      >
                        <i
                          className="fas fa-paper-plane border p-2 text-primary"
                          style={{ borderRadius: "50%" }}
                          onClick={() => sendMessagetoNewUser(id, cid)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="ml-4 mt-2">
                    <div className="row">
                      <div className="col-lg-11 col-md-10 col-9">
                        {chattId !== null && chattId !== undefined ? (
                          <input
                            type="text"
                            id="msgbox"
                            onChange={(e) =>
                              setMsgText((prev) => (prev = e.target.value))
                            }
                            className="form-control"
                            placeholder="Type your message here......"
                            style={{
                              borderRadius: "30px",
                              background: "#F8F8F8",
                            }}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                console.log("enterrrr");
                                sendMessage();
                              }
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className="col-lg-1 col-md-2 col-3 pl-0 pt-1"
                        style={{ cursor: "pointer" }}
                      >
                        <i
                          className="fas fa-paper-plane border p-2 text-primary"
                          style={{ borderRadius: "50%" }}
                          onClick={() => sendMessage()}
                        ></i>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <h5>Messages will appear here!</h5>
        )}
        {chatLoading2 ? <FullPageLoader /> : null}
        {chatLoading ? <FullPageLoader /> : null}
      </div>
      <Modal
        isOpen={reportModal}
        onRequestClose={() => setReportModal((prev) => (prev = false))}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
          },
          content: {
            position: "absolute",
            margin: "0 auto",
            width: "450px",
            height: "200px",
            top: "50%",
            left: "0",
            right: "0",
            bottom: "40px",
            border: "1px solid #ccc",
            background: "#fff",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
            boxShadow: "0 0 5px 5px #f2f2f2",
            borderRadius: "20px",
            background: "#fff",
            border: "1px solid #fff",
          },
        }}
      >
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-danger text-center pt-2">Confirmation</h2>
          </div>
          <div className="col-md-12">
            <p className=" text-center pt-2">
              Do you want to report {userName}?
            </p>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-2">
                <a href="#">
                  <h5
                    className="text-danger text-center"
                    onClick={() => reportMeassage()}
                  >
                    Yes
                  </h5>
                </a>
              </div>
              <div className="col-md-2">
                <a href="#" className="text-dark">
                  {" "}
                  <h5
                    className="text-center"
                    onClick={() => setReportModal((prev) => (prev) => false)}
                  >
                    No
                  </h5>
                </a>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={deleteModal}
        onRequestClose={() => setDeleteModal((prev) => (prev = false))}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
          },
          content: {
            position: "absolute",
            margin: "0 auto",
            width: "450px",
            height: "200px",
            top: "50%",
            left: "0",
            right: "0",
            bottom: "40px",
            border: "1px solid #ccc",
            background: "#fff",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
            boxShadow: "0 0 5px 5px #f2f2f2",
            borderRadius: "20px",
            background: "#fff",
            border: "1px solid #fff",
          },
        }}
      >
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-danger text-center pt-2">Confirmation</h2>
          </div>
          <div className="col-md-12">
            <p className=" text-center pt-2">
              Do you want to delete chat with {userName}?
            </p>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-2">
                <a href="#">
                  <h5
                    className="text-danger text-center"
                    onClick={() => deleteMeassage()}
                  >
                    Yes
                  </h5>
                </a>
              </div>
              <div className="col-md-2">
                <a href="#" className="text-dark">
                  {" "}
                  <h5
                    className="text-center"
                    onClick={() => setDeleteModal((prev) => (prev = false))}
                  >
                    No
                  </h5>
                </a>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Messaging;

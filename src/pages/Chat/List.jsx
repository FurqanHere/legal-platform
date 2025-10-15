import React, { useState } from "react";
import circle from "../../assets/images/yellow-circle.png";
import notificationProfile from "../../assets/images/notification-profile.png";

const List = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");

  // Sample contacts data
  const contacts = [
    {
      id: 1,
      name: "Oliva Lyons",
      lastMessage: "I will share today all documents.",
      time: "04:52 PM",
      unread: 0,
      avatar: notificationProfile,
    },
    {
      id: 2,
      name: "Jackline Dim",
      lastMessage: "Lorem ipsum dolor sit amet consec.",
      time: "04:52 PM",
      unread: 3,
      avatar: notificationProfile,
    },
    {
      id: 3,
      name: "Maxwell Clarck",
      lastMessage: "Ok thanks bro.",
      time: "04:52 PM",
      unread: 3,
      avatar: notificationProfile,
    },
    {
      id: 4,
      name: "Sarah Johnson",
      lastMessage: "The contract review is complete. Please check your email.",
      time: "01:45 PM",
      unread: 1,
      avatar: notificationProfile,
    },
    {
      id: 5,
      name: "Michael Chen",
      lastMessage: "I've prepared the legal brief for tomorrow's meeting.",
      time: "12:20 PM",
      unread: 0,
      avatar: notificationProfile,
    },
    {
      id: 6,
      name: "Emily Rodriguez",
      lastMessage: "The court documents have been filed successfully.",
      time: "11:30 AM",
      unread: 2,
      avatar: notificationProfile,
    },
    {
      id: 7,
      name: "David Thompson",
      lastMessage: "We need to discuss the settlement terms.",
      time: "10:15 AM",
      unread: 0,
      avatar: notificationProfile,
    },
    {
      id: 8,
      name: "Lisa Anderson",
      lastMessage: "The property transfer documents are ready for signature.",
      time: "09:45 AM",
      unread: 1,
      avatar: notificationProfile,
    },
    {
      id: 9,
      name: "Robert Wilson",
      lastMessage: "I'll send you the updated case files by this afternoon.",
      time: "09:00 AM",
      unread: 0,
      avatar: notificationProfile,
    },
  ];

  // Sample messages for the selected contact
  const messages = [
    {
      id: 1,
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo.",
      time: "02:14 PM",
      isFromUser: false,
    },
    {
      id: 2,
      text: "accusantium doloremque laudantium, totam.",
      time: "02:14 PM",
      isFromUser: false,
    },
    {
      id: 3,
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo.",
      time: "02:14 PM",
      isFromUser: true,
    },
    {
      id: 4,
      text: "accusantium doloremque laudantium, totam.",
      time: "02:14 PM",
      isFromUser: true,
    },
  ];

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex flex-column flex-column-fluid chat-list-main-container chat-page">
      <div id="kt_app_content" className="app-content flex-column-fluid pb-0">
        <div
          id="kt_app_content_container"
          className="app-container container-xxl h-100 px-0"
        >
          <div className="row h-100 g-0">
            <div className="col-lg-4 col-md-5">
              <div className="d-flex flex-column h-100 chat-list-left-panel">
                {/* Search Bar */}
                <div className="p-4">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control form-control-lg rounded-pill chat-list-search-input"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-gray-600"></i>
                  </div>
                </div>

                {/* Contact List */}
                <div className="flex-fill overflow-auto">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-3 mb-3 cursor-pointer chat-list-contact-item bg-white ${
                        selectedContact?.id === contact.id
                          ? "shadow"
                          : ""
                      }`}
                      onClick={() => handleContactSelect(contact)}
                    >
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-40px me-3">
                          <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="rounded-circle chat-list-avatar"
                          />
                        </div>
                        <div className="flex-fill">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <h6 className="mb-0 fw-bold text-dark">
                              {contact.name}
                            </h6>
                            <span className="text-muted fs-7">
                              {contact.time}
                            </span>
                          </div>
                          <p className="text-muted mb-0 fs-7 text-truncate">
                            {contact.lastMessage}
                          </p>
                        </div>
                        {contact.unread > 0 && (
                          <div className="ms-2">
                            <span
                              className={`badge rounded-pill ${
                                contact.unread === 3
                                  ? "bg-success"
                                  : "bg-danger"
                              } text-white`}
                            >
                              {contact.unread}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-7 d-flex flex-column" style={{ height: "87.9vh", backgroundColor: "#f8f9fa" }}>
              {selectedContact ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-4 bg-white chat-list-conversation-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-40px me-3">
                          <img
                            src={selectedContact.avatar}
                            alt={selectedContact.name}
                            className="rounded-circle chat-list-avatar"
                          />
                        </div>
                        <div>
                          <h6 className="mb-0 fw-bold text-dark">
                            {selectedContact.name}
                          </h6>
                          <small className="text-muted">
                            maxwell@clarcklawyer.com
                          </small>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm">
                          <i className="bi bi-search"></i>
                        </button>
                        <button className="btn btn-sm">
                          <i className="bi bi-three-dots-vertical"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-fill p-4 overflow-auto chat-list-messages-area">
                    <div className="d-flex flex-column gap-3">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`d-flex ${
                            message.isFromUser
                              ? "justify-content-end"
                              : "justify-content-start"
                          }`}
                        >
                          <div
                            className={`d-flex align-items-end ${
                              message.isFromUser ? "flex-row-reverse" : ""
                            }`}
                          >
                            <div className="symbol symbol-30px mx-3">
                              <div className="symbol-label text-white rounded-circle">
                                <img
                                  src={circle}
                                  alt="avatar"
                                  className="rounded-circle w-30px h-30px"
                                />
                              </div>
                            </div>
                            <div
                              className={`p-3 rounded-4 chat-list-message-bubble ${
                                message.isFromUser
                                  ? "bg-dark text-white chat-list-message-bubble-user"
                                  : "bg-white text-dark chat-list-message-bubble-sender"
                              }`}
                            >
                              <p className="mb-0">{message.text}</p>
                              <small
                                className={`${
                                  message.isFromUser
                                    ? "text-white-50"
                                    : "text-muted"
                                }`}
                              >
                                {message.time}
                              </small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-top bg-white shadow rounded-3 mb-5 mx-5">
                    <div className="d-flex align-items-center gap-3">
                      <div className="flex-fill">
                        <input
                          type="text"
                          className="form-control form-control-lg rounded-pill"
                          placeholder="Write a Messages..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleSendMessage()
                          }
                        />
                      </div>
                      <button className="btn btn-sm">
                        <i className="bi bi-paperclip"></i>
                      </button>
                      <button
                        className="btn btn-dark rounded-circle d-flex justify-content-center align-items-center chat-list-send-button"
                        onClick={handleSendMessage}
                      >
                        <i className="bi bi-send-fill text-white"></i>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="d-flex align-items-center justify-content-center h-100">
                  <div className="text-center">
                    <i className="bi bi-chat-dots text-muted chat-list-empty-state-icon"></i>
                    <h5 className="text-muted mt-3">
                      Select a conversation to start chatting
                    </h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

// AluminiUi.js
import React, { useState, useEffect } from 'react';
import { FaRegThumbsUp, FaComment } from 'react-icons/fa';
import "/Users/karthikgurram/hacktoberfestHackerthon/HTF24-Team-037/client/src/pages/styles/Dashboad.css";

const AluminiUi = () => {
  const [email, setEmail] = useState("user@example.com");
  const [userName, setUserName] = useState("User Name");
  const [rollNo, setRollNo] = useState("23071A7251");
  const [yearOfPassing, setYearOfPassing] = useState(2020);
  const [position, setPosition] = useState("Your Position");
  const [bio, setBio] = useState("Your Bio");
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState("Home");
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [comment, setComment] = useState("");

  const currentUser = {
    name: userName,
    photo: "https://via.placeholder.com/40",
  };

  const randomProfileImages = [
    "https://via.placeholder.com/40",
    "https://placekitten.com/40/40",
    "https://placebear.com/40/40",
    "https://picsum.photos/40/40"
  ];

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=10")
      .then(response => response.json())
      .then(data => setPosts(data.map((post, index) => ({
        ...post,
        userPhoto: randomProfileImages[index % randomProfileImages.length]
      }))));

    setEvents(Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Event ${i + 1}`, date: `2024-12-${i + 1}` })));
    setNotifications(Array.from({ length: 10 }, (_, i) => ({ id: i + 1, message: `Notification ${i + 1}`, time: `10:${i + 1} AM` })));
  }, []);

  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleSave = () => setIsEditing(false);
  const handleFileChange = (event) => setSelectedFile(event.target.files[0]);
  const handlePostCreation = () => {
    alert(`Post created with file: ${selectedFile ? selectedFile.name : 'No file selected'}`);
    setSelectedFile(null);
  };
  const handleCommentSubmit = (postId) => {
    alert(`Comment on Post ${postId}: ${comment}`);
    setComment("");
  };

  const menuItems = [
    { name: "Home", icon: "house", action: () => setCurrentPage("Home") },
    { name: "Events", icon: "calendar", action: () => setCurrentPage("Events") },
    { name: "Notifications", icon: "bell", action: () => setCurrentPage("Notifications") },
    { name: "Create", icon: "plus-circle", action: () => setCurrentPage("Create") },
  ];

  return (
    <div className="main d-flex flex-row">
      <div className="sidebar text-white p-3 d-flex flex-column justify-content-between gradient-background" style={{ width: '20vw', height: '100vh' }}>
        <div>
          <h5 className="text-center mb-4">Menu</h5>
          {menuItems.map((item, index) => (
            <div key={index} className="menu-item d-flex align-items-center mb-3 p-2 rounded" onClick={item.action}>
              <i className={`bi bi-${item.icon}`}></i>
              <h6 className="ms-2">{item.name}</h6>
            </div>
          ))}
        </div>
        <div className="profile-sidebar-box bg-gradient p-3 rounded mt-4 text-center">
          <img src="https://via.placeholder.com/80" alt="User" className="rounded-circle mb-2" />
          <h6>{userName}</h6>
          <p>Roll No: {rollNo}</p>
          <button className="btn btn-sm btn-light mt-2" onClick={() => { setCurrentPage("Profile"); setIsEditing(false); }}>
            <i className="bi bi-pencil"></i> Edit Profile
          </button>
        </div>
      </div>

      <div className="content p-4">
        {currentPage === "Home" && (
          <div className="home-page">
            <h2>Posts</h2>
            <div className="posts-container">
              {posts.map(post => (
                <div key={post.id} className="post-card">
                  <div className="card-header d-flex align-items-center">
                    <img src={post.userPhoto} alt="User" className="user-photo" />
                    <h6 className="ms-2">{currentUser.name}</h6>
                  </div>
                  <div className="card-body">
                    <img src={post.url} alt={post.title} className="post-image" />
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button className="btn btn-light d-flex align-items-center">
                      <FaRegThumbsUp className="me-1" /> Like
                    </button>
                    <form className="comment-form" onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(post.id); }}>
                      <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} className="comment-input" />
                      <button type="submit" className="btn btn-primary d-flex align-items-center">
                        <FaComment className="me-1" /> Comment
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {currentPage === "Events" && (
          <div>
            <h2>Upcoming Events</h2>
            <div className="events-container">
              {events.map(event => (
                <div key={event.id} className="event-item">
                  <h6>{event.name}</h6>
                  <p>Date: {event.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {currentPage === "Notifications" && (
          <div>
            <h2>Notifications</h2>
            <div className="notifications-container">
              {notifications.map((notification, index) => (
                <div key={notification.id} className="notification-item">
                  <p>{notification.message}</p>
                  <small>{notification.time}</small>
                </div>
              ))}
            </div>
          </div>
        )}
        {currentPage === "Create" && (
          <div className="create-page">
            <h2>Create a Post</h2>
            <textarea className="form-control" rows="3" placeholder="Write your post..."></textarea>
            <input type="file" className="form-control mt-2" onChange={handleFileChange} />
            <button className="btn btn-success mt-3" onClick={handlePostCreation}>Post</button>
          </div>
        )}
        {currentPage === "Profile" && (
          <div className="profile-edit">
            <h2>Edit Profile</h2>
            <div className="mb-3">
              <label>Email:</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label>Username:</label>
              <input type="text" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label>Roll No:</label>
              <input type="text" className="form-control" value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
            </div>
            <div className="mb-3">
              <label>Year of Passing:</label>
              <input type="number" className="form-control" value={yearOfPassing} onChange={(e) => setYearOfPassing(e.target.value)} />
            </div>
            <div className="mb-3">
              <label>Position:</label>
              <input type="text" className="form-control" value={position} onChange={(e) => setPosition(e.target.value)} />
            </div>
            <div className="mb-3">
              <label>Bio:</label>
              <textarea className="form-control" value={bio} onChange={(e) => setBio(e.target.value)} rows="3"></textarea>
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AluminiUi;

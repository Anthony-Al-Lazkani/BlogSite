import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const friendsString = localStorage.getItem('friends');
    const friends = JSON.parse(friendsString);
    const navigate = useNavigate();

    const onClose = () => {
        navigate('/');
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Profile Information</h2>
                <p><strong>Username:</strong> {username || 'N/A'}</p>
                <p><strong>Email:</strong> {email || 'N/A'}</p>
                <p><strong>Friends:</strong></p>
                {friends && friends.length > 0 ? (
                    <ul>
                        {friends.map((friend, index) => (
                            <li key={index}>{friend.username}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No friends available</p>
                )}
            </div>
        </div>
    );
}

export default Profile;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';

function Profile() {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const friendsString = localStorage.getItem('friends');
    const [friends, setFriends] = React.useState(JSON.parse(friendsString) || []);
    const navigate = useNavigate();

    const onClose = () => {
        navigate('/');
    };

    const handleRemoveFriend = async(friendId) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error('No token found. User not authenticated.');
                return;
            }
                await axios.post(
                    `http://localhost:4000/api/articles/${friendId}/removeFriend`,
                    {}, // Ensure this object contains necessary data if required by your API
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log('Friend removed sent successfully.');
            } 
        
         catch (error) {
            console.error('Error sending/canceling friend request:', error);
            // Handle error here
        }
        // Filter out the friend from the state
        const updatedFriends = friends.filter(friend => friend.id !== friendId);
        // Update state and local storage
        setFriends(updatedFriends);
        localStorage.setItem('friends', JSON.stringify(updatedFriends));
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
                            <li key={index}>
                                {friend.username}
                                <button onClick={() => handleRemoveFriend(friend.id)}>Remove</button>
                            </li>
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
import React, { useState, useEffect } from 'react';
import './Notification.css';
import axios from 'axios';

function Notifications() {
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        const pendingFriends = localStorage.getItem('friendsRequest');
        setFriendRequests(pendingFriends ? pendingFriends.split(',') : []);
    }, []);

    const handleAcceptRequest = async (friend) => {
        console.log(friend)
        try {
            const token = localStorage.getItem('authToken'); // Retrieve token from localStorage or wherever it's stored
            if (!token) {
                console.error('No token found. User not authenticated.');
                return;
            }
    
            const response = await axios.post(
                `http://localhost:4000/api/articles/${friend}/acceptFriend`,
                {}, // Empty object or any data you need to send
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized. Please log in to add a friend.');
                // Handle unauthorized error (e.g., redirect to login page)
            } else {
                console.error('Error adding friend:', error);
            }
        }
    };    

    const handleDeclineRequest = async (requestId) => {
        // Handle declining the friend request
    };

    return (
        <div className="notifications">
            <h3>Friend Requests</h3>
            {friendRequests.length > 0 ? (
                friendRequests.map((friend, index) => (
                    <div key={index} className="notification-item">
                        <p>{friend}</p>
                        <button onClick={() => handleAcceptRequest(friend)}>Accept</button>
                        <button onClick={() => handleDeclineRequest(friend)}>Decline</button>
                    </div>
                ))
            ) : (
                <p>No friend requests</p>
            )}
        </div>
    );
}

export default Notifications;

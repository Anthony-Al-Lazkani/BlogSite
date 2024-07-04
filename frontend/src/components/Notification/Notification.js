import React, { useState, useEffect } from 'react';
import './Notification.css';
import axios from 'axios';

function Notifications() {
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        const pendingFriendsString = localStorage.getItem('friendsRequest');
        const pendingFriends = JSON.parse(pendingFriendsString);
        setFriendRequests(pendingFriends ? pendingFriends : []);
    }, []);

    const handleAcceptRequest = async (friend) => {
        console.log(friend);
        try {
            const token = localStorage.getItem('authToken'); // Retrieve token from localStorage or wherever it's stored
            if (!token) {
                console.error('No token found. User not authenticated.');
                return;
            }

            await axios.post(
                `http://localhost:4000/api/articles/${friend.id}/acceptFriend`,
                {}, // Empty object or any data you need to send
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Update the friends array in local storage
            const friendsString = localStorage.getItem('friends');
            const friends = JSON.parse(friendsString) || [];
            const updatedFriends = [...friends, { username: friend.username, id: friend.id }];
            localStorage.setItem('friends', JSON.stringify(updatedFriends));

            // Update the state to remove the accepted friend request
            const updatedRequests = friendRequests.filter(request => request.id !== friend.id);
            setFriendRequests(updatedRequests);
            localStorage.setItem('friendsRequest', JSON.stringify(updatedRequests));
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized. Please log in to add a friend.');
                // Handle unauthorized error (e.g., redirect to login page)
            } else {
                console.error('Error adding friend:', error);
            }
        }
    };

    const handleDeclineRequest = async (friend) => {
        // Handle declining the friend request
        console.log(friend);
        try {
            const token = localStorage.getItem('authToken'); // Retrieve token from localStorage or wherever it's stored
            if (!token) {
                console.error('No token found. User not authenticated.');
                return;
            }

            await axios.post(
                `http://localhost:4000/api/articles/${friend.id}/rejectFriend`,
                {}, // Empty object or any data you need to send
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Update the state to remove the declined friend request
            const updatedRequests = friendRequests.filter(request => request.id !== friend.id);
            setFriendRequests(updatedRequests);
            localStorage.setItem('friendsRequest', JSON.stringify(updatedRequests));
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized. Please log in to add a friend.');
                // Handle unauthorized error (e.g., redirect to login page)
            } else {
                console.error('Error adding friend:', error);
            }
        }
        // Optionally, you can also send a request to the server to decline the friend request
    };

    return (
        <div className="notifications">
            <h3>Friend Requests</h3>
            {friendRequests.length > 0 ? (
                friendRequests.map((friend, index) => (
                    <div key={index} className="notification-item">
                        <p>{friend.username}</p>
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

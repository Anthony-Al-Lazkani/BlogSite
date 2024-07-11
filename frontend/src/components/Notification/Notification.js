import React, { useState, useEffect } from 'react';
import './Notification.css';
import axios from 'axios';

function Notifications({ onNotificationCount }) {
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        const pendingFriendsString = localStorage.getItem('friendsRequest');
        const pendingFriends = JSON.parse(pendingFriendsString);
        setFriendRequests(pendingFriends ? pendingFriends : []);
        onNotificationCount(pendingFriends ? pendingFriends.length : 0);
    }, [onNotificationCount]);

    const handleAcceptRequest = async (friend) => {
        console.log(friend);
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error('No token found. User not authenticated.');
                return;
            }

            await axios.post(
                `http://localhost:4000/api/articles/${friend.id}/acceptFriend`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const friendsString = localStorage.getItem('friends');
            const friends = JSON.parse(friendsString) || [];
            const updatedFriends = [...friends, { username: friend.username, id: friend.id }];
            localStorage.setItem('friends', JSON.stringify(updatedFriends));

            const updatedRequests = friendRequests.filter(request => request.id !== friend.id);
            setFriendRequests(updatedRequests);
            localStorage.setItem('friendsRequest', JSON.stringify(updatedRequests));
            onNotificationCount(updatedRequests.length);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized. Please log in to add a friend.');
            } else {
                console.error('Error adding friend:', error);
            }
        }
    };

    const handleDeclineRequest = async (friend) => {
        console.log(friend);
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error('No token found. User not authenticated.');
                return;
            }

            await axios.post(
                `http://localhost:4000/api/articles/${friend.id}/rejectFriend`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const updatedRequests = friendRequests.filter(request => request.id !== friend.id);
            setFriendRequests(updatedRequests);
            localStorage.setItem('friendsRequest', JSON.stringify(updatedRequests));
            onNotificationCount(updatedRequests.length);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized. Please log in to add a friend.');
            } else {
                console.error('Error adding friend:', error);
            }
        }
    };

    return (
        <div className="notifications">
            <h3>Pending Requests</h3>
            {friendRequests.length > 0 ? (
                friendRequests.map((friend, index) => (
                    <div key={index} className="notification-item">
                        <p>{friend.username}</p>
                        <div className="AcceptRejectButon">
                            <button onClick={() => handleAcceptRequest(friend)} className='AcceptButton'>Accept</button>
                            <button onClick={() => handleDeclineRequest(friend)} className='RejectButton'>Decline</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No friend requests</p>
            )}
        </div>
    );
}

export default Notifications;

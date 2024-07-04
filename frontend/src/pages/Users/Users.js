import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [requestSent, setRequestSent] = useState({});
    const friendsString = localStorage.getItem('friends');
    const friends = JSON.parse(friendsString) || [];
    const currentUser = localStorage.getItem('username');

    useEffect(() => {
        // Load requestSent state from localStorage
        const savedRequestSent = localStorage.getItem('requestSent');
        if (savedRequestSent) {
            setRequestSent(JSON.parse(savedRequestSent));
        }

        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/articles/getAllusers');
                setUsers(response.data);
                // Initialize requestSent state with false for each user if not already in localStorage
                if (!savedRequestSent) {
                    const initialRequestSentState = {};
                    response.data.forEach(user => {
                        initialRequestSentState[user._id] = false;
                    });
                    setRequestSent(initialRequestSentState);
                    localStorage.setItem('requestSent', JSON.stringify(initialRequestSentState));
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleAddFriend = async (userId) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error('No token found. User not authenticated.');
                return;
            }
    
            if (!requestSent[userId]) {
                // Send friend request with necessary data if required by API
                await axios.post(
                    `http://localhost:4000/api/articles/${userId}/addFriend`,
                    {}, // Ensure this object contains necessary data if required by your API
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log('Friend request sent successfully.');
            } else {
                // Cancel friend request
                await axios.post(
                    `http://localhost:4000/api/articles/${userId}/CanceladdFriend`,
                    {}, // Ensure this object contains necessary data if required by your API
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log('Friend request canceled.');
                localStorage.removeItem('requestSent')
            }
    
            // Toggle requestSent state for the user
            const updatedRequestSent = {
                ...requestSent,
                [userId]: !requestSent[userId]
            };
            setRequestSent(updatedRequestSent);
            // Update localStorage with updated state
            localStorage.setItem('requestSent', JSON.stringify(updatedRequestSent));
        } catch (error) {
            console.error('Error sending/canceling friend request:', error);
            // Handle error here
        }
    };
    
    

    // Filter users to exclude those who are already friends and the current user
    const filteredUsers = users.filter(user =>
        !friends.some(friend => friend.id === user._id) && user.username !== currentUser
    );

    return (
        <div className="users">
            <h2>All Users</h2>
            {loading ? (
                <p>Loading users...</p>
            ) : (
                <ul>
                    {filteredUsers.map(user => (
                        <li key={user._id}>
                            <span>{user.username}</span>
                            <button onClick={() => handleAddFriend(user._id)}>
                                {requestSent[user._id] ? 'Cancel Request' : 'Add Friend'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Users;

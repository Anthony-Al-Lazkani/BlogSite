import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const friendsString = localStorage.getItem('friends');
    const friends = JSON.parse(friendsString) || [];
    const currentUser = localStorage.getItem('username')

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/articles/getAllusers');
                setUsers(response.data);
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
            const token = localStorage.getItem('authToken'); // Retrieve token from localStorage or wherever it's stored
            if (!token) {
                console.error('No token found. User not authenticated.');
                return;
            }

            await axios.post(
                `http://localhost:4000/api/articles/${userId}/addFriend`,
                {}, // Empty object or any data you need to send
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log('Friend request sent successfully.');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized. Please log in to add a friend.');
                // Handle unauthorized error (e.g., redirect to login page)
            } else {
                console.error('Error sending friend request:', error);
            }
        }
    };

    // Filter users to exclude those who are already friends
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
                            <button onClick={() => handleAddFriend(user._id)}>Add Friend</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Users;

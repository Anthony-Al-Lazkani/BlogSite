import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css';


function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [requestSent, setRequestSent] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const friendsString = localStorage.getItem('friends');
    const friends = JSON.parse(friendsString) || [];
    const friendsRequestsString = localStorage.getItem('friendsRequest');
    const friendsRequests = JSON.parse(friendsRequestsString) || [];
    const currentUser = localStorage.getItem('username');
    const requestsSentString = localStorage.getItem('requestsSent');
    const requestsSentArray = JSON.parse(requestsSentString) || [];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/articles/getAllusers');
                setUsers(response.data);

                const initialRequestSentState = {};
                response.data.forEach(user => {
                    initialRequestSentState[user._id] = requestsSentArray.some(
                        request => request.id === user._id
                    );
                });
                setRequestSent(initialRequestSentState);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [requestsSentArray]);

    const handleAddFriend = async (userId, username) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error('No token found. User not authenticated.');
                return;
            }

            const isRequestSent = requestsSentArray.some(request => request.id === userId);

            if (!isRequestSent) {
                await axios.post(
                    `http://localhost:4000/api/articles/${userId}/addFriend`,
                    {}, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log('Friend request sent successfully.');

                const updatedRequestsSentArray = [
                    ...requestsSentArray,
                    { username, id: userId }
                ];
                localStorage.setItem('requestsSent', JSON.stringify(updatedRequestsSentArray));
                setRequestSent(prevState => ({
                    ...prevState,
                    [userId]: true
                }));
            } else {
                await axios.post(
                    `http://localhost:4000/api/articles/${userId}/CanceladdFriend`,
                    {}, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log('Friend request canceled.');

                const updatedfriendsRequests = friendsRequests.filter(
                    request => request.id !== userId
                );
                localStorage.setItem('friendsRequest', JSON.stringify(updatedfriendsRequests))

                const updatedRequestsSentArray = requestsSentArray.filter(
                    request => request.id !== userId
                );
                localStorage.setItem('requestsSent', JSON.stringify(updatedRequestsSentArray));
                setRequestSent(prevState => ({
                    ...prevState,
                    [userId]: false
                }));
            }
        } catch (error) {
            console.error('Error sending/canceling friend request:', error);
        }
    };

    const filteredUsers = users.filter(user =>
        !friends.some(friend => friend.id === user._id) && 
        user.username !== currentUser &&
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="users">
            <div className="Search-Bar-Div">
                <input
                    type="text"
                    placeholder="Search For Users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
            </div>
            {loading ? (
                <p>Loading users...</p>
            ) : (
                <ul>
                    {filteredUsers.map(user => (
                        <li key={user._id}>
                            <span>{user.username}</span>
                            <button onClick={() => handleAddFriend(user._id, user.username)}>
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { VscAccount } from "react-icons/vsc";
import { FaUserCheck, FaUserMinus } from "react-icons/fa";
import axios from 'axios';

function Profile() {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const friendsString = localStorage.getItem('friends');
    const [friends, setFriends] = useState(JSON.parse(friendsString) || []);

    const [profilePhoto, setProfilePhoto] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('friends');
        localStorage.removeItem('friendsRequest');
        navigate('/login');
    };

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePhoto(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const removeFriend = async (friendId) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error('No token found. User not authenticated.');
                return;
            }

            const response = await axios.post(
                `http://localhost:4000/api/articles/${friendId}/removeFriend`,
                {}, // Empty body for POST request
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data.message);

            const updatedFriends = friends.filter(friend => friend.id !== friendId);
            setFriends(updatedFriends);
            localStorage.setItem('friends', JSON.stringify(updatedFriends));

        } catch (error) {
            console.error('Error removing friend:', error);
        }
    };

    return (
        <div className="ProfileContainer">
            <div className="ProfileDivision">
                <div className="Left-Section">
                    <div className="Profile-Photo">
                        {profilePhoto ? (
                            <img src={profilePhoto} alt="Profile" />
                        ) : (
                            <label htmlFor="upload-button" className="upload-label">
                                <input
                                    type="file"
                                    id="upload-button"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                />
                                <VscAccount />
                            </label>
                        )}
                    </div>

                    <div className="User-Username">
                        <p>{username}</p>
                    </div>

                    <div className="Followers">
                        <FaUserCheck />
                        <p>{friends.length} Friends</p>
                    </div>

                    <div className="LogoutButton">
                        <a href="#"><button onClick={handleLogout}>Sign Out</button></a>
                    </div>
                </div>

                <div className="Right-Section">
                    <div className='Close-Div'>
                        <span onClick={() => navigate('/')}>&times;</span>
                    </div>

                    <div className="Title">
                        <h1>Personal Information</h1>
                    </div>

                    <div className='Personal-Info'>
                        <div className="Information">
                            <span>Username</span>
                            <p>{username}</p>
                        </div>

                        <div className="Information">
                            <span>Email</span>
                            <p>{email}</p>
                        </div>

                        <div className="Information">
                            <span>Friends</span>
                            {friends.length > 0 ? (
                                <ul>
                                    {friends.map((friend, index) => (
                                        <li key={index}>
                                            {friend.username}
                                            <button onClick={() => removeFriend(friend.id)}>
                                                <FaUserMinus />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No friends available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;

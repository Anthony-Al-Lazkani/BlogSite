import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { VscAccount } from "react-icons/vsc";
import { FaUserCheck } from "react-icons/fa";

function Profile() {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const friendsString = localStorage.getItem('friends');
    const friends = JSON.parse(friendsString);

    //State to hold the photo
    const [profilePhoto, setProfilePhoto] = useState(null);


    const navigate = useNavigate();

    //Function for Logout
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username')
        localStorage.removeItem('email')
        localStorage.removeItem('friends')
        localStorage.removeItem('friendsRequest')
        navigate('/login'); 
    };

    //Boolean for logged in
    const isLoggedIn = !!localStorage.getItem('authToken');

    const onClose = () => {
        navigate('/');
    };

    // Function to handle photo upload
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
                        <p>Nb of Followers</p>
                    </div>

                    <div className="LogoutButton">
                        <a href="#"><button onClick={handleLogout}>Sign Out</button></a>
                    </div>
                </div>


                <div className="Right-Section">
                    <div className='Close-Div'>
                        <span onClick={onClose}>&times;</span>
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
                            <p> {friends && friends.length > 0 ? (
                                <ul>
                                {friends.map((friend, index) => (
                                <li key={index}>{friend.username}</li>
                                ))}
                            </ul>
                            ) : (
                                <p>No friends available</p>
                        )}</p>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Profile;
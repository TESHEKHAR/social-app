import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = sessionStorage.getItem('accessToken');
            try {
                const response = await axios.get('http://localhost:8000/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfile(response.data.user);
            } catch (error) {
                console.log('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page">
            <h1>Welcome, {profile.displayName}</h1>
            <img src={profile.photo} alt="Profile" />
            <p>Email: {profile.email}</p>
        </div>
    );
};

export default ProfilePage;

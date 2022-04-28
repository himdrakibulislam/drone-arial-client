import React from 'react';
import useAuth from '../../hooks/useAuth';

const ProfileInfo = () => {
    const {user} = useAuth()
    return (
        <div>
            <h3>{user.displayName}</h3>
            <h4>{user.email}</h4>
        </div>
    );
};

export default ProfileInfo;
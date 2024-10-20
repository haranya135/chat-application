import React, { useState, useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelListContainer, ChannelContainer, Auth } from './components';

import './App.css';

const cookies = new Cookies();

const apiKey = '25fcnyxz4zqn';
const authToken = cookies.get('token');

const client = StreamChat.getInstance(apiKey);

const App = () => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Async function to connect user
    const connectUser = async () => {
        try {
            // Ensure the token and user ID are consistent
            const userId = cookies.get('userId');  // Should match the ID used in token generation

            if (authToken) {
                await client.connectUser({
                    id: userId,  // This ID should match the one used in token generation
                    name: cookies.get('username'),
                    fullName: cookies.get('fullName'),
                    image: cookies.get('avatarURL'),
                    hashedPassword: cookies.get('hashedPassword'),
                    phoneNumber: cookies.get('phoneNumber'),
                }, authToken);
            }
        } catch (error) {
            console.error('Error connecting user:', error);
            // Optionally clear cookies or handle re-authentication
            cookies.remove('token');
            cookies.remove('userId');
            // You can also redirect to Auth component or re-authenticate here
        }
    };

    // Use useEffect to run the connectUser function when the component mounts
    useEffect(() => {
        if (authToken) {
            connectUser();
        }
    }, [authToken]);  // Re-run when authToken changes

    if (!authToken) return <Auth />;

    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
            </Chat>
        </div>
    );
};

export default App;


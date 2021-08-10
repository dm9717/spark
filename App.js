import React, { useState } from 'react';
import { UserContext } from './src/contexts/userContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
    const [user, setUser] = useState();

    // Make user and setUser accessible in AppNavigator
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <AppNavigator />
        </UserContext.Provider>
    );
}

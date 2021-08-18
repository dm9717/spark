import 'react-native-gesture-handler';
import React, { useState } from 'react';

// contexts
import { UserContext } from './src/contexts/userContext';
// navigators
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

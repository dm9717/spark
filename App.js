import React, { useState } from 'react';

// contexts
import { UserContext } from './src/contexts/userContext';
import { MyIdeaContext } from './src/contexts/myIdeaContext';
// navigators
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
    const [user, setUser] = useState();
    const [myIdeas, setMyIdeas] = useState([]);

    // Make user and setUser accessible in AppNavigator
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <MyIdeaContext.Provider value={{ myIdeas, setMyIdeas }}>
                <AppNavigator />
            </MyIdeaContext.Provider>
        </UserContext.Provider>
    );
}

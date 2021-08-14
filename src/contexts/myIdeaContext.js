import { createContext } from 'react';

export const MyIdeaContext = createContext({
    myIdeas: [],
    setMyIdeas: () => {},
});

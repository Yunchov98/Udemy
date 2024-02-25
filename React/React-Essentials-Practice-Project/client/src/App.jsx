import { useState } from 'react';

import Header from './components/Header/Header';
import UserInput from './components/UserInput/UserInput';
import Results from './components/Results/Results';

function App() {
    const [userInput, setUserInput] = useState({
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10,
    });

    function handleChange(inputIdentifier, newValue) {
        setUserInput((state) => {
            return {
                ...state,
                [inputIdentifier]: newValue,
            };
        });
    }

    return (
        <>
            <Header />
            <UserInput onChange={handleChange} userInput={userInput} />
            <Results userInput={userInput} />
        </>
    );
}

export default App;

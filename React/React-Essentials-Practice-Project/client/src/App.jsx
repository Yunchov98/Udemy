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

    const inputIsValid = userInput.duration > 0;

    function handleChange(inputIdentifier, newValue) {
        setUserInput((state) => {
            return {
                ...state,
                [inputIdentifier]: Number(newValue),
            };
        });
    }

    return (
        <>
            <Header />
            <UserInput onChange={handleChange} userInput={userInput} />
            {inputIsValid && <Results userInput={userInput} />}
            {!inputIsValid && (
                <p className="center">
                    Please enter a duration greater than zero.
                </p>
            )}
        </>
    );
}

export default App;

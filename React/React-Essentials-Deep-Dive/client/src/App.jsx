import { useState } from 'react';

import WINNING_COMBINATIONS from './winning-combinations';

import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';

function deriveActivePlayer(gameTurns) {
    let activePlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        activePlayer = 'O';
    }

    return activePlayer;
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);

    const activePlayer = deriveActivePlayer(gameTurns);

    const handleSelesectSquare = (rowIndex, colIndex) => {
        setGameTurns((state) => {
            const currentPlayer = deriveActivePlayer(state);

            return [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: currentPlayer,
                },
                ...state,
            ];
        });
    };

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        name="Player 1"
                        symbol="X"
                        isActive={activePlayer === 'X'}
                    />
                    <Player
                        name="Player 2"
                        symbol="O"
                        isActive={activePlayer === 'O'}
                    />
                </ol>
                <GameBoard
                    onSelectSquare={handleSelesectSquare}
                    turns={gameTurns}
                />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;

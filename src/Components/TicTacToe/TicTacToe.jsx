import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

// Initializing data array
let data = ["","","","","","","","",""];

export const TicTacToe = () => {
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let [winner, setWinner] = useState("");
    let [winningIcon, setWinningIcon] = useState("");

    // Function to handle click and toggle between X and O
    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return;
        }

        // Update the data and display the appropriate icon
        const currentPlayer = count % 2 === 0 ? "x" : "o";
        const icon = currentPlayer === "x" ? cross_icon : circle_icon;
        e.target.innerHTML = `<img src='${icon}' alt='${currentPlayer === "x" ? "Cross" : "Circle"} Icon'>`;
        data[num] = currentPlayer;
        setCount(count + 1);
        checkWin();
    };

    // Function to check winning conditions
    const checkWin = () => {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                setWinningIcon(data[a] === "x" ? cross_icon : circle_icon);
                setWinner(data[a]);
                setLock(true);
                return;
            }
        }

        // Check for draw (if no winner and all cells are filled)
        if (data.every(cell => cell) && !lock) {
            setWinner("Draw");
            setWinningIcon(null);
            setLock(true);
        }
    };

    // Function to reset the game
    const resetGame = () => {
        data = ["","","","","","","","",""]; // Reset data array
        setCount(0); // Reset count
        setLock(false); // Unlock the game
        setWinner(""); // Reset winner
        setWinningIcon(""); // Reset winning icon
        document.querySelectorAll('.boxes').forEach(box => box.innerHTML = ''); // Clear the board
    };

    return (
        <div className='container'>
            {winner && (
                <div className="congratulations">
                    <h2>{winner === "Draw" ? "Oww, Match Draw!" : "Congratulations!"}</h2>
                    {winner !== "Draw" && <img src={winningIcon} alt="Winning Icon" className="winning-icon" />}
                    <p>{winner === "Draw" ? "" : `${winner.toUpperCase()} wins!`}</p>
                </div>
            )}
            {!winner && <h1 className="title">Tic Tac Toe Game</h1>}
            <div className="board">
                <div className="row1">
                    <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
                </div>
                <div className="row2">
                    <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
                </div>
                <div className="row2">
                    <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
                    <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>
            <button className="reset" onClick={resetGame}>Reset</button>
        </div>
    );
}

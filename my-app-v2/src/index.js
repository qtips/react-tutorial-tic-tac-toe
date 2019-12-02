import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
 En React Componenet tar inn props og returnerer en hierarki av "views" for visning via render()
 render() returnerer en description av hva du ønsker å se.
 React bruker beskrivelsen og lager en React element

 JSX tilbyr spesiell syntax som gjør render() enklere å skrive.
 f. eks. blir <div /> blir konvertert til React.createElement('div')
 Inni { } kan man skrive hvilket som helst javascript

 feltet state brukes for at en komponent skal "huske" ting.
 props er input til component ved initiering.

 dev tools i chrome -> components viser props og state til enhver tid.

 immutability i react brukes til å enkelt avgjøre når et objekt endrer seg. For å vite om et Mutable objekt har endret seg krever at man må sjekke felt for felt.   
 */


/** function componenent - enklere måte å lage klasser som kun består av render
 * Se under
 **/
function Square(props) {
    return (
        <button className="square"
                onClick={props.vedKlikk}>
            {props.value /* hver gang state til board endrer seg så oppdateres props */}
        </button>
    );

}

/*** klassen under er skrevet om til Function Component over! ***/
// class Square extends React.Component {
//     /*
//     Ingen state på square, da den styres fullstendig av Board
//     */
//     render() {
//         return (
//             <button className="square"
//                     onClick={this.props.vedKlikk}>
//                 {this.props.value /* hver gang state til board endrer seg så oppdateres props */}
//             </button>
//         );
//     }
// }

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square value={this.props.squares[i] /*binder state med props*/}
                    vedKlikk={() => this.props.onBoardEvent(i)}
            />
        );
    }

    render() {

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            nextMove: 'X',
        };
    }

    handleBoardEvent(i) {
        let step = this.state.stepNumber;
        const currentBoard = this.currentBoard();
        if (calculateWinner(currentBoard)) {
            return;
        }

        const newBoard = currentBoard.slice();
        newBoard[i] = this.state.nextMove;

        const history = this.state.history.slice(0, step + 1);
        history.push({squares: newBoard});

        const nextMove = this.state.nextMove === 'X' ? 'O' : 'X';
        this.setState({
            history: history,
            nextMove: nextMove,
            stepNumber: ++step
        })
    }

    currentBoard() {
        return this.state.history[this.state.stepNumber].squares;
    }

    jumpTo(index) {
        this.setState({
            stepNumber: index,
            nextMove: (index % 2) === 0 ? 'X' : 'O'
        })
    }

    render() {
        const winner = calculateWinner(this.currentBoard());
        const status = winner ?
            winner + " has won!"
            : 'Next player: ' + this.state.nextMove;


        const moves = this.state.history.map((board, index) => {
            const description = index ?
                'Go to move #' + index :
                'Go to game start';
            return (
                <li key={index}>
                    <button onClick={() => this.jumpTo(index)}>
                        {description}
                    </button>
                </li>

            );

        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.currentBoard()}
                           nextMove={this.state.nextMove}
                           onBoardEvent={(i) => this.handleBoardEvent(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

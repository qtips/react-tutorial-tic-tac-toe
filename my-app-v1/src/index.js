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
class Square extends React.Component {
    /*
    Ingen state på square, da den styres fullstendig av Board
    */
    render() {
        return (
            <button className="square"
                    onClick={this.props.vedKlikk}>
                {this.props.value /* hver gang state til board endrer seg så oppdateres props */}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            lastMove: null
        }
    }

    renderSquare(i) {
        return (
            <Square value={this.state.squares[i] /*binder state med props*/ }
                    vedKlikk={() => this.nextSquare(i)}
            />
        );
    }

    nextSquare(i) {
        let nextMove = this.state.lastMove && this.state.lastMove === 'X'
            ? 'O' : 'X';
        let squares = this.state.squares.slice(); // kopiere array
        squares[i] = nextMove;
        this.setState({squares, lastMove: nextMove});
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

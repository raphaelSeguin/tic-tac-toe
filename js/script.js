'use strict';

const ttt = (function() {
  let tttBoard;
  let turn = 1;
  let playerName = '';
  let opponentName = '';
  let vsComputer;

  // templates
  const startTemplate = `<div class="screen screen-start" id="start">
                            <header>
                              <h1>Tic Tac Toe</h1>
                              <a href="#" class="button">Start game</a>
                              <br>
                              <input type="checkbox" id="vs-computer">VS. Computer</input>
                            </header>
                          </div>`;
  const gameTemplate = `<div class="board" id="board">
                            <header>
                              <h1>Tic Tac Toe</h1>
                              <ul>
                                <li class="players" id="player1">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg>
                                  <p id="player-one-name">${playerName}</p>
                                </li>
                                <li class="players" id="player2">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg>
                                  <p id="player-two-name">${playerName}</p>
                                </li>
                              </ul>
                            </header>
                            <ul class="boxes">
                              <li class="box" id="0"></li>
                              <li class="box" id="1"></li>
                              <li class="box" id="2"></li>
                              <li class="box" id="3"></li>
                              <li class="box" id="4"></li>
                              <li class="box" id="5"></li>
                              <li class="box" id="6"></li>
                              <li class="box" id="7"></li>
                              <li class="box" id="8"></li>
                            </ul>
                          </div>`;
  const winTemplate = `<div class="screen screen-win" id="finish">
                          <header>
                            <h1>Tic Tac Toe</h1>
                            <p class="message"></p>
                            <a href="#" class="button">New game</a>
                          </header>
                        </div>`;
  // aliases
  const getId = (id) => document.getElementById(id);
  const getClass = (className) => document.getElementsByClassName(className);
  // display function
  const display = (template) => {
    getId('tic-tac-toe-container').innerHTML = template;
  }
  // tictactoe functions (pure)
  const wins = ({board, player} = {}) => {
    const b = board;
    const p = player;
    const row = (player, ...boxes) => {
      return b[boxes[0]] === b[boxes[1]] && b[boxes[0]] === b[boxes[2]] && b[boxes[0]] === player;
    }
    return (
      row(player, 0, 1, 2)
      ||
      row(player, 3, 4, 5)
      ||
      row(player, 6, 7, 8)
      ||
      row(player, 0, 3, 6)
      ||
      row(player, 1, 4, 7)
      ||
      row(player, 2, 5, 8)
      ||
      row(player, 0, 4, 8)
      ||
      row(player, 2, 4, 6)
    );
  }
  const tieGame = (board) => {
    return ! (
      board.indexOf(0) > -1
      || wins({board: board, player: 1})
      || wins({board, player: 2})
    );
  }
  const play = ({player, position, board} = {}) => {
    const newBoard = [...board];
    newBoard[position] = player;
    return newBoard;
  }
  const emptyBox = ({position, board} = {}) => {
    return board[position] === 0;
  }
  const minimax = ({board, player} = {}) => {
    // evaluation / base case return if the game if finished
    if( wins({board, player: 2}) ) {
      return {score: 10};
    } else if ( wins({board, player: 1}) ) {
      return {score: -10};
    } else if ( tieGame(board) ) {
      return {score: 0};
    }
    // find possible moves and call minimax on them
    const possibleMoves = board.reduce( (pMoves, box, index) => {
      return box === 0 ? pMoves.concat(index) : pMoves;
    }, [])
    .map( (index) => {
      const move = {};
      board[index] = player;
      move.index = index;
      move.score = minimax({board, player: player === 1 ? 2 : 1}).score;
      board[index] = 0;
      return move;
    });
    // find the best score among possible moves
    const bestScore = possibleMoves.reduce( (bestScore, move) => {
      if ( player === 2 ) {
        return move.score > bestScore ? move.score : bestScore;
      } else if ( player === 1 ) {
        return move.score < bestScore ? move.score : bestScore;
      }
    }, player === 2 ? -10000 : 10000);
    // find the best moves (those who yield the best score)
    const bestMoves = possibleMoves.reduce( (bestMoves, move) => {
      return move.score === bestScore
              ? bestMoves.concat(move)
              : bestMoves
              ;
    }, []);
    // chose randomly one of the best moves
    const chosenMove = bestMoves[ Math.floor(Math.random() * bestMoves.length) ];
    // return it
    return chosenMove;
  }

  // actions (side effects)
  const promptName = () => {
    // ask player's name
    playerName = prompt("Player One's Name ?", "Player One");
    // is it versus computer ?
    vsComputer = getId('vs-computer').checked;
    // set the opponent's name in function
    opponentName = vsComputer
                      ? navigator.userAgent.split(' ')[3]
                      : prompt("Player Two's Name ?", "Player Two");
  };
  const setNamesDisplay = (player1Name) => {
    getId('player-one-name').textContent = playerName;
    getId('player-two-name').textContent = opponentName;
  };
  const changeTurn = (newTurn) => {
    // change the turn
    turn = newTurn;
    // and display it
    if (newTurn === 1) {
      getId('player1').classList.add('active');
      getId('player2').classList.remove('active');
    }
    else if (newTurn === 2) {
      getId('player1').classList.remove('active');
      getId('player2').classList.add('active');
    }
    else {
      getId('player1').classList.remove('active');
      getId('player2').classList.remove('active');
    }
  };

  // game phases go in cycle
  const gameStart = () => {
    // initialize the board
    tttBoard = [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ];
    // start
    display(startTemplate);
    // listen to button
    getClass('button')[0].addEventListener('click', e => {
      promptName();
      gamePlay();
    })
  };
  const gamePlay = () => {
    display(gameTemplate);
    setNamesDisplay();
    changeTurn(1);
    boxListeners();
  };
  const gameEnd = (endingOption) => {
    changeTurn(0);
    setTimeout( () => {
      display(winTemplate);
      const screenWinClass = endingOption === 0
                            ? 'screen-win-tie'
                            : endingOption === 1
                              ? 'screen-win-one'
                              : 'screen-win-two'
                              ;
      const endGameMessage = endingOption === 0
                        ? 'Tie!'
                        : endingOption === 1
                          ? playerName + ' wins!'
                          : opponentName + ' wins!'
                          ;
      getId('finish').classList.add(screenWinClass);
      getClass('message')[0].textContent = endGameMessage;
      getClass('button')[0].addEventListener('click', gameStart);
    }, 500);
  };

  // eventListeners
  const setStartButton = () => {
    document.getElementsByTagName('a')[0].addEventListener('click', () => {
      playerName = promptName();
      display(gameTemplate);
    });
  }
  // the game logic is here
  const boxListeners = () => {
    // make an array of boxes elements
    const boxes = Array.from( getClass('box') );
    // add listeners on each of them
    boxes.forEach( (box) => {
      //
      box.addEventListener('click', (event) => {
        let boxNumber = event.target.id;
        // if it's not computer's turn and the box is empty
        if ( !(turn === 2 && vsComputer) && emptyBox({position: boxNumber, board: tttBoard}) ) {
          // play
          tttBoard = play({
            player: turn,
            position: boxNumber,
            board: tttBoard
          });
          // display
          boxes[boxNumber].classList.add('box-filled-' + turn);
          // test
          const playerWins = wins({
            board: tttBoard,
            player: turn
          });
          // take actions if the game is finished (win or tie)
          if ( playerWins ) {
            gameEnd(turn);
            return;
          }
          else if ( tieGame(tttBoard) ) {
            gameEnd(0);
            return;
          }
          else {
            // if not finished change the turn
            changeTurn(turn === 1 ? 2 : 1);
            // and if player two is the computer ...
            if ( vsComputer ) {
              // wait a little while to pretend it's thinking
              setTimeout(() => {
                // then find a smart move
                let computerMove = minimax({board: tttBoard, player: 2}).index;
                // play
                tttBoard = play({
                  player: 2,
                  board: tttBoard,
                  position: computerMove
                });
                // display
                boxes[computerMove].classList.add('box-filled-' + turn);
                // test
                const computerWins = wins({
                  board: tttBoard,
                  player: 2
                });
                if ( computerWins ) {
                  gameEnd(2);
                  return;
                }
                else if ( tieGame(tttBoard) ) {
                  gameEnd(0);
                  return;
                }
                // change turn
                changeTurn(1);
              }, 500);
            }
          }
        }
      });
      // make the box highlighted with player's symbol when moused over
      box.addEventListener('mouseenter', (e) => {
        // check that it's not computer's turn
        const boxIsEmpty = emptyBox({board: tttBoard, position: e.target.id});
        const notComputersTurn = ! (vsComputer && turn === 2);
        // add class to the box when the mouse enters
        if ( boxIsEmpty && notComputersTurn ) {
          e.target.classList.add('box-filled-' + turn);
        }
      })
      box.addEventListener('mouseleave', (e) => {
        // leave the box empty if it must
        if ( emptyBox({board: tttBoard, position: e.target.id}) ) {
          e.target.classList.remove('box-filled-' + turn);
        }
      })
    });
  };

  // START THE GAME
  gameStart();
}());

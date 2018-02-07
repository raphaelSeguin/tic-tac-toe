'use strict';
// computer player version
const ttt = (function(){
  // templates
  const startTemplate = `<div class="screen screen-start" id="start">
    <header>
      <h1>Tic Tac Toe</h1>
      <a href="#" class="button">Start game</a>
    </header>
  </div>`;
  const gameTemplate = `<div class="board" id="board">
    <header>
      <h1>Tic Tac Toe</h1>
      <ul>
        <li class="players" id="player1">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg>
          <p id="player-one-name"></p>
        </li>
        <li class="players" id="player2">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg>
          <p id="player-two-name"></p>
        </li>
      </ul>
    </header>
    <ul class="boxes">
      <li class="box"></li>
      <li class="box"></li>
      <li class="box"></li>
      <li class="box"></li>
      <li class="box"></li>
      <li class="box"></li>
      <li class="box"></li>
      <li class="box"></li>
      <li class="box"></li>
    </ul>
  </div>`;
  const winTemplate = `<div class="screen screen-win" id="finish">
    <header>
      <h1>Tic Tac Toe</h1>
      <p class="message"></p>
      <a href="#" class="button">New game</a>
    </header>
  </div>`;

  const tictactoe = {
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    turn: 1,
    players: [
      {
        name: '',
        type: 'human'
      },
      {
        name: '',
        type: 'computer'
      }
    ],
    init: function() {
      this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.turn = 1;
    },
    play: function(position) {
      if (this.board[position] === 0) {
        this.board[position] = this.turn; // 1 for player 1 ...
        return true;
      } else {
        return false;
      }
    },
    finishTest: function(board) {
      const g = board || this.board;
      // return 1 or 2 if one player wins
      // 0 for a Tie
      // false if the game is not finished
      return (
        g[0] === g[1] && g[0] === g[2] && g[0] !== 0
        ||
        g[3] === g[4] && g[3] === g[5] && g[3] !== 0
        ||
        g[6] === g[7] && g[6] === g[8] && g[6] !== 0
        ||
        g[0] === g[3] && g[0] === g[6] && g[0] !== 0
        ||
        g[1] === g[4] && g[1] === g[7] && g[1] !== 0
        ||
        g[2] === g[5] && g[2] === g[8] && g[2] !== 0
        ||
        g[0] === g[4] && g[0] === g[8] && g[0] !== 0
        ||
        g[2] === g[4] && g[2] === g[6] && g[2] !== 0)
        ? this.turn
        : g.includes(0)
          ? false
          : 0
          ;
    },
    isEmpty: function(box) {
      return this.board[box] === 0;
    },
    endTest: function() {
      // ???
    },
    minimax: function(board, player) {
      // ********* base cases ***********
      // if game is finihed
        // if player wins return {score: 10}
        // if opponent wins return {score: -10}
        // if tie return {score: 0}

      if ( this.finishTest(board) === 2 ) {
        return {score: 10};
      } else if ( this.finishTest(board) === 1 ) {
        return {score: -10};
      } else if ( this.finishTest(board) === 0 ) {
        return {score: 0};
      }
      // make an empty boxes indexes array
      const emptyBoxes = board.reduce( (empty, el, index) => {
        return el === 0
                ? empty.concat(index)
                : empty;
      }, [])
      // make an array for storing move objects
      const moves = [];
      // for each element in the empty boxes array
      emptyBoxes.forEach( (el) => {
        // make a move object
        const move = {};
        move.index = el;
        board[el] = player;
        move.score = this.minimax(board, (player + 1) % 2).score;
        moves.push(move);
        board[el] = 0;
      });
      console.log(moves);
      let bestMove;
      if ( player === 2 ) { // MIN
        bestMove = moves.reduce( (min, move) => {
            return move.score < min.score ? move : min;
          }, {score: 10000});
      } else { // MAX
        bestMove = moves.reduce( (max, move) => {
            return move.score > max.score ? move : max;
          }, {score: -10000});
      }
      // chose the best score in moves according to current turn
        // if player
      return bestMove;
    }
  };
  // query container div
  const container = document.getElementById('tic-tac-toe-container');
  // Displays
  const displayStart = () => {
    // display start screen
    container.innerHTML = startTemplate;
    // when the user clicks the button
    document.getElementsByTagName('a')[0].addEventListener('click', () => {
      // initialise the game
      tictactoe.init();
      // ask for players names
      const playerOneName = prompt("Player one's name ?", "player one");
      const playerTwoName = prompt("Player two's name ?", "player two");
      // set the object fields accordingly
      tictactoe.players[0].name = playerOneName;
      tictactoe.players[1].name = playerTwoName;
      // call displaygame to ...
      displayGame();
    });
  }
  const displayGame = () => {
    // display the game screen
    container.innerHTML = gameTemplate;
    // query the elements
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    const player1Name = document.getElementById('player-one-name');
    const player2Name = document.getElementById('player-two-name');
    const boxes = document.getElementsByClassName('box');
    // set the players names display
    player1Name.textContent = tictactoe.players[0].name || 'player one';
    player2Name.textContent = tictactoe.players[1].name || 'player two';
    // first player's turn
    player1.classList.add('active');
    // attach listeners to the boxes

    // if player is human

    Array.from(boxes).forEach( (el, i) => {
      // set boxes ids
      el.id = i;
      el.addEventListener('click', (e) => {
        const box = e.target;
        // if the box
        if( tictactoe.play(box.id) ) {
          box.classList.add('box-filled-' + tictactoe.turn);
          // afficher le tour
          player1.classList.toggle('active');
          player2.classList.toggle('active');
          const test = tictactoe.finishTest();
          if ( test === 0 ) {
            setTimeout(displayWin, 200, 0);
            return;
          } else if( test === 1 || test === 2) {
            setTimeout(displayWin, 200, tictactoe.turn);
            return;
          } else
          tictactoe.turn = tictactoe.turn === 1 ? 2 : 1;
        }
      });
      //
      el.addEventListener('mouseenter', (e) => {
        const box = e.target;
        if ( tictactoe.isEmpty(box.id) ) {
          // if box empty add class current player ...
          box.classList.add('box-filled-' + tictactoe.turn);
        }
      });
      el.addEventListener('mouseleave', (e) => {
        const box = e.target;
        if ( tictactoe.isEmpty(box.id) ) {
          // if box empty add class current player ...
          box.classList.remove('box-filled-' + tictactoe.turn);
        }
      });
    });

    // else computer plays !!


  }
  const displayWin = () => {
    const winner = tictactoe.finishTest();
    const winnerName = winner === 1 ? tictactoe.players[0].name : tictactoe.players[1].name;
    container.innerHTML = winTemplate;
    // query div#finish
    const finishDiv = document.getElementById('finish');
    const finishP = document.getElementsByClassName('message')[0];
    const finishClass = winner === 1
                          ? 'screen-win-one'
                          : winner === 2
                            ? 'screen-win-two'
                            : 'screen-win-tie'
                            ;
    const finishText = winner === 0
                          ? 'Tie'
                          : winnerName + ' wins !'
                          ;
    finishDiv.classList.add(finishClass);
    finishP.textContent = finishText;
    document.getElementsByClassName('button')[0].addEventListener('click', displayStart);
  }
  // GOOOOOO !
  displayStart();
}());

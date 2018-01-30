// TO DO !!!!!
//Empty squares are highlighted with player's symbol when moused over

// bim bidim 

'use strict';
// tic tac toe object
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
  finishTest: function() {
    const g = this.board;
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
  autoPlay: function() {}
};
// query container div
const container = document.getElementById('tic-tac-toe-container');
// Displays
const displayStart = () => {
  container.innerHTML = startTemplate;
  document.getElementsByTagName('a')[0].addEventListener('click', () => {
    // REMPLACER PAR GAMESCREEN
    tictactoe.init();
    const playerOneName = prompt("Player one's name ?", "player one");
    const playerTwoName = prompt("Player two's name ?", "player two");
    tictactoe.players[0].name = playerOneName;
    tictactoe.players[1].name = playerTwoName;
    displayGame();
  });
}
const displayGame = () => {
  // display the template
  container.innerHTML = gameTemplate;
  // query the elements
  const player1 = document.getElementById('player1');
  const player2 = document.getElementById('player2');
  const player1Name = document.getElementById('player-one-name');
  const player2Name = document.getElementById('player-two-name');
  const boxes = document.getElementsByClassName('box');
  // players names display
  player1Name.textContent = tictactoe.players[0].name || 'player one';
  player2Name.textContent = tictactoe.players[1].name || 'player two';
  // first player's turn
  player1.classList.add('active');
  // attach listeners to the boxes
  Array.from(boxes).forEach( (el, i) => {
    el.id = i;
    el.addEventListener('click', (e) => {
      const box = e.target;
      if( tictactoe.play(box.id) ) {
        box.classList.add('box-filled-' + tictactoe.turn);
        // afficher le tour
        player1.classList.toggle('active');
        player2.classList.toggle('active');
        const test = tictactoe.finishTest();
        if ( test === 0 ) {
          setTimeout(displayWin, 500, 0);
          return;
        } else if( test === 1 || test === 2) {
          setTimeout(displayWin, 500, tictactoe.turn);
          return;
        } else
        tictactoe.turn = tictactoe.turn === 1 ? 2 : 1;
      }
    });
  });
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

'use strict';

// TEST BOARDS
const emptyBoard = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0
];
const playerOneWinsBoard = [
  1, 0, 2,
  1, 2, 0,
  1, 0, 0
];
const playerTwoWinsBoard = [
  1, 0, 2,
  1, 2, 0,
  2, 0, 0
];
const tieBoard = [
  1, 1, 2,
  2, 2, 1,
  1, 2, 1
];
// 1 should play 7 to win, 2 should play 4 to win
const playBoard1 = [
  0, 1, 2,
  2, 1, 0,
  1, 0, 0
];
// 1 should play 8 to win, 2 should play 1 or 4 to win
const playBoard2 = [
  2, 0, 2,
  2, 0, 2,
  1, 1, 0
];
// 1 should play 6 to not lose, 2 should play 6 to win
const playBoard3 = [
  2, 0, 1,
  2, 0, 0,
  0, 1, 0
];
// 1 -> 8, 2 -> 6
const playBoard4 = [
  2, 0, 1,
  2, 0, 1,
  0, 0, 0
];
// 1 seul choix : 4
const playBoard5 = [
  2, 1, 1,
  2, 0, 1,
  1, 2, 2
];
//
const playBoard6 = [
  2, 1, 2,
  2, 0, 1,
  1, 2, 2
];


// Minimax TEST
const minimaxTest = () => {
  console.log('\n--- TEST minimax ---\n');

  let result;
  result = minimax(playBoard4, 1);
  console.log(result.index + " should be 8");
  console.log(result.score + " should be 10");
  result = minimax(playBoard4, 2);
  console.log(result.index + " should be 6");
  console.log(result.score + " should be 10");

  console.log('\n--- TEST minimax END---\n');
}

// --------------------------HELPERS
// true or false
// WARNING the function doesn't say who wins !
const winGame = (board, player) => {
  const g = board;
  const p = player;
  return (
    g[0] === g[1] && g[0] === g[2] && g[0] === p
    ||
    g[3] === g[4] && g[3] === g[5] && g[3] === p
    ||
    g[6] === g[7] && g[6] === g[8] && g[6] === p
    ||
    g[0] === g[3] && g[0] === g[6] && g[0] === p
    ||
    g[1] === g[4] && g[1] === g[7] && g[1] === p
    ||
    g[2] === g[5] && g[2] === g[8] && g[2] === p
    ||
    g[0] === g[4] && g[0] === g[8] && g[0] === p
    ||
    g[2] === g[4] && g[2] === g[6] && g[2] === p
  )
}
// true or false ?
const tieGame = (board) => {
  return (
    board.filter( b => b === 0 ).length === 0
    &&
    !winGame(board, 1)
    &&
    !wingame(board, 2)
  );
}

// --------------------------TESTS

// print a board
const tttPrint = (board) => {
  const b = board;
  console.log('\n'+b[0]+' '+b[1]+' '+b[2]+'\n'+b[3]+' '+b[4]+' '+b[5]+'\n'+b[6]+' '+b[7]+' '+b[8])
}
// helpler functions TEST
const helpersTests = () => {
  console.log('\n--- TEST winGame ---\n');
  console.log(winGame(emptyBoard) + " should be false");
  console.log(winGame(playerOneWinsBoard) + " should be true");
  console.log(winGame(tieBoard) + " should be false");
  console.log('\n--- TEST tieGame ---\n');
  console.log(tieGame(emptyBoard) + " should be false");
  console.log(tieGame(playerOneWinsBoard) + " should be false");
  console.log(tieGame(tieBoard) + " should be true");
  console.log('\n--- TEST END ---\n');
}


// --------------------------MINIMAX

// Minimax
const minimax = (board, _iaPlayer) => {
  // keep track of the first function call player
  const iaPlayer = _iaPlayer; // rootPlayer c'est çui qu'on veut qu'y gagne ok ?
  const opponent = iaPlayer === 1 ? 2 : 1;// opponent c'est le méchant

  const minimaxer = (board, player) => {
    if ( winGame(board, iaPlayer) ) {
      return {score: 10};
    }
    else if ( winGame(board, opponent) ) {
      return {score: -10};
    }
    else if ( tieGame(board) ) {
      return {score: 0};
    }
    // fill possibleMoves with indexes of empty boxes
    // then map an object with that index and the score given by the minmaxer function called on the modified board

    return board.reduce( (emptyBoxes, val, index) => {
      return val === 0
        ? emptyBoxes.concat(index)
        : emptyBoxes;
    }, []).map( (index) => {
      const callingPlayer = player === iaPlayer ? opponent : iaPlayer;
      board[index] = player;
      const moveObject = {
        index: index,
        score: minimaxer(board, callingPlayer).score
      };
      board[index] = 0;
      return moveObject;
    })
    .reduce( (best, move) => {
      if ( player === iaPlayer ) {
        return move.score > best.score
                ? move
                : best;
      } else if ( player === opponent ) {
        return move.score < best.score
                ? move
                : best;
      }
    }, {score: ( player === iaPlayer ? -1000 : 1000 ) })

  }
  return minimaxer(board, iaPlayer);
}

//helpersTest();
minimaxTest();


// comment : recursive function are hard to test because...
// they must return the right data in order work properly so you can't really test the return value
// you have to log...
// let's log

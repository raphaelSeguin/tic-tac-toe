const computer = 2;
const human = 1;

const wins = (board, player) => {
    const b = board;
    const p = player;
    const row = (...boxes) => {
      return b[boxes[0]] === b[boxes[1]] && b[boxes[0]] === b[boxes[2]] && b[boxes[0]] === player;
    }
    return (
      row(0, 1, 2)
      ||
      row(3, 4, 5)
      ||
      row(6, 7, 8)
      ||
      row(0, 3, 6)
      ||
      row(1, 4, 7)
      ||
      row(2, 5, 8)
      ||
      row(0, 4, 8)
      ||
      row(2, 4, 6)
    );
  }
const tieGame = (board) => {
  return ! ( board.indexOf(0) > -1 || wins(board, 1) || wins(board, 2) );
}

let depth = 0;

const minimax = (board, player) => {
  console.log('iter : ' + depth + ' | player : ' + player);
  //console.log(player);
  // evaluation / base case
  if( wins(board, computer) ) {
    return {score: 10};
  } else if ( wins(board, human) ) {
    return {score: -10};
  } else if ( tieGame(board) ) {
    return {score: 0};
  }
  // find possible moves
  return board.reduce( (pMoves, box, index) => {
    return box === 0 ? pMoves.concat(index) : pMoves;
  }, [])
  .map( (index) => {
    //console.log('iter : ' + depth + ' | player : ' + player);
    depth++;
    const move = {};
    board[index] = player;
    move.index = index;
    move.score = minimax(board, player === 1 ? 2 : 1).score;
    board[move] = 0;
    return move;
  })
  .reduce( (bMove, move) => {
    if ( player === computer ) {
      return move.score > bMove.score ? move : bMove;
    } else if ( player === human ) {
      return move.score < bMove.score ? move : bMove;
    }
  }, {score: player === computer ? -10000 : 10000});
}

// 1 -> 8, 2 -> 6
const playBoard4 = [0, 0, 1, 0, 0, 0, 0, 0, 0
];

console.log( minimax(playBoard4, 2) );
//console.log( minimax(playBoard4, 2) );

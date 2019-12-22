

const gameBoard = (	function ()	{

	const _display = document.querySelector('#display')
	const _squares = document.querySelectorAll('.square')

	let gameBoard = [null, null, null, null, null, null, null, null, null];


	const render = () => {
		_squares.forEach((square, i) =>{
			square.innerText = gameBoard[i]
		});
	}

	return{ 
		render,
		boardArr: gameBoard,
	};

})();


const game =  ( function() {
 	const _squares = document.querySelectorAll('.square')

 	let _gameFinished = false;

 	const _winCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9],
 	 						[3, 5, 7], [1, 4, 7], [2, 5, 8], [3, 6, 9]]

 	_squares.forEach(square => {
 		square.addEventListener('click', () =>{
 			if(!_gameFinished){
	 			makeMove(currentPlayer, square)
	 			checkWin(getMoves())
	 			console.log(_gameFinished)
	 		}
 		})
 	})

 	const checkWin = (moves) => {
 		_winCombinations.forEach(combo => {
 			let counter = 0
 			moves.forEach(move => {
 				if(combo.includes(move)) counter++
 				if(counter == 3) _gameFinished = true;
 			})
 		})
 	}


	const makeMove = (currentPlayer, square) => {
		let index = square.dataset.attribute
		if(gameBoard.boardArr[index]) return;
		gameBoard.boardArr[index] = currentPlayer.symbol
		gameBoard.render()
	}

	const getMoves = () => {
		return gameBoard.boardArr.map((square, i) => {
			if(square != null) return ++i
		}).filter(obj => obj != null)
	}

	return{
		getMoves,
		checkWin,
	}
})()


const playerFactory = (name, symbol) => {
	return {name, symbol};
}

let currentPlayer = playerFactory('John', 'X');

let plkaye = playerFactory('John', 'X');

gameBoard.render();
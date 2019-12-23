
const playerFactory = (name, symbol) => {
	return {name, symbol};
}

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
 	const _controlButton = document.querySelector('#controlButton')
 	const _gameForm = document.querySelector('.playerform')
 	const _PVPButton = document.querySelector('#OneButton')
 	const _AIButton = document.querySelector('#AIbutton');

 	let _gameFinished = false;

 	const _winCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9],
 	 						 [3, 5, 7], [1, 4, 7], [2, 5, 8], [3, 6, 9]]

 	let player1 = playerFactory('John', 'X');
	let player2 = playerFactory('Bobby', 'O');
	let currentPlayer = player1

 	_squares.forEach(square => {
 		square.addEventListener('click', () =>{
 			if(!_gameFinished){
	 			makeMove(currentPlayer, square)
	 			checkWin(getMoves(player1))
	 			checkWin(getMoves(player2))
	 			playerTurn(player1, player2);
	 		}
 		})
 	})

 	_controlButton.addEventListener('click', () => {
 		alert('WOOOW')
 	})

 	_PVPButton.addEventListener('click', () => {
 		_gameForm.style.display = 'none'
 	})

 	const setPlayers = () =>{

 	}

 	const checkWin = (moves) => {
 		_winCombinations.forEach(combo => {
 			let counter = 0
 			moves.forEach(move => {
 				if(combo.includes(move)) counter++
 				if(counter == 3){
 					_gameFinished = true;
 					alert(currentPlayer.name + " has won")
 				}
 			})
 		})
 	}

 	const playerTurn = () => {
 		if(currentPlayer == player1) currentPlayer = player2
 		else currentPlayer = player1;
 	}

	const makeMove = (currentPlayer, square) => {
		let index = square.dataset.attribute
		if(gameBoard.boardArr[index]) return;
		gameBoard.boardArr[index] = currentPlayer.symbol
		gameBoard.render()
	}

	const getMoves = (player) => {
		return gameBoard.boardArr.map((square, i) => {
			if(square == player.symbol) return ++i
		}).filter(obj => obj != null)
	}

	return{
		getMoves,
		checkWin,
	}
})()




gameBoard.render();

const playerFactory = (name, symbol) => {
	return {name, symbol};
}

const gameBoard = (	function ()	{

	const _display = document.querySelector('#display')
	const _squares = document.querySelectorAll('.square')

	let boardArr = [null, null, null, null, null, null, null, null, null];


	const render = () => {
		_squares.forEach((square, i) =>{
			square.innerText = gameBoard.boardArr[i]
		});
	}

	const resetBoard = () => {
		gameBoard.boardArr.forEach(val => val = null)
		render()
	}

	return{ 
		render,
		boardArr,
		resetBoard,
	};

})();


const game =  ( function() {
 	const _squares = document.querySelectorAll('.square')
 	let gameFinished = false;

 	const _winCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9],
 	 						 [3, 5, 7], [1, 4, 7], [2, 5, 8], [3, 6, 9]]

 	let player1
	let player2
	let currentPlayer

 	_squares.forEach(square => {
 		square.addEventListener('click', () =>{
 			if(!gameFinished){
	 			makeMove(currentPlayer, square)
	 			checkWin(getMoves(player1))
	 			checkWin(getMoves(player2))
	 			switchTurns(player1, player2);
	 		}
 		})
 	})

 	const updateMessage = (msg) => {
 		messageP.innerText = msg
 	}

 	const setDefaultNames = (names) => {
 		if(names[0] == '') names[0] = 'XXX TRIPLE MASTER'
 		if(names[1] == '') names[1] = 'Ol` dirty O'
 	}

 	const setPlayers = () =>{
 		const playerFormInputs = document.querySelector('.form-inputs')
 		let formElements = [...playerFormInputs.elements]
 		let names = formElements.map(element => element.value)
 		setDefaultNames(names)
 		player1 = playerFactory(names[0], 'X');
 		player2 = playerFactory(names[1], 'O');
 		currentPlayer = player1;
 	}

 	const checkWin = (moves) => {
 		_winCombinations.forEach(combo => {
 			let counter = 0
 			moves.forEach(move => {
 				if(combo.includes(move)) counter++
 				if(counter == 3){
 					gameFinished = true;
 					updateMessage(`${currentPlayer.name} has won!`)
 				}
 			})
 			if(counter < 3 && gameFinished != true && gameBoard.boardArr.every(val => val != null)){
 				gameFinished = true;
 				updateMessage('It`s a tie!');
 			}
 		})
 	}

 	const switchTurns = () => {
 		if(currentPlayer == player1) currentPlayer = player2
 		else currentPlayer = player1;
 	}

	const makeMove = (currentPlayer, square) => {
		let index = square.dataset.attribute
		if(gameBoard.boardArr[index]){
			switchTurns(player1, player2);
			return
		};
		gameBoard.boardArr[index] = currentPlayer.symbol
		gameBoard.render()
	}

	const getMoves = (player) => {
		return gameBoard.boardArr.map((square, i) => {
			if(square == player.symbol) return ++i
		}).filter(obj => obj != null)
	}

	const finishGame = () => {
		gameFinished = false;
	}
	const resetcurplayer = () => {
		currentPlayer = player1
	}
	return{	setPlayers,
		  	updateMessage,
		  	finishGame,
		  	resetcurplayer,
		}
})();


const frontController = (function(){
	
 	const _controlButton = document.querySelector('#controlButton')
 	const _gameForm = document.querySelector('.playerform')
 	const _PVPButton = document.querySelector('#OneButton')
 	const _AIButton = document.querySelector('#AIbutton');
 	const inputsDiv = document.querySelector('.inputs')
 	const playerFormDiv = document.querySelector('.PVPform')
 	const _PVPStart = document.querySelector('#gameStart')
 	const _messageP = document.querySelector('#messageP')

 	_PVPStart.addEventListener('click', () => {
 		game.setPlayers();
 		_gameForm.style.opacity = 0;
 		setTimeout(() => {_gameForm.style.display = 'none'}, 350);
 	})

 	_controlButton.addEventListener('click', () => {
 		gameBoard.boardArr = [null, null, null, null, null, null, null, null, null]
 		gameBoard.resetBoard()
 		game.updateMessage(``)
 		game.resetcurplayer();
 		game.finishGame();
 	})

 	_PVPButton.addEventListener('click', () => {
 		inputsDiv.style.top = '10%'
 		playerFormDiv.style.top = '50%'
 	});
})()

gameBoard.render();
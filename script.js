
const playerFactory = (name, symbol, isAi = false) => {
	return {name, symbol, isAi};
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

const botModule = ( function () {
	const _squares = document.querySelectorAll('.square')
	const getRandomNum = () => Math.floor(Math.random() * (8 - 0 + 1));
	const getRandomLegalSquare = () => {
		let botMove = _squares[getRandomNum()]
		let botMoveIndex = botMove.dataset.attribute
		while(gameBoard.boardArr[botMoveIndex] != null){
			if(gameBoard.boardArr.every(val => val != null)) break;
			botMove = _squares[getRandomNum()]
			botMoveIndex = botMove.dataset.attribute
		}
		return botMove
	}

	return {getRandomLegalSquare};
})()

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
 				if(square.innerText != '') return // avoids clicking the same spot to get AI to move

	 			makeMove(currentPlayer, square);
	 			checkWin(getMoves(player1), player1.name)

	 			if(player2.isAi == true && !gameFinished){
	 				setTimeout(function(){
	 					makeMove(player2, botModule.getRandomLegalSquare())
	 					checkWin(getMoves(player2), player2.name)
	 				}, 250)
	 			}
	 			else{
	 				switchTurns(player1, player2)
	 				checkWin(getMoves(player2), player2.name)
	 			}		
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

 	const setPlayers = (isBot = false) =>{
 		if(!isBot){
 			const playerFormInputs = document.querySelector('.form-inputs')
	 		let formElements = [...playerFormInputs.elements]
	 		let names = formElements.map(element => element.value)
	 		setDefaultNames(names)
	 		player1 = playerFactory(names[0], 'X');
	 		player2 = playerFactory(names[1], 'O');
	 		currentPlayer = player1;
	 	}else{
	 		player1 = playerFactory('Human', 'X');
	 		player2 = playerFactory('AI', 'O', true);
	 		currentPlayer = player1;
	 	}
 		
 	}

 	const checkWin = (moves, name) => {
 		_winCombinations.forEach(combo => {
 			let counter = 0
 			moves.forEach(move => {
 				if(combo.includes(move)) counter++
 				if(counter == 3){
 					gameFinished = true;
 					updateMessage(`${name} has won!`)
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

	const fullReset = () => {
		gameBoard.boardArr = [null, null, null, null, null, null, null, null, null]
 		gameBoard.resetBoard()
 		gameFinished = false;
 		currentPlayer = player1;
 		updateMessage(``);
	}

	return{	setPlayers,
		  	updateMessage,
		  	fullReset,
		}
})();


const frontController = (function(){
	
 	const _controlButton = document.querySelector('#controlButton')
 	const _gameForm = document.querySelector('.playerform')
 	const _PVPButton = document.querySelector('#OneButton')
 	const _AIstart = document.querySelector('#AIbutton');
 	const _inputsDiv = document.querySelector('.inputs')
 	const _playerFormDiv = document.querySelector('.PVPform')
 	const _PVPStart = document.querySelector('#gameStart')
 	const _messageP = document.querySelector('#messageP')
 	const _menuBack = document.querySelector('#backToMenu')
 	const _isBot = true;

 	_AIstart.addEventListener('click', () => {
 		
 		_gameForm.style.opacity = 0;
 		setTimeout(() => {_gameForm.style.display = 'none'}, 350);
 		game.setPlayers(_isBot);
 	})
 	_menuBack.addEventListener('click', () => {
 		game.fullReset();
 		_gameForm.style.opacity = 1;
 		_gameForm.style.display = 'flex';
 		setTimeout(function(){_inputsDiv.style.top = '50%'}, 50)
 		_playerFormDiv.style.top = '200%'
 	})

 	_PVPStart.addEventListener('click', () => {
 		game.setPlayers();
 		_gameForm.style.opacity = 0;
 		setTimeout(() => {_gameForm.style.display = 'none'}, 350);
 	})

 	_controlButton.addEventListener('click', () => {
 		game.fullReset();
 	})

 	_PVPButton.addEventListener('click', () => {
 		_inputsDiv.style.top = '10%'
 		_playerFormDiv.style.top = '50%'
 	});
})()

gameBoard.render();
let cells = document.querySelectorAll('.cell')
let playerChange = document.querySelector('.playerChange')
let restart = document.querySelector('button')

let winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let options = ["", "", "", "", "", "", "", "", ""]

let runGame = false
let currentPlayer = "X"

initGame()
console.log()

function initGame() {
    
    cells.forEach(cell => cell.addEventListener('click', cellClicked))

    restart.addEventListener('click', restartGame)
    playerChange.innerText = `${currentPlayer}'s Turn`

    runGame = true
}

function cellClicked() {
    let cellIndex = this.getAttribute('cellIndex')

    console.log(cellIndex);
    
    if (options[cellIndex] != "" || !runGame) {
        return;
    }

    updateCell(this, cellIndex)
    changeTurn()
    gameWinner()
}

function updateCell(cell, index) {
    options[index] = currentPlayer
    cell.innerText = currentPlayer
}

function changeTurn() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X"

    playerChange.innerText = `${currentPlayer}'s Turn`
    console.log(playerChange);
}

function gameWinner() {
    let roundWon = false 
    
    for (let i = 0; i < winConditions.length; i++) {
        let condition = winConditions[i]
        let cellA = options[condition[0]]
        let cellB = options[condition[1]]
        let cellC = options[condition[2]]
    
        if (cellA == "" || cellB == "" || cellC == "") {
            continue
        }
        
        if (cellA == cellB && cellB == cellC) {
            roundWon = true
            break
        }
    }

    if (roundWon) {
        changeTurn()
        playerChange.innerText = `${currentPlayer} wins!`
        runGame = false
    } else if (!options.includes("")) {
        playerChange.innerText = "Draw!"
        runGame = false
    } else {
        changeTurn()
        console.log(changeTurn());
    }
    
}

function restartGame() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X"
    options = ["", "", "", "", "", "", "", "", ""]
    playerChange.innerText = `${currentPlayer}'s Turn`
    cells.forEach(cell => cell.innerText = "")
    changeTurn()
    runGame = true

    // location.reload()
}
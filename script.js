
window.addEventListener('DOMContentLoaded', () => {
})

const playerBoard = document.querySelector('.playersBoard');
const computerBoard = document.querySelector('.computerBoard');

let playerPlacedShipIdx = []
let computerPlacedShipIdx = []
let playerSquares = []
let computerSquares = []
let playerHits = 0
let computerHits = 0
let selectedShip;
let compShip;
let currentIdx;
let shipOrientation = false
let compShipOrientation = false
let placeShip = false
let playerTurn = true
let computerShipsRemaining = 5
let playerShipsRemaining = 5
let playerWins = 0
let computerWins = 0
const width = 10

const shipsArray = [{
    name: 'patrol boat',
    size: 2
}, {
    name: 'submarine',
    size: 3
}, {
    name: 'destroyer',
    size: 3
}, {
    name: 'battleship',
    size: 4
}, {
    name: 'aircraft carrier',
    size: 5
}]

let compShips = shipsArray.slice()




//create a <ul> in JS
//loop through the ships and create the <li> buttons
//attach <ul> to dom

///create boards
const makeBoards = () => {
    for (let i = 0; i < 100; i++) {

        const pGridSquare = document.createElement('div')
        pGridSquare.classList.add('pGridSquare')
        document.querySelector('.pboard').appendChild(pGridSquare)
    }

    for (let c = 0; c < 100; c++) {
        const cGridSquare = document.createElement('div')
        cGridSquare.classList.add('cGridSquare')
        document.querySelector('.cboard').appendChild(cGridSquare)
    }
}

function generateGameElements() {
    shipsArray.forEach(function (ship, index) {
        const li = document.createElement('li');
        li.innerText = ship.name;
        li.classList.add('disabled')
        li.addEventListener('click', function () {
            li.classList.add('selectedShip')
            selectedShip = ship
        });
        document.querySelector(".innerList").appendChild(li);
    });

    document.getElementById('resetButton').classList.add('disabled');
    makeBoards();
}

generateGameElements();

//player tile selected
function shipsPlaced() {
    if (playerShipsRemaining === 0) {
        document.getElementById("userPrompt").innerText = "Player Start";
    }
    // add event listener
    document.querySelectorAll('.cGridSquare').forEach(function (sq, index) {
        sq.addEventListener('click', function () {
            console.log(sq.classList);
            if (sq.classList.contains('selectedCompSquare')) {
                alert('Invalid move')
            } else {
                sq.classList.add('selectedCompSquare')
                sq.innerText = "X";
                checkForHits(sq, index)
            }
            document.getElementById("userPrompt").innerText = "";
        })
    })
}

function checkForHits(sq, index) {
    // verifies player hits
    if (playerTurn) {
        // const playerHitArray = document.querySelectorAll('selectedCompSquare')
        if (computerPlacedShipIdx.includes(index)) {
            sq.style.backgroundColor = "blue";
            playerHits++
        }

        if (playerHits === computerPlacedShipIdx.length) {
            playerWins++
            document.getElementById("playerWin").innerText = playerWins;
        }
        console.log(playerWins)
        console.log(document.getElementsByClassName("playerWin").innerText)
        playerTurn = false
        sq.removeEventListener('click', computerShot())
    } else {
        if (playerPlacedShipIdx.includes(index)) {
            console.log(playerPlacedShipIdx);
            sq.style.backgroundColor = "black";
            console.log('computerHits', computerHits);
            computerHits++
        }

        if (computerHits === playerPlacedShipIdx.length) {
            computerWins++
            document.getElementById("compWin").innerText = computerWins;
        }
        playerTurn = true
        sq.removeEventListener('click', null)
    }

}



function removeShip() {
    var btn = document.querySelector('.selectedShip')
    btn.parentNode.removeChild(btn);
    playerShipsRemaining--
    if (playerShipsRemaining === 0) {
        shipsPlaced()
    }
}

function computerShot() {
    const playableSquares = document.querySelectorAll('.pGridSquare');
    randomShot = Math.floor(Math.random() * playableSquares.length);

    while (playableSquares[randomShot].classList.contains('computerSelectedSquare')) {
        randomShot = Math.floor(Math.random() * playableSquares.length);
    };

    const randomPlacement = playableSquares[randomShot];

    randomPlacement.classList.add('computerSelectedSquare')
    randomPlacement.innerText = "X"
    checkForHits(randomPlacement, randomShot)
}
// function computerShipPlacement() {
//     compShips = compShips.filter(val => val);

//     for (let c = 0; c < compShips.length; c++) {
//         console.log('compShips[c]', compShips[c]);
//         console.log(compShips);
//         compShip = compShips[c]
//         randomStart = Math.abs(Math.floor(Math.random() * document.querySelectorAll('.cGridSquare').length));
//         compShipOrientation = Math.random() >= 0.5;
//         playerShipPlacement(randomStart, compShipOrientation)
//         compShips = compShips.slice(1);
//         console.log("array after shift", compShips);
//     }
// }
//not allowed ship index placement

//validation function with parameters idx of clicked and size of selected ship
//if/else-if statement for conditions (selectedShip size & orientation)
//variable for which indexes are not okay per size
function compareSquares(arr1, arr2, type) {
    let anyMatches = [];
    let matches;
    if (type == 'player') {
        for (let e = 0; e < playerPlacedShipIdx.length; e++) {
            if (playerPlacedShipIdx[e]) {
                for (let k = 0; k < arr2.length; k++) {
                    if (playerPlacedShipIdx[e] == arr2[k]) {
                        return true;
                    } else {
                        matches = false
                    }
                }
            }
        }
        // } else {
        //     for (let e = 0; e < computerPlacedShipIdx.length; e++) {
        //         if (computerPlacedShipIdx[e]) {
        //             for (let k = 0; k < arr2.length; k++) {
        //                 if (computerPlacedShipIdx[e] == arr2[k]) {
        //                     console.log("there's a match")
        //                     return computerShipPlacement()
        //                 } else {
        //                     matches = false
        //                 }
        //             }
        //         }
        //     }
    }

    for (let a = 0; a < arr1.length; a++) {
        if (arr1[a] && arr1[a].length > 1) {
            arr1[a].forEach(function (num) {
                for (let b = 0; b < arr2.length; b++) {
                    if (num == arr2[b]) {
                        anyMatches.push(arr2[b])
                    }
                }
            })
            if (JSON.stringify(arr1[a]) == JSON.stringify(anyMatches)) {
                return true;
            } else {
                matches = false;
            }
        } else {
            for (let j = 0; j < arr2.length; j++) {
                if (arr2[j] === arr1[a]) {
                    return true;
                }
                else {
                    matches = false;
                }
            }
        }
    }
    return matches
}

function validateGridSelection(indexes, shipType) {
    const whosOrientation = shipType == 'player' ? shipOrientation : compShipOrientation;

    if (whosOrientation == false) {
        const notAllowedVertical = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109]
        return compareSquares(notAllowedVertical, indexes, shipType)

    } else {
        const notAllowedHorizontal = [[9, 10], [19, 20], [29, 30], [39, 40], [49, 50],
        [59, 60], [69, 70], [79, 80], [89, 90], [99, 100]]
        return compareSquares(notAllowedHorizontal, indexes, shipType)
    }
}

function playerShipPlacement(idx) {
    let indexes = []
    let compIndexes = []
    //selected ship == player input
    if (selectedShip) {
        for (i = 0; i < selectedShip.size; i++) {
            if (!shipOrientation) {
                currentIdx = idx + (10 * i)
                indexes.push(currentIdx)
                compIndexes.push(currentIdx)
            } else {
                currentIdx = idx + (1 * i)
                indexes.push(currentIdx)
                compIndexes.push(currentIdx)
            }
        }
        //validate and colour, or dont
        if (!validateGridSelection(indexes, 'player')) {
            document.querySelectorAll('.pGridSquare').forEach(function (sq, index) {
                indexes.forEach(function (idx) {
                    if (index == idx) {
                        sq.classList.add('player-square')
                        playerPlacedShipIdx.push(index)
                    }
                })
            })
        } else {
            return
        } if (!validateGridSelection(compIndexes)) {
            document.querySelectorAll('.cGridSquare').forEach(function (sq, index) {
                compIndexes.forEach(function (idx) {
                    if (index == idx) {
                        sq.classList.add('comp-square')
                        computerPlacedShipIdx.push(index)
                    }
                })
            });
        }

        removeShip();
        selectedShip = null

    }

}




function startGame() {
    //on start remove all disabled classes. disable start game button
    document.querySelectorAll('.disabled').forEach(function (el) {
        el.classList.remove("disabled");
    })

    document.getElementById('resetButton').classList.remove('disabled');


    document.querySelectorAll('.pGridSquare').forEach(function (sq, index) {
        sq.addEventListener('click', function () {
            if (selectedShip) {
                playerShipPlacement(index);
            }
        })
    })

}

function resetGame() {
    playerSquares = []
    computerSquares = []
    playerPlacedShipIdx = []
    computerPlacedShipIdx = []
    playerHits = 0
    computerHits = 0
    indexes = []
    compIndexes = []
    playerTurn = true
    playerShipsRemaining = 5

    document.getElementById('pboard').innerHTML = ""
    document.getElementById('cboard').innerHTML = ""
    generateGameElements();

}


const startButton = document.getElementById('startButton')
startButton.addEventListener('click', function () {
    startGame();
})


const resetButton = document.getElementById('resetButton')
resetButton.addEventListener('click', function () {
    resetGame();
});

const rotateButton = document.getElementById('rotateShip')
rotateButton.addEventListener('click', function () {
    shipOrientation = !shipOrientation
});








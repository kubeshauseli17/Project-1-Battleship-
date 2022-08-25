window.addEventListener('DOMContentLoaded', () => {
})

const playerBoard = document.querySelector('.playersBoard');
const computerBoard = document.querySelector('.computerBoard');
const playerSquares = []
const computerSquares = []
const playerPlacedShipIdx = []
const computerPlacedShipIdx = []

let selectedShip;
let compShip;
let currentIdx;
let shipOrientation = false
let placeShip = false
let playerTurn = true
let computerShipsRemaining = 5
let playerShipsRemaining = 5

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


//create a <ul> in JS
//loop through the ships and create the <li> buttons
//attach <ul> to dom

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

//write a method that will check availability of the board

//player tile select

function removeShip() {
    var btn = document.querySelector('.selectedShip')
    console.log(btn);
    btn.parentNode.removeChild(btn);
    playerShipsRemaining--
    if (playerShipsRemaining === 0) {
        setTimeout(function () {
            alert("Start Game");
        }, 1500);
    }
    // playerSquares.push(sq);
}
//not allowed ship index placement

//validation function with parameters idx of clicked and size of selected ship
//if/else-if statement for conditions (selectedShip size & orientation)
//variable for which indexes are not okay per size
function compareSquares(arr1, arr2) {
    let multiMatches = [];

    //loop through arr2
    //if arr1[i].length > 1
    //loop through arr1 and push matches into new array
    //if new array == arr1[i] return true (matches)
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


    for (let a = 0; a < arr1.length; a++) {
        if (arr1[a] && arr1[a].length > 1) {
            arr1[a].forEach(function (num) {
                for (let b = 0; b < arr2.length; b++) {
                    if (num == arr2[b]) {
                        multiMatches.push(arr2[b])
                    }
                }
            })
            if (JSON.stringify(arr1[a]) == JSON.stringify(multiMatches)) {
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

function validateGridSelection(indexes) {




    if (shipOrientation == false) {
        const notAllowedVertical = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109]
        return compareSquares(notAllowedVertical, indexes)

    } else {
        const notAllowedHorizontal = [[9, 10], [19, 20], [29, 30], [39, 40], [49, 50],
        [59, 60], [69, 70], [79, 80], [89, 90], [99, 100]]
        return compareSquares(notAllowedHorizontal, indexes)
    }



}

function playerShipPlacement(idx) {
    let indexes = []
    let compIndexes = []
    //set up indecies to be coloured
    if (selectedShip) {
        for (i = 0; i < selectedShip.size; i++) {
            if (!shipOrientation) {
                currentIdx = idx + (10 * i)
                // console.log(currentIdx);
                indexes.push(currentIdx)
                // console.log(indexes);
            } else {
                currentIdx = idx + (1 * i)
                indexes.push(currentIdx)
            }
        }
        //validate and colour, or dont
        if (!validateGridSelection(indexes, selectedShip.size)) {
            document.querySelectorAll('.pGridSquare').forEach(function (sq, index) {
                indexes.forEach(function (idx) {
                    if (index == idx) {
                        sq.classList.add('player-square')
                        playerPlacedShipIdx.push(index)
                        console.log(playerPlacedShipIdx)
                    }
                })
            });
        } else {
            return;
        }
        removeShip();
        selectedShip = null
    } else {
        if (compShip) {
            console.log(compShip);
            for (i = 0; i < compShip.size; i++) {
                if (!shipOrientation) {
                    currentIdx = idx + (10 * i)
                    // console.log(currentIdx);
                    compIndexes.push(currentIdx)
                    // console.log(indexes);
                } else {
                    currentIdx = idx + (1 * i)
                    compIndexes.push(currentIdx)
                }
            }

            if (!validateGridSelection(compIndexes, compShip.size)) {
                document.querySelectorAll('.cGridSquare').forEach(function (sq, index) {
                    compIndexes.forEach(function (idx) {
                        if (index == idx) {
                            sq.classList.add('selectedCompSquare')
                            computerPlacedShipIdx.push(index)
                            console.log(computerPlacedShipIdx)
                        }
                    })
                });
            } else {
                return;
            }
        }
    }

}






///create boards
const makeBoards = () => {
    for (let i = 0; i < 100; i++) {

        const pGridSquare = document.createElement('div')
        pGridSquare.classList.add('pGridSquare')
        document.querySelector('.pboard').appendChild(pGridSquare)
        //pGridSquare.classList.add('player-square')
        //playerSquares.push(pGridSquare)


    }

    for (let c = 0; c < 100; c++) {
        const cGridSquare = document.createElement('div')
        cGridSquare.classList.add('cGridSquare')
        document.querySelector('.cboard').appendChild(cGridSquare)

    }



}

// computer selection function. generate's ships and randomly places them.

// function computerShipPlacement() {

// computerShips = shipsArray.slice()

// while(computerShips.length > 0) {
//     const cShip = computerShips[0]
//     cShipLength = cShip.size

// let placeShip = true

// // random number to choose ship orientation

// const randomOrientation = Math.random() >= 0.5
// randomIndex = Math.floor(Math.random() * cGridSquare.length)

// let columnIndex = (randomIndex % width)
// let rowIndex = Math.floor(randomIndex / width)

// //Vertical ship
// if (randomDirection === true) {
//     direction = 10
//     while ((rowIndex - 1 + cShipLength) >= width) {
//         randomIndex = Math.floor(Math.random() * cGridSquare.length)
//         columnIndex = (randomIndex % width)
//         rowIndex = Math.floor(randomIndex / width)
//     }
// // horizonal
// } else {
//     direction = 1
//     while ((width - columnIndex) < cShipLength) {
//         randomIndex = Math.floor(Math.random() * cGridSquare.length)
//         columnIndex = (randomIndex % width)
//       }
// }
// }
// }
// // create computer ships
// for (let i = 0; i < shipLength; i++) {
//     const nextIndex = randomIndex + i * direction
// }


//create a function to loop through board squares on click.
//for vertical add 10 for the next square. try to select next square by index.

makeBoards();

function startGame() {

    //on start remove all disabled classes. disable start game button
    document.querySelectorAll('.disabled').forEach(function (el) {
        el.classList.remove("disabled");
    })
    //hover stretch goal
    // document.querySelectorAll('.pGridSquare').forEach(function (sq) {
    //     sq.addEventListener('mouseenter', function () {
    //     })

    // })

    document.querySelectorAll('.pGridSquare').forEach(function (sq, index) {
        sq.addEventListener('click', function () {
            if (selectedShip) {
                playerShipPlacement(index);
            }
        })
    })

    document.querySelectorAll('.cGridSquare').forEach(function (sq, index) {
        sq.addEventListener('click', function () {
            // cGridSquare.classList.add('selectedCompSquare')
            // if (selectedCompSquare) {
            //     playerShot(sq, index);
            // }
        })
    })

    // user shot taking function. overlays div background with red or black circles. logs hit indexes.

    function playerShot(sq, index) {

    }



}

//after - hover event, squares and click

// render players ships on button click. mouse over diplay the cell 
// placement of the ship. append the ship there on mouseenter.


//more game buttons

const startButton = document.getElementById('startButton')
startButton.addEventListener('click', function () {
    startGame();
    shipsArray.forEach(function (ship) {
        compShip = ship;

        //loop through comp squares and then randomly select one to pass to playerShipPlacement
        //cGridSquare.classList.add('cGridSquare')
        playerShipPlacement(compShip)
    })
})

const resetButton = document.getElementById('resetButton')
resetButton.addEventListener('click', function () {
    console.log("click");
});

const rotateButton = document.getElementById('rotateShip')
rotateButton.addEventListener('click', function () {
    shipOrientation = !shipOrientation
});








window.addEventListener('DOMContentLoaded', () => {
})

const playerBoard = document.querySelector('.playersBoard');
const computerBoard = document.querySelector('.computerBoard');
//remove button const after loop works

// const patrolBoatButton = document.getElementById('patrolBoat');
// const submarineButton = document.getElementById('submarine');
// const destroyerButton = document.getElementById('destroyer');
// const battleshipButton = document.getElementById('battleship');
// const aircraftCarrierButton = document.getElementById('aircraftCarrier');

const playerSquares = []
const computerSquares = []
let selectedShip;
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
,
//validation function with parameters idx of clicked and size of selected ship
//if/else-if statement for conditions (selectedShip size & orientation)
//variable for which indexes are not o, kay per size

function validateGridSelection(idx, shipSize) {

    if (shipSize = 2 && shipOrientation == false) {
        const notAllowedVertical = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99]

    } elseif(shipSize = 2 && shipOrientation == true) {
        const notAllowedHorizontal = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99]

    } elseif(shipSize > 2 && shipOrientation == false) {
        const notAllowedVertical = [80, 90, 81, 91, 82, 92, 83, 93, 84, 94,
                                    85, 95, 86, 96, 87, 97, 88, 98, 89, 99]

    } elseif(shipSize > 2 && shipOrientation == true) {
        const notAllowedHorizontal = [8, 9, 18, 19, 28, 29, 38, 39, 48, 49,
                                      58, 59, 68, 69, 78, 79, 88, 89, 98, 99]

    } elseif(shipSize > 3 && shipOrientation == false) {
        const notAllowedVertical = [70, 80, 90, 71, 81, 91, 72, 82, 92, 73,
                                    83, 93, 74, 84, 94, 75, 85, 95, 76, 86,
                                    96, 77, 87, 97, 78, 88, 98, 79, 89, 99]

    } elseif(shipSize > 3 && shipOrientation == true) {
        const notAllowedHorizontal = [7, 8, 9, 17, 18, 19, 27, 28, 29, 37, 38,
                                      39, 47, 48, 49, 57, 58, 59, 67, 68, 69,
                                      77, 78, 79, 87, 88, 89, 97, 98, 99]

    } elseif(shipSize > 4 && shipOrientation == false) {
        const notAllowedVertical = [60, 70, 80, 90, 61, 71, 81, 91, 62, 72,
                                    82, 92, 63, 73, 83, 93, 64, 74, 84, 94,
                                    65, 75, 85, 95, 66, 76, 86, 96, 67, 77,
                                    87, 97, 68, 78, 88, 98, 69, 79, 89, 99];

    } elseif(shipSize > 4 && shipOrientation == true) {
        const notAllowedHorizontal = [6, 7, 8, 9, 16, 17, 18, 19, 26, 27, 28,
                                      29, 36, 37, 38, 39, 46, 47, 48, 49, 56,
                                      57, 58, 59, 66, 67, 68, 69, 76, 77, 78,
                                      79, 86, 87, 88, 89, 96, 97, 98, 99]
    }
}

    function playerShipPlacement(clicked, idx) {
        if (selectedShip) {
            for (i = 0; i < selectedShip.size; i++) {
                if (!shipOrientation) {
                    currentIdx = idx + (10 * i)
                    document.querySelectorAll('.pGridSquare').forEach(function (sq, index) {
                        if (index == currentIdx) {
                            sq.classList.add('player-square')
                        }
                    });

                } else {
                    currentIdx = idx + (1 * i)
                    document.querySelectorAll('.pGridSquare').forEach(function (sq, index) {
                        if (index == currentIdx) {
                            sq.classList.add('player-square')
                        }
                    });

                }

            }
            removeShip();
            selectedShip = null
        } else {
            return;
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

        document.querySelectorAll('.pGridSquare').forEach(function (sq) {
            sq.addEventListener('mouseenter', function () {
                console.log(selectedShip)
            })

        })

        document.querySelectorAll('.pGridSquare').forEach(function (sq, index) {
            sq.addEventListener('click', function () {
                if (selectedShip) {
                    sq.classList.add('player-square')
                    playerShipPlacement(sq, index);
                }

            })
        })


        //promp player to select ships


        //generate computer ship positions


    }

    //after - hover event, squares and click

    // render players ships on button click. mouse over diplay the cell 
    // placement of the ship. append the ship there on mouseenter.


    //more game buttons

    const startButton = document.getElementById('startButton')
    startButton.addEventListener('click', startGame)

    const resetButton = document.getElementById('resetButton')
    resetButton.addEventListener('click', function () {
        console.log("click");
    });

    const rotateButton = document.getElementById('rotateShip')
    rotateButton.addEventListener('click', function () {
        shipOrientation = !shipOrientation
    });








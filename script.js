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
shipOrientation = false
playerTurn = true
computerShipsRemaining = 5
playerShipsRemaining = 5
// var slides = ["slide 1", "slide 2", "slide 3", "slide 4", "slide 5"]
// var str = '<ul>'

// slides.forEach(function(slide) {
//   str += '<li>'+ slide + '</li>';
// }); 

// str += '</ul>';
// document.getElementById("slideContainer").innerHTML = str;

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

shipsArray.forEach(function (ship, index) {
    const li = document.createElement('li');
    li.innerText = ship.name;
    li.classList.add('disabled')
    li.addEventListener('click', function () {
        li.classList.add("selectedShip");
        selectedShip = ship
    });
    document.querySelector(".innerList").appendChild(li);
});

//write a method that will check availability of the board





//create a <ul> in JS
//loop through the ships and create the <li> buttons
//attach <ul> to dom

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
        // csquare.addEventListener('mouseover')
        cGridSquare.addEventListener('click', function () {
            console.log('click');
        })
    }



}

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

    document.querySelectorAll('.pGridSquare').forEach(function (sq) {
        sq.addEventListener('click', function () {
            sq.classList.add('player-square')
            playerSquares.push(sq);
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
    console.log("click");
});








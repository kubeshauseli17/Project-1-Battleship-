window.addEventListener('DOMContentLoaded', () => {
})

const playerBoard = document.querySelector('.playersBoard');
const computerBoard = document.querySelector('.computerBoard')

///create boards
const makeBoards = () => {
    for (let i = 0; i < 100; i++) {

        const square = document.createElement('div')
        square.classList.add('square')
        document.querySelector('.pboard').appendChild(square)
    }

    for (let c = 0; c < 100; c++) {
        const csquare = document.createElement('div')
        csquare.classList.add('csquare')
        document.querySelector('.cboard').appendChild(csquare)
    }
}

makeBoards();

//move logic
    //player move

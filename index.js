const boardWidth = 480;
const boardHeight = 640;
const arrowSize = 80;
document.body.style.setProperty('--board-width', `${boardWidth}px`);
document.body.style.setProperty('--board-height', `${boardHeight}px`);
document.body.style.setProperty('--arrow-size', `${arrowSize}px`);

const board = document.getElementById('board');
const upArrow = document.getElementById('up-arrow');
const rightArrow = document.getElementById('right-arrow');
const displayCounter = document.getElementById("counter")

const arrows = ['top','bottom', 'right', 'left']
const arrowStates = arrows.reduce((obj, name) => {
    return {
        ...obj,
        [name]:{
            position: 0,
            speed: Math.round(Math.random() * 10)
        }
    }
})
console.log('arrowStates:', arrowStates  )


const game = {
    upArrowPosition: 0,
    rightArrowPosition: 0,
}

function renderBoard() {
    arrows.forEach( name => {
        const arrow = document.getElementById(`${name}-arrow`);
        arrow.style.bottom = `${arrowStates[name].position}px`
    })
}

function gameLoop() {
    arrows.map( arrowName => {
        const arrowState = arrowStates[arrowName]
        arrowState.position += arrowState.speed

        if(arrowState.position >= boardHeight){
            arrowState.position = 0
        }
    })

    renderBoard();
}

let counter = 0
const acceptableVariance = 30
const goalHeight = boardHeight - arrowSize
const bottomAcceptableHeight = goalHeight - acceptableVariance
const topAcceptableHeigth = goalHeight + acceptableVariance


document.body.addEventListener("keyup", (e) => {
    arrows.forEach(arrowName => {

    })

    const keyPressed = e.key
    if(keyPressed === "ArrowUp"){
        const aboveAcceptableHeight =   game.upArrowPosition > bottomAcceptableHeight
        const belowAcceptableHeight =    game.upArrowPosition < topAcceptableHeigth

        if(aboveAcceptableHeight && belowAcceptableHeight){
            counter += 1
            console.log('counter:', counter  )
        }else{
            counter = 0
        }
        displayCounter.innerText = counter
        game.upArrowPosition = 0
    }
})

renderBoard();
setInterval(gameLoop, 16);

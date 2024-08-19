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

const game = {
    upArrowPosition: 0,
    rightArrowPosition: 0,
}

function renderBoard() {
    upArrow.style.bottom = `${game.upArrowPosition}px`;
    rightArrow.style.bottom = `${game.rightArrowPosition}px`;
}

function gameLoop() {
    game.upArrowPosition += 5;
    game.rightArrowPosition += 3;
    if(game.upArrowPosition >= boardHeight){
        game.upArrowPosition = 0
    }

    if(game.rightArrowPosition >= boardHeight){
        game.rightArrowPosition = 0
    }
    renderBoard();
}

let counter = 0
const acceptableVariance = 30
const goalHeight = boardHeight - arrowSize
const bottomAcceptableHeight = goalHeight - acceptableVariance
const topAcceptableHeigth = goalHeight + acceptableVariance


document.body.addEventListener("keyup", (e) => {
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

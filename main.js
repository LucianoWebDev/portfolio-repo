//! JavaScrip Snippet #1 'Hello World' /
document.getElementById('btnHW').addEventListener('click', function () {
    document.getElementById('valueHW').innerHTML = 'Hello, World!'
})

//! JavaScript Snippet # 'Leap Yeaer' */
document.getElementById('btnLY').addEventListener('click', function () {
    let isLeapYear
    let year = document.getElementById('valueLY').value
    isLeapYear = year % 4 == 0 && (year % 100 !== 0 || year % 400 == 0)
    if (year === '') {
        document.getElementById('resultLY').innerHTML = 'Choose a year!'
    } else if (isLeapYear) {
        document.getElementById('resultLY').innerHTML = 'Yes, it is 🎉'
    } else {
        document.getElementById('resultLY').innerHTML = 'Nope, try an other one'
    }
})

//! JavaScript Snippet #3 'Armstrong Numbers' */
document.getElementById('btnAN').addEventListener('click', function () {
    let nuAN = document.getElementById('valueAN').value

    let add = String(nuAN).split('').map(Number)
    let sum = 0

    for (let i = 0; i < add.length; i++) {
        sum = sum + Math.pow(add[i], add.length)
    }

    if (nuAN === '') {
        document.getElementById('resultAN').innerHTML = 'Insert a number.. 🙄'
    } else if (nuAN == sum) {
        if (sum < 10) {
            document.getElementById('resultAN').innerHTML =
                "All numbers < 10 are 'armstrong numbers'. Try a higher one ⏫"
        } else {
            document.getElementById('resultAN').innerHTML =
                "This is an 'armstrong number' 🥳"
        }
    } else {
        document.getElementById('resultAN').innerHTML =
            "Nope, no 'armstrong number' here 🚫"
    }
})

//! JavaScript Snippet #4 Color Guessing Game
var numSquares = 6
var colors = []
var pickedColor
var squares = document.querySelectorAll('.square')
var colorDisplay = document.getElementById('colorDisplay')
var messageDisplay = document.querySelector('#message')
var h1 = document.querySelector('#hOne')
var resetButton = document.querySelector('#reset')
var modeButtons = document.querySelectorAll('.mode')

init()

function init() {
    //mode buttons event listeners
    setupModeButtons()
    setupSquares()
    reset()
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function () {
            modeButtons[0].classList.remove('selected')
            modeButtons[1].classList.remove('selected')
            this.classList.add('selected')

            this.textContent === 'Easy' ? (numSquares = 3) : (numSquares = 6)

            reset()
        })
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        //add click listeners to squares
        squares[i].addEventListener('click', function () {
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor
            //compare color to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = 'Correct 🌈🙌'
                resetButton.textContent = 'Play Again?'
                changeColors(clickedColor)
                h1.style.backgroundColor = clickedColor
                document.querySelector('.cgText').remove()
            } else {
                this.style.backgroundColor = '#232323'
                messageDisplay.textContent = 'Try Again 👀'
                document.querySelector('.cgText').remove()
            }
        })
    }
}

function reset() {
    colors = generateRandomColors(numSquares)
    //pick new random color from arr
    pickedColor = pickColor()
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor
    resetButton.textContent = 'New Colors'
    messageDisplay.textContent = ''
    //change colors of squares
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = 'block'
            squares[i].style.backgroundColor = colors[i]
        } else {
            squares[i].style.display = 'none'
        }
        squares[i].style.backgroundColor = colors[i]
    }
    h1.style.backgroundColor = 'rgb(95, 0, 173)'
}

resetButton.addEventListener('click', function () {
    reset()
})

function changeColors(color) {
    //loop through all sqauares
    for (var i = 0; i < colors.length; i++) {
        //change each color to match given color
        squares[i].style.backgroundColor = color
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * +colors.length)
    return colors[random]
}

function generateRandomColors(num) {
    //make an array
    var arr = []
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random color an push into arr
        arr.push(randomColor())
    }
    //return that array
    return arr
}

function randomColor() {
    //pick a 'red' from 0 to 255
    var r = Math.floor(Math.random() * 256)
    //pick a 'gree' from 0 to 255
    var g = Math.floor(Math.random() * 256)
    //pick a 'blue' from 0 to 255
    var b = Math.floor(Math.random() * 256)
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
}

//! 'Hidden' Dice Game */
var scores, roundScore, activePlayer, gamePlaying

initDice()

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1

        //2. Display the result
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block'
        diceDOM.src = 'dice-' + dice + '.png'

        //3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            //Add score
            roundScore += dice
            document.querySelector(
                '#current-' + activePlayer
            ).textContent = roundScore
        } else {
            //Next player
            nextPlayer()
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent =
            scores[activePlayer]

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent =
                'Winner!'
            document.querySelector('.dice').style.display = 'none'
            document
                .querySelector('.player-' + activePlayer + '-panel')
                .classList.add('winner')
            document
                .querySelector('.player-' + activePlayer + '-panel')
                .classList.remove('active')
            gamePlaying = false
        } else {
            //Next player
            nextPlayer()
        }
    }
})

function nextPlayer() {
    //Next player
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0)
    roundScore = 0

    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none'
}

document.querySelector('.btn-new').addEventListener('click', initDice)

function initDice() {
    scores = [0, 0]
    activePlayer = 0
    roundScore = 0
    gamePlaying = true

    document.querySelector('.dice').style.display = 'none'

    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
}

/*
 * Create a list that holds all of your cards
 */
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Object for global variables , to prevent loose window variables conflicts
var globalVariables = {
    seconds: 0,
    minutes: 0,
    hours: 0,
    counter: 0
};

let appendMinutes = document.querySelector('.timer .minutes');
let appendSeconds = document.querySelector('.timer .seconds');

var clockObject = {
    timer: null,
    displayTimer: function displayTimer() {
        var seconds = globalVariables.seconds++;
        var minutes = globalVariables.minutes;
        var hours = globalVariables.hours;
        
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        //append the timer
        appendSeconds.innerText = seconds;
        appendMinutes.innerText = minutes;

    }, // display timer
    startTimer: function startTimer() {
        this.timer = setInterval(this.displayTimer, 1000);
    },
    stopTimer: function stopTimer() {
        clearInterval(this.timer);
    },
    resetTimer: function resetTimer() {
        appendSeconds.innerText = "";
        appendMinutes.innerText = "";
    }
};

let symbols = [
    'fa fa-diamond',
    'fa fa-paper-plane-o',
    'fa fa-cube', 'fa fa-anchor',
    'fa fa-leaf',
    'fa fa-bicycle',
    'fa fa-bomb',
    'fa fa-bolt'
];

let cards = symbols.concat(symbols);

var initGame = function () {
    var shuffleCards = shuffle(cards);
    shuffleCards.forEach(function (card) {
        var deck = document.querySelector('.deck');
        var createEl = document.createElement('li');
        var subEl = document.createElement('i');
        subEl.setAttribute('class', card);
        createEl.appendChild(subEl);
        createEl.classList.add('card');
        createEl.setAttribute('data-match', card);
        deck.appendChild(createEl);
    });
};

initGame();

// Bind Event to List Items
function activateCards() {
    var el = document.querySelectorAll('.card');
    var openCards = [];
    var initializeTimer = false;
    var numOfMatch = 0;
    el.forEach(function (card) {
        card.addEventListener('click', function (e) {

            if (initializeTimer === false) {
                // set timer on first click
                initializeTimer = true;
                clockObject.startTimer();
            }
    
            card.classList.add('open', 'show');

            //disable click on open card
            if (e.srcElement.className == 'card open show') {
                e.srcElement.setAttribute('style', 'pointer-events: none;');
            }
            
            openCards.push(card);

            if (openCards.length == 2) {
                compareCards(openCards[0], openCards[1]);
                updateCount(globalVariables.counter);
                openCards = [];
            }

            if (card.classList.contains('match')) {
                numOfMatch += 1;
                if (numOfMatch == 8) {
                    displaySuccessMsg();
                    clockObject.stopTimer();
                    clockObject.resetTimer();
                }
            }
            // Update player rating based on number of moves
            playerRatings();
        });
    });
}

activateCards();

function compareCards(cardA, cardB) {
    if (cardA.dataset.match === cardB.dataset.match) {
        cardA.classList.add('match');
        cardB.classList.add('match');
    } else { resetMatch(cardA, cardB); }
    globalVariables.counter++;
}

function updateCount(counter) {
    var count = counter || 0;
    var moves = document.querySelector('.moves');
    moves.textContent = count;
}

function resetMatch(cardA, cardB) {
    setTimeout(function () {
        cardA.classList.remove('open', 'show');
        cardB.classList.remove('open', 'show');
        cardA.removeAttribute('style');
        cardB.removeAttribute('style');
    }, 350);
}

function displaySuccessMsg() {
    var $modal = document.querySelector('.modal');
    var $close = document.querySelectorAll('.modal .close');
    // Get { time } && { minutes }
    var minutes = document.querySelector('.minutes');
    var seconds = document.querySelector('.seconds');
    var timePlayed = `${minutes.innerText} M : ${seconds.innerText} S`;

    var appendModalTime = document.querySelector('.modal .modal-time');
    appendModalTime.innerText = timePlayed;

    $modal.classList.add('show');

    function hideModal(e) {
        $modal.classList.remove('show');
    }
    
    $close.forEach(function (item) {
        item.addEventListener('click', hideModal);
    });

    clearGame();
}

function playerRatings() {
    var element = document.querySelector('.score-panel .stars');
    var modal_rating = document.querySelector('.modal-rating');
        
    if (globalVariables.counter == 5) {
        element.firstElementChild.setAttribute('style','display: none;');
        modal_rating.innerText = 'Average Player';

    } else if (globalVariables.counter == 10) {
        element.removeChild(element.firstChild);
        modal_rating.innerText = 'Fair Player';
    }
}

function clearGame() {
    //TODO: I was writing a function to clear the game,then i realized i could just reload the page  basically of too many logics :)
    /*var deck = document.querySelector('.deck');
    var cardList = document.querySelectorAll('.card');
    cardList.forEach(function (item) {
        deck.removeChild(item);
    });
    initGame();
    activateCards();
    playerRatings()
    clockObject.stopTimer();
    clockObject.resetTimer();

    // reset global variables
    for (var time in globalVariables) {
        console.log(globalVariables[time] = 0);
    }*/

    // just reload the page :) 
    var restart = document.querySelectorAll('.restart');
    restart.forEach(function (item) { 
        item.addEventListener('click', function () {
            window.location.reload();
        });
    });
    

}
clearGame();

// run JS !!!
console.log('Matching Game ...');
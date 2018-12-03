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


var cards = [
    'fa fa-diamond', 'fa fa-diamond',
    'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
    'fa fa-bolt', 'fa fa-bolt',
    'fa fa-cube', 'fa fa-cube',
    'fa fa-anchor', 'fa fa-anchor',
    'fa fa-leaf', 'fa fa-leaf',
    'fa fa-bomb', 'fa fa-bomb',
    'fa fa-bicycle','fa fa-bicycle'
];

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

var cards = document.querySelectorAll('.card');
var openCards = [];
var counter = 0;

// Bind Event to List Items
function activateCards() {
    var numOfMatch = 0;
    cards.forEach(function (card) {
        card.addEventListener('click', function (e) {
            card.classList.add('open', 'show');
            openCards.push(card);
            if (openCards.length == 2) {
                compareCards(openCards[0], openCards[1]);
                updateCount(counter);
                openCards = [];
            }
            if (card.classList.contains('match')) {
                numOfMatch += 1;
                if (numOfMatch == 8) {
                    // var deck = document.querySelector('.deck');
                    // deck.classList.add('all-matched');
                    displaySuccessMsg();
                }
            }
        }); 
    });
}

activateCards();
clearGame();

function compareCards(cardA, cardB) {
    if (cardA.dataset.match === cardB.dataset.match) {
        cardA.classList.add('match');
        cardB.classList.add('match');
    } else { resetMatch(cardA, cardB); }
    counter++;
    console.log(counter);
}

function updateCount(counter) {
    var count = counter;
    var moves = document.querySelector('.moves');
    moves.textContent = count;
}
function resetMatch(cardA, cardB) {
    setTimeout(function () {
        cardA.classList.remove('open', 'show');
        cardB.classList.remove('open', 'show');
    }, 350);
}

function clearGame() {
    var revertCards = document.querySelectorAll('.match');
    var replay = document.querySelector('.restart');
    revertCards.forEach(function (revertCard) {
        revertCard.classList.remove('open','show','match');
    }); 
    replay.addEventListener('click', function () {
        clearGame();
    });
    updateCount(0);
}

function displaySuccessMsg() {
    var $modal = document.querySelector('.modal');
    var $close = document.querySelector('.modal .close');
    $modal.classList.add('show');
    $close.addEventListener('click', function (e) {
        $modal.classList.remove('show');
    });
    clearGame();
}

// list of open cards
console.log('Matching Game ...');
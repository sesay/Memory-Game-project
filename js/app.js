/*
 * Create a list that holds all of your cards
 */
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
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

var cards = document.querySelectorAll('.card');
var openCards = [];

// Bind Event to List Items
function activateCards() {
    cards.forEach(function (card) {
        card.addEventListener('click', function (e) {
            card.classList.add('open', 'show');
            openCards.push(card);
            if (openCards.length == 2) {
                compareCards(openCards[0], openCards[1]);
                openCards = [];
            }
        });
    });
}

activateCards();

function compareCards(cardA, cardB) {
    if (cardA.dataset.match === cardB.dataset.match) {
        cardA.classList.add('match');
        cardB.classList.add('match');
    } else { resetMatch(cardA, cardB); }
}

function resetMatch(cardA, cardB) {
    setTimeout(function () {
        cardA.classList.remove('open', 'show');
        cardB.classList.remove('open', 'show');
    }, 350);
}


// list of open cards
console.log('Matching Game ...');
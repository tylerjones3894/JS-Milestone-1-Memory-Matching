const cards = document.querySelectorAll('.memoryCard');
const resultDisplay = document.querySelector('#result')

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    } 
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch()
}

function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards()

        resultDisplay.innerHTML = 'Its a match!';

        setTimeout(() => {
            resultDisplay.innerHTML = '';
        }, 2000);
        
    } else {
        unflipCards()
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard()
        }, 1500);

        resultDisplay.innerHTML = 'Not a match:(';

        setTimeout(() => {
            resultDisplay.innerHTML = '';
        }, 2000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard))

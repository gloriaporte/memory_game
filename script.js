const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let goals = 0;
const reset = document.querySelector('.card-button');

function flipCard() {

    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('active');
    this.classList.add('flip');

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMath();
}

function checkForMath() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        goals++;

        if(goals == 6) {
            reset.classList.remove('hidden');
        }

        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('no-click');
    secondCard.classList.add('no-click');

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
    }, 1500);

}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [false, false];
}

//Função sendo invocada
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});



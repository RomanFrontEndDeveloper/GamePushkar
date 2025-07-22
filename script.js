const totalCards = 9
const winningIndex = Math.floor(Math.random() * totalCards) + 1
const retryButton = document.getElementById('retry-button')
const resultMessage = document.getElementById('result-message')

const buttonTexts = [
  'На офісі',
  'В ломбарді',
  'В мами обідає',
  'В нотаріуса',
  'Жере хот-дога',
  'На показі кв',
  'Пє пиво дома',
  'Миє Rogue',
  'В епіцентрі',
]

const cards = []
for (let i = 1; i <= totalCards; i++) {
  const isWinning = i === winningIndex
  const label = buttonTexts[i - 1]
  cards.push(new LotteryCard(i, isWinning, label))
}

function LotteryCard(index, isWinning, label) {
  this.index = index
  this.isWinning = isWinning
  this.label = label
  this.handleTry = function (attempt, square) {
    if (this.isWinning) {
      square.classList.add('square-correct')
      resultMessage.style.display = 'block'
      resultMessage.classList.remove('text-danger')
      resultMessage.classList.add('text-success')
      resultMessage.textContent =
        'Ви виграли 100$. Пушкар зв’яжеться з вами протягом доби!'
      retryButton.style.display = 'inline-block'
      disableAllSquares()
    } else {
      square.classList.add('square-wrong')
      if (attempt === 3) {
        resultMessage.style.display = 'block'
        resultMessage.classList.remove('text-success')
        resultMessage.classList.add('text-danger')
        resultMessage.textContent = 'Ви програли і винні Пушкарю 100 грн!'
        retryButton.style.display = 'inline-block'
        disableAllSquares()
        highlightWinningSquare()
      } else {
        alert('Неправильна відповідь! Спробуйте ще!')
      }
    }
  }
}

function renderSquares(squares) {
  let attempt = 0
  const squareContainer = document.querySelector('.squares-container')
  squares.forEach((item) => {
    const square = document.createElement('div')
    const squareText = document.createElement('h6')
    squareText.innerHTML = item.label
    square.appendChild(squareText)
    square.classList.add('square')
    square.addEventListener('click', function handleClick() {
      item.handleTry(++attempt, square)
      square.removeEventListener('click', handleClick)
    })
    squareContainer.appendChild(square)
  })
}

function disableAllSquares() {
  const allSquares = document.querySelectorAll('.square')
  allSquares.forEach((sq) => {
    sq.style.pointerEvents = 'none'
  })
}

function highlightWinningSquare() {
  const allSquares = document.querySelectorAll('.square')
  allSquares.forEach((sq) => {
    if (sq.textContent === buttonTexts[winningIndex - 1]) {
      sq.classList.add('square-correct')
    }
  })
}

retryButton.addEventListener('click', () => {
  location.reload()
})

renderSquares(cards)

/* eslint-disable quotes */
/* eslint-disable brace-style */
/* eslint-disable keyword-spacing */
/* eslint-disable semi-spacing */
/* eslint-disable space-infix-ops */
/* eslint-disable no-const-assign */
/* eslint-disable no-empty */
/* eslint-disable padded-blocks */
/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
/* eslint-disable space-before-blocks */
/* eslint-disable spaced-comment */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
import './style.css'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const BLOCK_SIZE = 25
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 30
const $core = document.querySelector('span')
const maxScoreTxt = document.getElementById('best-score')

let start = false
let score = 0
let maxScore

let pause = false


const board = [
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]


canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)


const piece = {
  position: { x: 5, y: 5 },
  shape: [[1, 1], [1, 1]]
}



const PIECES = 
[
  [
    [1, 1],
    [1, 1]
  ], 
  [
    [1, 1, 1, 1]
  ],
  [
    [0, 1, 0],
    [1, 1, 1]
  ],
  [
    [1, 1, 0],
    [0, 1, 1]
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1]
  ]
]

let dropCounter = 0
let lastTime = 0


function update(time = 0){
 if(pause===false && start===true){

  pauseTxt.remove()

  const deltaTime = time - lastTime
  lastTime = time
  dropCounter += deltaTime

  if(dropCounter > 1000){
    piece.position.y++
    dropCounter=0
  }

  if(checkCollision()){
    piece.position.y--
    solidifyPiece()
    removeRows()
  }
  muteAudio()
  draw()
  window.requestAnimationFrame(update)
 }
 else if(pause===true && start ===true){
  muteAudio()
  const div1 = document.getElementById('pause')
  div1.append(pauseTxt)
  window.cancelAnimationFrame(update)
 }
 else if(pause=== true && start=== false){
  muteAudio()
  window.cancelAnimationFrame(update)
 }
  
 
  }



function draw(){
  context.fillStyle = ' #212529'
  context.fillRect(0, 0, canvas.width, canvas.height)
  
  board.forEach((row, y) => {
    row.forEach((value, x) => {
        if (value === 1){
          context.fillStyle = '#59b4ff'
          context.fillRect(x, y, 1, 1)
        }
    })
  })

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value){
        context.fillStyle = '#bce1ff'
        context.fillRect(x+piece.position.x, y+piece.position.y, 1, 1)
      }
    })
  })

  $core.innerText = score

}

document.addEventListener('keydown', event => {
  if(event.key === 'ArrowLeft' && !pause) {
    piece.position.x--
    
    if(checkCollision()){
      piece.position.x++
    }
  }
  if(event.key === 'ArrowRight' && !pause && start){
    piece.position.x++
    if(checkCollision()){
      piece.position.x--
    }
  }
  if(event.key === 'ArrowDown' && !pause && start){
    piece.position.y++
    
    if(checkCollision()){
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
  }
  if(event.key === 'ArrowUp' && !pause && start){
    const rotated = []

    for(let i=0;i<piece.shape[0].length;i++){
      const row = []

      for(let j= piece.shape.length-1;j>=0;j--){
        row.push(piece.shape[j][i])
      }

      rotated.push(row)
    }

    
    const previousShape = piece.shape
    piece.shape = rotated
    if(checkCollision()){
      piece.shape = previousShape
    }

    

  }

  if(event.key === 'p'){
    
    if(pause) {
      pause = false
      
      window.requestAnimationFrame(update)
    }
    else {
      window.cancelAnimationFrame(update)
      pause = true
      
    }
  }

  if(event.key === 'm') {
    if(!muted){
      muted=true
    }else{
      muted= false
    }
  }
})



function checkCollision(){
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 && 
        board[y + piece.position.y]?.[x + piece.position.x] !== 0
      )
    })
  })
}

function solidifyPiece(){
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value===1){
        board[y+piece.position.y][x+piece.position.x] = 1
      }
    })
  })

 
  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]

 
  piece.position.x= Math.floor(BOARD_WIDTH/2-2)
  piece.position.y=0

  //game over
  if(checkCollision()){
   
    sectionGameOver.appendChild(sectionBtn)
    sectionBtn.innerText = `Game over puntuacion: ${score}`
    window.cancelAnimationFrame(update)
    start=false
    audio.pause()
    audio.currentTime=0
    div.appendChild(sectionGameOver)
    guardarScore()
    board.forEach((row) => row.fill(0))
    
  }
}

function removeRows(){
  const rowsToRemove = []

  board.forEach((row, y) => {
    if(row.every(value => value === 1)){
      rowsToRemove.push(y)
    }
  })

  rowsToRemove.forEach(y => {
    board.splice(y, 1)
    const newRow = Array(BOARD_WIDTH).fill(0)
    board.unshift(newRow)
    score += 10
  })

}


function muteAudio(){
  if(muted){
    audio.muted=true
  }else{
    audio.muted=false
  }
}


const startBtn = document.getElementById('start')
const startSec = document.getElementById('startSection')
const div = document.getElementById('game-over')
const sectionGameOver = document.createElement('section')
const sectionBtn = document.createElement('button')
sectionBtn.className = 'btn'
const pauseTxt = document.createElement('h1')
pauseTxt.innerText = 'PAUSE'
const pauseBtn = document.getElementById('pauseBtn')
//mute
const muteBtn = document.getElementById('muteBtn')
const audio = new window.Audio('./Tetris.mp3')
let muted = false

//high score
const sectionHighScore = document.createElement('section')
maxScore = window.localStorage.getItem('maxScore') 
const name = window.localStorage.getItem('name')
if(name!==null){ maxScoreTxt.innerText = `Maxima puntuacion:\n ${name} : ${maxScore}` } 
else { maxScoreTxt.innerText= 'Maxima puntuacion:' }
const form = document.createElement('form')
const input = document.createElement('input')
input.className='form-control form-control-sm'
input.type='text'
form.appendChild(input)


startBtn.addEventListener('click', () => {
  
  startSec.remove()
  start= true
  //window.localStorage.clear()
  update()
  audio.loop= true
  audio.volume = 0.5
  audio.play()
})

sectionBtn.addEventListener('click', () => {
    sectionGameOver.remove()
    score= 0
    const divApp = document.getElementById('app')
    divApp.appendChild(startSec)
  
  })



muteBtn.addEventListener('click', () => {
  
  if(!muted){
    muted=true
  }else{
    muted= false
  }
  
})

pauseBtn.addEventListener('click', () => {
  if(!pause){
    window.cancelAnimationFrame(update)
    pause=true
  }else{
    window.requestAnimationFrame(update)
    pause=false
    console.log(pause)
  }
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const inputValue = input.value
  if(inputValue.length>12){
    window.alert('el nombre no puede superar los 12 caracteres')
    return
  }
  
  window.localStorage.setItem('name', inputValue)
  sectionHighScore.remove()
  window.location.reload()

})

function guardarScore(){
  if(score > maxScore){
    
    const h1 = document.createElement('h1')
    h1.innerText= '¡Maxima puntuacion superada! Escribe tu nombre'
    sectionHighScore.appendChild(h1)
    sectionHighScore.appendChild(form)
    const divApp = document.getElementById('app')
    divApp.appendChild(sectionHighScore)
    maxScore = score
    window.localStorage.setItem('maxScore', maxScore)
  }
}





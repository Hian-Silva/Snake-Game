const drop = document.querySelector('.drop')
window.onload = function() {
  var stage = document.getElementById('stage')
  var ctx = stage.getContext("2d")
  const score = document.querySelector('h2')
  const botao = document.querySelector('button')
  const text = document.querySelector('.text')
  const death = new Audio('../../public/sound/fail.wav')
  const crunch = new Audio('../../public/sound/crunch.wav')
  document.addEventListener("keydown", keyPush)

  setInterval(game, 80)

  const vel = 1
  var vx = vy = 0
  var px = 10
  var py = 10
  var tp = 30
  var qp = 20
  var ax = 15
  var ay = 10

  var trail = []
  tail = 5
  function game() {
    px += vx
    py += vy
    if (px < 0) {
      px = qp - 1
    }
    if (px > qp - 1) {
      px = 0
    }
    if (py < 0) {
      py = qp - 1
    }
    if (py > qp - 1) {
      py = 0
    }
    //background
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, stage.width, stage.height)
    //maçã
    ctx.fillStyle = "red"
    ctx.fillRect(ax * tp, ay * tp, tp, tp)
    //cobra
    ctx.fillStyle = "#04B45F"
    for (var i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp, tp)
      if(vx != 0 || vy != 0){
        if (trail[i].x == px && trail[i].y == py) {
          death.play()
          text.innerHTML = 'GameOver!'
          score.innerHTML = 'Score: ' + (tail - 5)
          botao.innerHTML = 'Restart'
          drop.style.display = 'flex'
          vx = vy = 0
          px = py = 10
          ay = ax = 15
          tail = 5
        }
      }

    }

    trail.push({ x: px, y: py })
    while (trail.length > tail) {
      trail.shift()
    }
    if (ax == px && ay == py) {
      crunch.play()
      tail++
      ax = Math.floor(Math.random() * qp)
      ay = Math.floor(Math.random() * qp)
    }
  }
  function keyPush(event) {
    switch (event.keyCode) {
      case 37: //esquerda
        vx = -vel
        vy = 0
        break

      case 38: //cima
        vx = 0
        vy = -vel
        break

      case 39: //direita
        vx = vel
        vy = 0
        break

      case 40: //baixo
        vx = 0
        vy = vel
        break

      default:
        break
    }
  }
}
function botao() {
  drop.style.display = 'none'
}

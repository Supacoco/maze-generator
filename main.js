class Cell {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.visited = false
    this.walls = [true, true, true, true]
  }

  draw () {
    context.strokeStyle = 'pink'
    context.fillStyle = '#333'
   
    if (this.visited) {
      context.fillStyle = 'purple'
    }

    context.fillRect(this.x, this.y, RESOLUTION, RESOLUTION)
    
    if (this.walls[0]) {
      context.beginPath()
      context.moveTo(this.x, this.y)
      context.lineTo(this.x + RESOLUTION, this.y)
      context.stroke();
    }

    if (this.walls[1]) {
      context.beginPath()
      context.moveTo(this.x + RESOLUTION, this.y)
      context.lineTo(this.x + RESOLUTION, this.y + RESOLUTION)
      context.stroke();
    }

    if (this.walls[2]) {
      context.beginPath()
      context.moveTo(this.x, this.y + RESOLUTION)
      context.lineTo(this.x + RESOLUTION, this.y + RESOLUTION)
      context.stroke();
    }

    if (this.walls[3]) {
      context.beginPath()
      context.moveTo(this.x, this.y)
      context.lineTo(this.x, this.y + RESOLUTION)
      context.stroke();
    }
  }

  getUnvisitedNeighbour () {
    const neighbours = []
    const x = this.x / RESOLUTION
    const y = this.y / RESOLUTION
  
    const top = grid[getIndex(x, y - 1)]
    const right = grid[getIndex(x + 1, y)]
    const bottom = grid[getIndex(x, y + 1)]
    const left = grid[getIndex(x - 1, y)]
  
    if (top && !top.visited) {
      neighbours.push(top)
    }
    
    if (right && !right.visited) {
      neighbours.push(right)
    }
  
    if (bottom && !bottom.visited) {
      neighbours.push(bottom)
    }
  
    if (left && !left.visited) {
      neighbours.push(left)
    }
  
    return neighbours[Math.floor(Math.random() * neighbours.length)]
  }

  highlight () {
    context.fillStyle = 'blue'
    context.fillRect(this.x, this.y, RESOLUTION, RESOLUTION)
  }
}

const WIDTH = 400
const HEIGHT = 400
const RESOLUTION = 10

const COLS = WIDTH / RESOLUTION
const ROWS = HEIGHT / RESOLUTION

let context
let current

const cells = (WIDTH / RESOLUTION) * (HEIGHT / RESOLUTION)
const grid = new Array(cells)
const stack = []

const setup = () => {
  const canvas = document.createElement('canvas')
  canvas.width = WIDTH
  canvas.height = HEIGHT

  context = canvas.getContext('2d')

  document.getElementById('root').appendChild(canvas)

  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      grid[getIndex(i, j)] = new Cell(i * RESOLUTION, j * RESOLUTION)
    }
  }

  current = grid[0]
  current.visited = true
}

const getIndex = (x, y) => {
  if (x < 0 || y < 0 || x > COLS - 1 || y > ROWS - 1) {
    return -1
  }
  return y * COLS + x
}

const removeWalls = (a, b) => {
  const x = a.x / RESOLUTION - b.x / RESOLUTION
  const y = a.y / RESOLUTION - b.y / RESOLUTION

  if (x === 1) {
    a.walls[3] = false
    b.walls[1] = false
  } else if (x === -1) {
    a.walls[1] = false
    b.walls[3] = false
  }

  if (y === 1) {
    a.walls[0] = false
    b.walls[2] = false
  } else if (y === -1) {
    a.walls[2] = false
    b.walls[0] = false
  }
}

const draw = () => {
  const next = current.getUnvisitedNeighbour()
  
  grid.forEach(cell => cell.draw())
  current.highlight()

  if (next) {
    next.visited = true
    stack.push(current)

    removeWalls(current, next)
    
    current = next
  } else if (stack.length) {
    current = stack.pop()
  }
}

setup()
setInterval(draw, 16)

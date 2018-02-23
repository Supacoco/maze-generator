const WIDTH = 1200
const HEIGHT = 800
const RESOLUTION = 40

const COLS = WIDTH / RESOLUTION
const ROWS = HEIGHT / RESOLUTION

let context
let previous
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
      grid[getIndex(i, j)] = new Cell(i * RESOLUTION, j * RESOLUTION, RESOLUTION)
    }
  }

  grid.forEach(cell => cell.draw(context))

  current = grid[0]
  current.visited = true
}

const getIndex = (x, y) => {
  if (x < 0 || y < 0 || x > COLS - 1 || y > ROWS - 1) {
    return -1
  }
  return y * COLS + x
}

const draw = () => {
  const next = current.getUnvisitedNeighbour()
  
  if (previous) {
    previous.draw(context)
  }

  if (next) {
    next.visited = true
    stack.push(current)

    current.removeWalls(next)
    next.removeWalls(current, true)

    previous = current
    current = next
  } else if (stack.length) {
    current.draw(context)
    previous = current
    current = stack.pop()
    current.draw(context, true)
  }
}

const drawOneShot = () => {
  let next
  do {
    next = current.getUnvisitedNeighbour()

    if (next) {
      next.visited = true
      stack.push(current)

      current.removeWalls(next)
      next.removeWalls(current)

      previous = current
      current = next
    } else if (stack.length) {
      previous = current
      current = stack.pop()
    }
  } while (next || stack.length)

  grid.forEach(cell => cell.draw(context))
}

setup()
// setInterval(draw, 128)
drawOneShot()
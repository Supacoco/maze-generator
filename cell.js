class Cell {
  constructor (x, y, width) {
    this.x = x
    this.y = y
    this.width = width
    this.visited = false
    this.walls = [true, true, true, true]
  }

  draw (context, highlight = false) {
    context.strokeStyle = 'pink'
    context.fillStyle = '#333'
   
    if (this.visited) {
      context.fillStyle = 'purple'
    }

    if (highlight) {
      context.fillStyle = 'blue'
    }

    context.fillRect(this.x, this.y, this.width, this.width)
    
    if (this.walls[0]) {
      context.beginPath()
      context.moveTo(this.x, this.y)
      context.lineTo(this.x + this.width, this.y)
      context.stroke();
    }

    if (this.walls[1]) {
      context.beginPath()
      context.moveTo(this.x + this.width, this.y)
      context.lineTo(this.x + this.width, this.y + this.width)
      context.stroke();
    }

    if (this.walls[2]) {
      context.beginPath()
      context.moveTo(this.x, this.y + this.width)
      context.lineTo(this.x + this.width, this.y + this.width)
      context.stroke();
    }

    if (this.walls[3]) {
      context.beginPath()
      context.moveTo(this.x, this.y)
      context.lineTo(this.x, this.y + this.width)
      context.stroke();
    }
  }

  getUnvisitedNeighbour () {
    const neighbours = []
    const x = this.x / this.width
    const y = this.y / this.width
  
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

  removeWalls (neighbour, highlight = false) {
    const x = this.x / RESOLUTION - neighbour.x / RESOLUTION
    const y = this.y / RESOLUTION - neighbour.y / RESOLUTION
  
    if (x === 1) {
      this.walls[3] = false
    } else if (x === -1) {
      this.walls[1] = false
    }
  
    if (y === 1) {
      this.walls[0] = false
    } else if (y === -1) {
      this.walls[2] = false
    }
  
    this.draw(context, highlight)
    neighbour.draw(context)
  }
}
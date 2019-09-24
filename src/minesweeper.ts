import { CellState } from './store/reducer'
import { get2DArrayOf } from './utils'
import { cloneDeep } from 'lodash'

const MINE = 'mine'
export type Coordinates = { x: number; y: number }

export function generateMap(
  width: number,
  height: number,
  numberOfMines: number,
): CellState[][] {
  let map: CellState[][] = get2DArrayOf('0', width, height)

  // set mines
  getMineIndicies(width, height, numberOfMines).forEach(
    ([x, y]) => (map[y][x] = MINE),
  )

  map = calculateNumbers(map, width, height)

  return map
}

function getMineIndicies(
  width: number,
  height: number,
  numberOfMines: number,
): number[][] {
  const strIndiciesOfMines: string[] = []
  while (strIndiciesOfMines.length < numberOfMines) {
    const randomX = Math.floor(Math.random() * width)
    const randomY = Math.floor(Math.random() * height)
    const potentialCoordinates = `${randomX}/${randomY}`
    if (!strIndiciesOfMines.includes(potentialCoordinates)) {
      strIndiciesOfMines.push(potentialCoordinates)
    }
  }
  return strIndiciesOfMines.map(strIndicies => {
    const [x, y] = strIndicies.split('/')
    return [Number(x), Number(y)]
  })
}

function calculateNumbers(
  board: CellState[][],
  width: number,
  height: number,
): CellState[][] {
  const newBoard = cloneDeep(board)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (board[y][x] === '0') {
        newBoard[y][x] = getSurroundingPoints({ x, y }, width, height)
          .filter(({ x, y }) => board[y][x] === MINE)
          .length.toString() as CellState
      }
    }
  }
  return newBoard
}
export function getSurroundingPoints(
  point: Coordinates,
  width: number,
  height: number,
): Coordinates[] {
  const { x, y } = point
  return [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ]
    .filter(([x, y]) => x >= 0 && x < width && y >= 0 && y < height)
    .map(([x, y]) => ({ x, y }))
}

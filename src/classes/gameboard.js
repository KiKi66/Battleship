class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(null));
  }

  placeShip(ship, coordinates) {
    coordinates.forEach(([x, y]) => {
      if (this.board[x][y]) {
        throw new Error("Another ship is already there");
      }
      this.board[x][y] = ship;
    });
    this.ships.push(ship);
  }

  receiveAttack(coordinates) {
    let hit = false;
    for (let ship of this.ships) {
      if (
        ship.coordinates.some(
          (coord) => coord[0] === coordinates[0] && coord[1] === coordinates[1]
        )
      ) {
        ship.hit();
        hit = true;
        this.board[coordinates[0]][coordinates[1]] = "X";
        break;
      }
    }
    if (!hit) {
      this.missedAttacks.push(coordinates);
      this.board[coordinates[0]][coordinates[1]] = "O";
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

module.exports = Gameboard;

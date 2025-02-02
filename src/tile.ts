enum Tile {
  Red = "Red",
  Orange = "Orange",
  Yellow = "Yellow",
  Green = "Green",
  Blue = "Blue",
  Purple = "Purple",
  Brown = "Brown",
  Black = "Black",
  White = "White",
}

function getEmoji(tile: Tile) {
  switch (tile) {
    case Tile.Red:
      return "🟥";
    case Tile.Orange:
      return "🟧";
    case Tile.Yellow:
      return "🟨";
    case Tile.Green:
      return "🟩";
    case Tile.Blue:
      return "🟦";
    case Tile.Purple:
      return "🟪";
    case Tile.Brown:
      return "🟫";
    case Tile.Black:
      return "⬛";
    case Tile.White:
      return "⬜";
  }
}

export { getEmoji, Tile };

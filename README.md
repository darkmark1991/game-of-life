# John Conway's Game of Life
This is my implementation of Game of Life on an *infinite grid.

*every edge wraps over to the opposite, making the grid practically infinite. So an object that goes off the bottom edge enters from top.

Game of Life rules:
1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
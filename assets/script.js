let TIMEOUT = 200;
const FIELD_W = 100;
const FIELD_H = 80;
let lifeTimout = null;
let generation = 0;

let field = [];
function init() {
    stop();
    generation = 0;
    document.getElementById('genCount').innerHTML = generation;
    for (let i = 0; i < FIELD_H; i++) {
        field[i] = [];
        for (let j = 0; j < FIELD_W; j++) {
            field[i][j] = 0;
        }
    }

    const grid = clickableGrid(FIELD_H, FIELD_W, function(el, row, col){
        field[row][col] = (field[row][col] + 1) % 2;
        el.className = field[row][col] ? 'alive' : '';

    });

    document.getElementById('field').innerHTML = '';
    document.getElementById('field').appendChild(grid);
}
init();
    
function clickableGrid(rows, cols, callback){
    const grid = document.createElement('table');
    grid.className = 'grid';
    for (let i = 0; i < rows; i++){
        const tr = grid.appendChild(document.createElement('tr'));
        for (let j = 0; j < cols; j++){
            const cell = tr.appendChild(document.createElement('td'));
            cell.setAttribute('id', `${i}x${j}`)
            cell.addEventListener('click',(function(el, i, j){
                return function(){
                    callback(el, i, j);
                }
            })(cell, i, j),false);
        }
    }
    return grid;
}

function neighbourCount(i, j) {
    return field[(FIELD_H + (i-1)) % FIELD_H][(FIELD_W + (j-1)) % FIELD_W]
         + field[(FIELD_H + (i-1)) % FIELD_H][(FIELD_W + (j)) % FIELD_W]
         + field[(FIELD_H + (i-1)) % FIELD_H][(FIELD_W + (j+1)) % FIELD_W]
         + field[(FIELD_H + (i)) % FIELD_H][(FIELD_W + (j-1)) % FIELD_W]
         + field[(FIELD_H + (i)) % FIELD_H][(FIELD_W + (j+1)) % FIELD_W]
         + field[(FIELD_H + (i+1)) % FIELD_H][(FIELD_W + (j-1)) % FIELD_W]
         + field[(FIELD_H + (i+1)) % FIELD_H][(FIELD_W + (j)) % FIELD_W]
         + field[(FIELD_H + (i+1)) % FIELD_H][(FIELD_W + (j+1)) % FIELD_W];
}

function live(clicked = false) {
    if (clicked && lifeTimout) return;
    const nextField = [];
    for (let i = 0; i < FIELD_H; i++) {
        nextField[i] = [];
        for (let j = 0; j < FIELD_W; j++) {
            const neighbours = neighbourCount(i, j);
            nextField[i][j] = field[i][j];
            if (field[i][j] === 1) {
                if (neighbours < 2 || neighbours > 3) {
                    nextField[i][j] = 0;
                    document.getElementById(`${i}x${j}`).className = '';
                }
            } else if (neighbours === 3) {
                nextField[i][j] = 1;
                document.getElementById(`${i}x${j}`).className = 'alive';
            }
        }
    }
    generation++;
    document.getElementById('genCount').innerHTML = generation;
    field = nextField;
    lifeTimout = setTimeout(live, TIMEOUT);
}

function stop() {
    if (lifeTimout) clearTimeout(lifeTimout);
    lifeTimout = null;
}

function updateSpeed(val) {
    TIMEOUT = val;
}
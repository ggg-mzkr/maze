const ROW_SIZE    = 101 + 4;
const COLUMN_SIZE = 101 + 4;

let maze  = new Maze(ROW_SIZE, COLUMN_SIZE);
let cells = maze.get_maze();

console.log('maze created.');

draw_maze(cells);

// DOMの構築が非常に遅い.
function draw_maze(cells) {
    let maze = document.querySelector('#maze tbody');
    let rows = '';
    for (let r = 0; r < ROW_SIZE; r++) {
        rows += '<tr id="row' + r +'">';

        let columns = '';
        for (let c = 0; c < COLUMN_SIZE; c++) {
            let class_name = '';
            switch (cells[r][c]) {
                case 0:
                    class_name = "wall";
                    break;
                case 1:
                    class_name = "road";
                    break;
                case 2:
                    class_name = "start";
                    break;
                case 3:
                    class_name = "goal";
                    break;
            }
            columns += '<td class="' + class_name + '" id="column' + c + '"></td>';
        }
        rows += columns + '</tr>';
    }
    maze.insertAdjacentHTML("afterbegin", rows);
}

function solve() {
    let steps_clone = maze.steps.slice();
    let solver      = new Solver(steps_clone);

    let solve_steps = solver.solve();
    console.log('solved.');

    // ゴールの位置を取り除く
    solve_steps.shift();

    for (let step of solve_steps) {
        let elm = document.querySelector('#maze tbody ' + '#row' + step.row + ' #column' + step.column);
        elm.setAttribute('class', 'correct');
    }
}

// // 迷路を生成した手順を表示する
// function draw_step() {
//     for (let i = 0; i < maze.steps.length; i++) {
//         let s = maze.steps[i];
//         let elm = document.querySelector('#maze tbody ' + '#row' + s.row + ' #column' + s.column);
//         elm.setAttribute('class', 'road');
//         elm.innerHTML = i;
//     }
//
//     let goal = maze.steps[maze.steps.length - 1];
//     let elm = document.querySelector('#maze tbody ' + '#row' + goal.row + ' #column' + goal.column);
//     elm.setAttribute('class', 'goal');
// }

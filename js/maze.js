const MAX_STACK_SIZE = 500;
let   STACK_COUNT    = 0;

class Maze {

    constructor(row_size, column_size) {
        this.row_size    = row_size;
        this.column_size = column_size;
        this.current     = {row: 0, column: 0};

        this.start_choices = [];
        this.steps         = [];
        
        this.cells  = this.init_cells();
        this.set_start_cell();
    }

    // 0: 壁, 1: 道, 2: スタート, 3: ゴール
    init_cells() {
        let cells = Array(this.row_size - 1);

        for (let i = 0; i < this.row_size; i++) {
            let cell = Array(this.column_size - 1);
            // 1列目と最後の列を道にする
            if (i === 0 || i === this.row_size -1) {
                cell.fill(1)
            } else {
                cell.fill(0);
            }
            // 左端のカラムと右端のカラムを道にする
            cell[0] = 1;
            cell[this.column_size - 1] = 1;
            cells[i] = cell
        }

        return cells
    }

    // 開始位置は偶数のセルから始める必要がある
    set_start_cell() {
        let max_row_size    = (this.row_size - 4 - 1) / 2;
        let max_column_size = (this.column_size - 4 - 1) / 2;

        let r = Math.floor( Math.random() * (max_row_size + 1));
        let c = Math.floor( Math.random() * (max_column_size + 1));

        this.current.row    = r * 2 + 2;
        this.current.column = c * 2 + 2;

        this.cells[this.current.row][this.current.column] = 2;
    }

    // 1タイル分道を広げる関数
    // 道の拡張に成功でtrue, 上下左右どこにも広げられなかった時falseを返す
    // もっと上手い実装があるような...
    take_step() {
        let directions = [
            'UP', 'DOWN', 'RIGHT', 'LEFT'
        ];

        for(let i = 3; i > 0; i--){
            let r = Math.floor(Math.random() * (i + 1));
            let tmp = directions[i];
            directions[i] = directions[r];
            directions[r] = tmp
        }

        let result = false;
        for(let d of directions) {
            switch (d) {
                case "UP":
                    result = this.take_up();
                    break;
                case "DOWN":
                    result = this.take_down();
                    break;
                case "RIGHT":
                    result = this.take_right();
                    break;
                case "LEFT":
                    result = this.take_left()
            }
            if (result) {
                return true;
            }
        }
        return false
    }

    can_up() {
        return !(this.cells[this.current.row - 2][this.current.column] ||
            this.cells[this.current.row - 1][this.current.column])
    }

    can_down() {
        return !(this.cells[this.current.row + 2][this.current.column] ||
            this.cells[this.current.row + 1][this.current.column])
    }

    can_right() {
        return !(this.cells[this.current.row][this.current.column + 2] ||
            this.cells[this.current.row][this.current.column + 1])
    }

    can_left() {
        return !(this.cells[this.current.row][this.current.column - 2] ||
            this.cells[this.current.row][this.current.column - 1])
    }

    take_up() {
        if (this.can_up()) {
            this.current.row--;
            this.push_step();

            this.current.row--;
            this.push_step();

            this.push_start_choices();

            return true;
        }
        return false;
    }

    take_down() {
        if (this.can_down()) {
            this.current.row++;
            this.push_step();

            this.current.row++;
            this.push_step();

            this.push_start_choices();

            return true;
        }
        return false;
    }

    take_right() {
        if (this.can_right()) {
            this.current.column++;
            this.push_step();

            this.current.column++;
            this.push_step();

            this.push_start_choices();

            return true;
        }
        return false;
    }

    take_left() {
        if (this.can_left()) {
            this.current.column--;
            this.push_step();

            this.current.column--;
            this.push_step();

            this.push_start_choices();

            return true;
        }
        return false;
    }

    push_step() {
        this.cells[this.current.row][this.current.column] = 1;
        this.steps.push({row: this.current.row, column: this.current.column});
    }

    push_start_choices() {
        this.start_choices.push({row: this.current.row, column: this.current.column});
    }

    has_start_choices() {
        return this.start_choices.length > 0
    }

    create_maze() {
        STACK_COUNT++;
        while (this.take_step());

        if (this.has_start_choices()) {
            // ランダムの方が良いが、ものすごくボトルネックになっているみたいなのでとりあえず0
            let index = 0;//Math.floor(Math.random() * start_choices.length);

            this.current = this.start_choices[index];
            this.start_choices.splice(index, 1);

            if (STACK_COUNT < MAX_STACK_SIZE) {
                this.create_maze();
            }
        }
    }

    // create_mazeを直接呼ぶと再帰が多すぎてエラーになるので
    // 一枚ラッパーを挟む
    create_maze_wrapper() {
        this.create_maze();

        if (STACK_COUNT >= MAX_STACK_SIZE) {
            STACK_COUNT = 0;
            this.create_maze_wrapper()
        }

        let goal_pos = this.steps.slice(-1)[0];
        this.cells[goal_pos.row][goal_pos.column] = 3;
    }

    get_maze() {
        this.create_maze_wrapper();
        return this.cells;
    }

}

class Solver {

    constructor(steps) {
        this.steps = steps;

        // 0: 上, 1: 下, 2: 右, 3: 左
        this.direction   = 0;
        this.solve_steps = [];
    }

    solve() {
        this.solve_core();
        return this.solve_steps
    }

    solve_core() {
        let current = this.steps.pop();
        let next    = this.steps.pop();
        this.push_solve_step(current);

        // 次のステップが隣接している場合、辿り続ける
        while(this.is_linked(current, next)) {
            this.push_solve_step(next);
            this.set_direction(current, next);

            current = next;
            next    = this.steps.pop();
            if (!next) {
                break;
            }
        }

        // 次のステップが隣接していない場合
        // 現在の向いている方向に1セル進んだ位置までステップを更新する
        this.update_steps(current);

        if (this.steps.length > 1) {
            this.solve_core()
        }
    }

    update_steps(current) {
        if (this.steps.length === 0) {
            return
        }

        let row    = current.row;
        let column = current.column;

        switch (this.direction) {
            case 0:
                row--;
                break;
            case 1:
                row++;
                break;
            case 2:
                column++;
                break;
            case 3:
                column--;
        }

        let next = this.steps.pop();

        while (next.row !== row || next.column !== column) {
            next = this.steps.pop();
            if (!next) {
                return
            }
        }

        this.steps.push(next)
    }

    set_direction(current, next) {
        if (current.column === next.column) {
            if (current.row > next.row) {
                this.direction = 0;
            } else {
                this.direction = 1;
            }
        } else {
            if (current.column < next.column) {
                this.direction = 2;
            } else {
                this.direction = 3;
            }
        }
    }

    is_linked(current, next) {
        return !((Math.abs(current.row - next.row) > 1) || (Math.abs(current.column - next.column) > 1));
    }

    push_solve_step(step) {
        this.solve_steps.push(step)
    }

}

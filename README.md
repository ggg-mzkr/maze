# maze
401×401マスの迷路生成

# Dependency
- google chrome

# Usage
ブラウザでmaze.htmlを開いてください。solveボタンを押すとスタートからゴールまでの道のりが表示されます。

/js/main.jsのROW_SIZEとCOLUMN_SIZEを編集することで迷路の大きさを変えられます。(迷路生成アルゴリズムの制約上この数字は奇数にしてください。)

```javascript:/js/main.js
const ROW_SIZE    = 401 + 4;
const COLUMN_SIZE = 401 + 4;
```

![サンプル](https://raw.githubusercontent.com/horiuchi-apu/maze/screenshot/example.png "サンプル")

# Licence
This software is released under the MIT License, see LICENSE.

# Authors
堀内哲煕

# References
- http://www5d.biglobe.ne.jp/stssk/maze/make.html

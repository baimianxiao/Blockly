import * as Blockly from 'blockly'

export const MATH_BLOCKS = {
  SQUARE_SUM: 'math_square_sum',
  ADVANCED_POWER: 'advanced_math'
} as const

export function registerMathBlocks() {
  // 平方和块
  Blockly.Blocks[MATH_BLOCKS.SQUARE_SUM] = {
    init: function () {
      this.jsonInit({
        "message0": "平方和 %1 %2",
        "args0": [
          { "type": "input_value", "name": "NUM1", "check": "Number" },
          { "type": "input_value", "name": "NUM2", "check": "Number" }
        ],
        "output": "Number",
        "colour": 230,
        "tooltip": "计算两个数字的平方和"
      })
    }
  }

  // 带下拉菜单的幂运算块
  Blockly.Blocks[MATH_BLOCKS.ADVANCED_POWER] = {
    init: function () {
      this.jsonInit({
        "message0": "计算 %1 的 %2 次方",
        "args0": [
          { "type": "input_value", "name": "BASE", "check": "Number" },
          {
            "type": "field_dropdown",
            "name": "POWER",
            "options": [["平方", "2"], ["立方", "3"], ["四次方", "4"]]
          }
        ],
        "output": "Number",
        "colour": 65,
        "tooltip": "计算指定次方的值"
      })
    }
  }
}
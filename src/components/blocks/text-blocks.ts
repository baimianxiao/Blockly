import * as Blockly from 'blockly'

export const TEXT_BLOCKS = {
  REPEAT: 'text_repeat',
  REVERSE: 'text_reverse'
} as const

export function registerTextBlocks() {
  // 文本重复块
  Blockly.Blocks[TEXT_BLOCKS.REPEAT] = {
    init: function () {
      this.jsonInit({
        "message0": "重复 %1 次 %2",
        "args0": [
          { "type": "input_value", "name": "TIMES", "check": "Number" },
          { "type": "input_value", "name": "TEXT", "check": "String" }
        ],
        "output": "String",
        "colour": 160,
        "tooltip": "重复指定文本多次"
      })
    }
  }

  // 文本反转块
  Blockly.Blocks[TEXT_BLOCKS.REVERSE] = {
    init: function () {
      this.jsonInit({
        "message0": "反转文本 %1",
        "args0": [{ "type": "input_value", "name": "TEXT", "check": "String" }],
        "output": "String",
        "colour": 160,
        "tooltip": "反转输入文本"
      })
    }
  }
}
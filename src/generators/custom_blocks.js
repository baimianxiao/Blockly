// 自定义“计时器”积木
Blockly.Blocks['timer_start'] = {
    init: function() {
      this.appendDummyInput()
          .appendField('启动计时器（秒）')
          .appendField(new Blockly.FieldNumber(0), 'TIME');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(160);
    }
  };
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

export const createFrameBlock = () =>
  (Blockly.Blocks['create_frame'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Frame at')
        .appendField(new Blockly.FieldNumber(0, 0), 'MILLIS')
        .appendField('milliseconds');
      this.appendStatementInput('POSITIONS')
        .setCheck('Position')
        .appendField('positions');
      this.setPreviousStatement(true, 'Frame');
      this.setNextStatement(true, 'Frame');
      this.setColour(160);
      this.setTooltip('Create a frame with timestamp');
    },
  });

export const createFrameCode = () =>
  (javascriptGenerator.forBlock['create_frame'] = function (block: any) {
    const millis = block.getFieldValue('MILLIS');
    const positions = javascriptGenerator.statementToCode(block, 'POSITIONS');

    const code = `    
  {
    "positions": [
    ${positions}
    ],
    "millis": ${millis}
  },`;
    return code;
  });

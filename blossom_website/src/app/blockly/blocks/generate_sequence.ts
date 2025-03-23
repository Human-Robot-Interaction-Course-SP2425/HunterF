import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

export const generateSequenceBlock = () =>
  (Blockly.Blocks['create_sequence'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Create animation sequence named')
        .appendField(new Blockly.FieldTextInput('my_animation'), 'NAME');
      this.appendStatementInput('FRAMES')
        .setCheck('Frame')
        .appendField('frames');
      this.setColour(230);
      this.setTooltip('Create a new animation sequence');
    },
  });

export const generateSequenceCode = () =>
  (javascriptGenerator.forBlock['create_sequence'] = function (block: any) {
    const name = block.getFieldValue('NAME');
    const frames = javascriptGenerator.statementToCode(block, 'FRAMES');
    const code = `{
  "animation": "${name}",
  "frame_list": [${frames}
  ]
}`;
    return code;
  });

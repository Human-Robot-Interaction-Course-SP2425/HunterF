import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

export const setPositionBlock = () =>
  (Blockly.Blocks['set_position'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Set all positions:');
      this.appendDummyInput()
        .appendField('tower_1:')
        .appendField(new Blockly.FieldNumber(3, 1, 5, 0.1), 'TOWER1');
      this.appendDummyInput()
        .appendField('tower_2:')
        .appendField(new Blockly.FieldNumber(3, 1, 5, 0.1), 'TOWER2');
      this.appendDummyInput()
        .appendField('tower_3:')
        .appendField(new Blockly.FieldNumber(3, 1, 5, 0.1), 'TOWER3');
      this.appendDummyInput()
        .appendField('base:')
        .appendField(new Blockly.FieldNumber(3, 1, 5, 0.1), 'BASE');
      this.appendDummyInput()
        .appendField('ears:')
        .appendField(new Blockly.FieldNumber(5, 1, 5, 0.1), 'EARS');
      this.setPreviousStatement(true, 'Position');
      this.setNextStatement(false);
      this.setColour(90);
      this.setTooltip('Set positions for all motors at once (values between 1-5)');
    },
  });

export const setPositionCode = () =>
  (javascriptGenerator.forBlock['set_position'] = function (block: any) {
    const tower1 = block.getFieldValue('TOWER1');
    const tower2 = block.getFieldValue('TOWER2');
    const tower3 = block.getFieldValue('TOWER3');
    const base = block.getFieldValue('BASE');
    const ears = block.getFieldValue('EARS');

    const code = `{
      "dof": "tower_1",
      "pos": ${tower1}
    },
    {
      "dof": "tower_2",
      "pos": ${tower2}
    },
    {
      "dof": "tower_3",
      "pos": ${tower3}
    },
    {
      "dof": "base",
      "pos": ${base}
    },
    {
      "dof": "ears",
      "pos": ${ears}
    },`;
    return code;
  });

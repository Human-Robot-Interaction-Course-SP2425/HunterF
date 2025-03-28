import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

// OLD BLOCK
export const adjNumBlock = () =>
  (Blockly.Blocks['adj_num'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('multiply by')
        .appendField(new Blockly.FieldNumber(0, 0.5, 1.5, 0.01), 'ADJ_NUM');
      this.setOutput(true, null);
      this.setColour(230);
      this.setTooltip('');
      this.setHelpUrl('');
    },
  });

export const adjNumCode = () =>
  (javascriptGenerator.forBlock['adj_num'] = function (block: any) {
    var number_adj_num = block.getFieldValue('ADJ_NUM');
    // TODO: Assemble JavaScript into code variable.
    var code = number_adj_num;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  });

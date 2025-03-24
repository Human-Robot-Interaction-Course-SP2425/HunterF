import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

// OLD BLOCK
export const adjBlock = () =>
  (Blockly.Blocks['adj'] = {
    init: function () {
      this.appendValueInput('ADJ_INPUT')
        .setCheck(['adj_num', 'adj_param'])
        .appendField(
          new Blockly.FieldDropdown([
            ['Speed', 'speed'],
            ['Amplitude', 'amp'],
            ['Posture', 'post'],
          ]),
          'ADJ_TYPE'
        );
      this.setOutput(true, null);
      this.setColour(230);
      this.setTooltip('');
      this.setHelpUrl('');
    },
  });

export const adjCode = () =>
  (javascriptGenerator.forBlock['adj'] = function (block: any) {
    var dropdown_adj_type = block.getFieldValue('ADJ_TYPE');
    var value_input = Blockly.JavaScript.valueToCode(
      block,
      'ADJ_INPUT',
      Blockly.JavaScript.ORDER_ATOMIC
    );
    if (value_input == '') {
      value_input = '1';
    }
    // TODO: Assemble JavaScript into code variable.
    var code = '"' + dropdown_adj_type + '=' + value_input + '&"';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  });

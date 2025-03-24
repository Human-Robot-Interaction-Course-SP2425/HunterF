import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

// OLD BLOCK
export const adjParamBlock = () =>
  (Blockly.Blocks['adj_param'] = {
    init: function () {
      this.appendDummyInput().appendField(
        new Blockly.FieldDropdown([
          ['High', 'HIGH'],
          ['Low', 'LOW'],
        ]),
        'ADJ_PARAM'
      );
      this.setOutput(true, null);
      this.setColour(230);
      this.setTooltip('');
      this.setHelpUrl('');
    },
  });

export const adjParamCode = () =>
  (javascriptGenerator.forBlock['adj_param'] = function (block: any) {
    var dropdown_adj_param = block.getFieldValue('ADJ_PARAM');
    var number_adj_param: any = 0;
    if (dropdown_adj_param == 'HIGH') {
      number_adj_param = 1.5;
    } else if (dropdown_adj_param == 'LOW') {
      number_adj_param = 0.7;
    }
    // TODO: Assemble JavaScript into code variable.
    var code = number_adj_param;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  });

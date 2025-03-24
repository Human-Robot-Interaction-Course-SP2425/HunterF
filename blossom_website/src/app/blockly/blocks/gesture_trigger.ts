import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

var videotime = 10;
var minTime = 0;
// OLD BLOCK
export const adjBlock = () =>
  (Blockly.Blocks['gesture_trigger'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('At')
        .appendField(
          new Blockly.FieldNumber(
            Math.round(videotime * 10) / 10,
            minTime,
            9999999
          ),
          'TIME'
        )
        .appendField('seconds play')
        .appendField(
          new Blockly.FieldDropdown([
            ['gesture1', 'gesture1'],
            ['gesture2', 'gesture2'],
            ['gesture3', 'gesture3'],
          ]),
          'GESTURE'
        );
      this.appendDummyInput()
        .setAlign(Blockly.inputs.Align.RIGHT)
        .appendField('Loop')
        .appendField(new Blockly.FieldCheckbox('FALSE'), 'LOOP');
      this.appendValueInput('ADJ')
        .setCheck('adj')
        .setAlign(Blockly.inputs.Align.RIGHT)
        .appendField('Adjustments');
      this.setPreviousStatement(true, 'gesture_trigger');
      this.setNextStatement(true, 'gesture_trigger');
      this.setColour(230);
      this.setTooltip('Gesture trigger');
      this.setHelpUrl('help');
    },
  });

export const adjCode = () =>
  (javascriptGenerator.forBlock['gesture_trigger'] = function (block: any) {
    if (block.getParent() != null) {
      block.setFieldValue(
        Math.max(
          block.getFieldValue('TIME'),
          block.getParent().getFieldValue('TIME')
        ),
        'TIME'
      );
    }

    var number_time = block.getFieldValue('TIME');

    var dropdown_gesture = block.getFieldValue('GESTURE');
    var checkbox_loop = block.getFieldValue('LOOP') == 'TRUE';
    var value_adj = Blockly.JavaScript.valueToCode(
      block,
      'ADJ',
      Blockly.JavaScript.ORDER_ATOMIC
    );
    // TODO: Assemble JavaScript into code variable.

    // minTime = Math.max(minTime, number_time);

    // minTime = block.
    var millis_str = 'millis:' + number_time;
    var gesture_str = "gesture:'" + dropdown_gesture + "'";
    var loop_str = 'loop:' + checkbox_loop;
    var adj_str = '';
    if (value_adj != '') {
      var adj_str = "adj:'?'+" + value_adj;
    }
    var trigger_str =
      '{' +
      millis_str +
      ',' +
      gesture_str +
      ',' +
      loop_str +
      ',' +
      adj_str +
      '}';

    var code = 'triggerList.push(' + trigger_str + ');\n';

    // make sure connected to original block
    var anc = block;
    while (anc.getParent() != null) {
      anc = anc.getParent();
    }
    if (anc.id != 'gesture_0') {
      code = '';
      return code;
    }
    var minTime = number_time;

    return code;
  });

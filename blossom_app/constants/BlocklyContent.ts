import { generateSequenceBlock, generateSequenceCode } from "./blocks/generate_sequence";
import { setPositionBlock, setPositionCode } from "./blocks/set_position";
import { createFrameBlock, createFrameCode } from "./blocks/create_frame";


const TOOLBOX = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Gestures',
      colour: 120,
      contents: [
        {
          kind: 'block',
          type: 'create_sequence'
        },
        {
          kind: 'block',
          type: 'create_frame'
        },
        {
          kind: 'block',
          type: 'set_position'
        },
      ]
    }
  ]
}

export const initCustomBlocks = () => {
  generateSequenceBlock();
  generateSequenceCode();
  setPositionBlock();
  setPositionCode();
  createFrameBlock();
  createFrameCode();
}

const ConfigFiles = {
  TOOLBOX,
};

export default ConfigFiles;

export const parseBlocklyCode = (code: string) => {
  try {
    const parsedCode = code
    .replace(/,(\s*})/g, '$1')
    .replace(/,(\s*])/g, '$1'); 
  
  const jsonObj = JSON.parse(parsedCode);
  return JSON.stringify(jsonObj, null, 2)
  } catch (e) {
    console.log(e);
    return code;
  }
}


export const customBlocksDefinitions = `
    // Generate Sequence Block
    Blockly.Blocks['create_sequence'] = {
      init: function() {
        this.appendDummyInput()
          .appendField('Create sequence named')
          .appendField(new Blockly.FieldTextInput('my_animation'), 'NAME');
        this.appendStatementInput('FRAMES')
          .setCheck('Frame')
          .appendField('frames');
        this.setColour(230);
        this.setTooltip('Create a new animation sequence');
      }
    };

    Blockly.JavaScript.forBlock['create_sequence'] = function(block) {
      const name = block.getFieldValue('NAME');
      const frames = Blockly.JavaScript.statementToCode(block, 'FRAMES');
      return \`{
  "animation": "\${name}",
  "frame_list": [\${frames}
  ]
}\`;
    };

    // Create Frame Block
    Blockly.Blocks['create_frame'] = {
      init: function() {
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
      }
    };

    Blockly.JavaScript.forBlock['create_frame'] = function(block) {
      const millis = block.getFieldValue('MILLIS');
      const positions = Blockly.JavaScript.statementToCode(block, 'POSITIONS');
      const code = \`
  {
    "positions": [\${positions}
    ],
    "millis": \${millis}
  },\`;
      return code;
    };

    // Set Position Block
    Blockly.Blocks['set_position'] = {
      init: function() {
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
      }
    };

    Blockly.JavaScript.forBlock['set_position'] = function(block) {
      const tower1 = block.getFieldValue('TOWER1');
      const tower2 = block.getFieldValue('TOWER2');
      const tower3 = block.getFieldValue('TOWER3');
      const base = block.getFieldValue('BASE');
      const ears = block.getFieldValue('EARS');
 
      const code = \`
    {
      "dof": "tower_1",
      "pos": \${tower1}
    },
    {
      "dof": "tower_2",
      "pos": \${tower2}
    },
    {
      "dof": "tower_3",
      "pos": \${tower3}
    },
    {
      "dof": "base",
      "pos": \${base}
    },
    {
      "dof": "ears",
      "pos": \${ears}
    }\`;

      return code;
    };
`;
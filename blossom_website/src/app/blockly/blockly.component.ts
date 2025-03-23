import { Component, OnInit } from '@angular/core';
import * as Blockly from 'blockly';
import { BlocklyOptions } from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { generateSequenceBlock, generateSequenceCode } from './blocks/generate_sequence';
import { createFrameBlock, createFrameCode } from './blocks/create_frame';
import { setPositionBlock, setPositionCode } from './blocks/set_position';

@Component({
  selector: 'app-blockly',
  imports: [],
  templateUrl: './blockly.component.html',
  styleUrl: './blockly.component.css',
})
export class BlocklyComponent implements OnInit {
  workspace!: Blockly.WorkspaceSvg;
  generatedCode: string = '';

  constructor() {
    generateSequenceBlock();
    generateSequenceCode();
    createFrameBlock();
    createFrameCode();
    setPositionBlock();
    setPositionCode();
  }

  setupCodeGeneration() {
    this.workspace.addChangeListener((event: any) => {
      if (this.workspace.isDragging()) return;
      this.generateCode();
    });
  }

  generateCode() {
    if (this.workspace) {
      const rawCode = javascriptGenerator.workspaceToCode(this.workspace);
      
      try {
        const parsedCode = rawCode
          .replace(/,(\s*})/g, '$1')
          .replace(/,(\s*])/g, '$1'); 
        
        const jsonObj = JSON.parse(parsedCode);
        this.generatedCode = JSON.stringify(jsonObj, null, 2);
      } catch (e) {
        console.error('Error parsing generated code:', e);
        this.generatedCode = rawCode; 
      }
    }
  }

  ngOnInit(): void {
    const blocklyDiv = document.getElementById('blocklyDiv');

    const toolbox = {
      kind: 'flyoutToolbox',
      contents: [
        {
          kind: 'block',
          type: 'create_sequence',
        },
        {
          kind: 'block',
          type: 'create_frame',
        },
        {
          kind: 'block',
          type: 'set_position',
        },
      ],
    };

    this.workspace = Blockly.inject(blocklyDiv!, {
      readOnly: false,
      trashcan: true,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true,
      },
      toolbox,
    } as BlocklyOptions);

    this.setupCodeGeneration();
  }
}

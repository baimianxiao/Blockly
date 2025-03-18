"use client";
import { useEffect, useRef } from 'react'
import * as Blockly from 'blockly'


export default function BlocklyComponent() {
    const blocklyDiv = useRef<HTMLDivElement>(null)
    const toolbox = useRef<Blockly.utils.toolbox.ToolboxDefinition>({
        kind: 'categoryToolbox',
        contents: [
            {
                kind: 'category',
                name: 'Logic',
                contents: [
                    { kind: 'block', type: 'controls_if' },
                    { kind: 'block', type: 'logic_boolean' }
                ]
            },
            {
                kind: 'category',
                name: 'Loops',
                contents: [
                    { kind: 'block', type: 'controls_whileUntil' }
                ]
            }
        ]
    })

    useEffect(() => {
        if (!blocklyDiv.current) return

        // 初始化 Blockly 工作区
        const workspace = Blockly.inject(blocklyDiv.current, {
            toolbox: toolbox.current,
            scrollbars: true,
            trashcan: true
        })

        // 清理函数
        return () => {
            workspace.dispose()
        }
    }, [])

    return (
        <div
            ref={blocklyDiv}
            style={{
                height: '80vh',
                width: '100%',
                minHeight: '400px'
            }}
        />
    )
}
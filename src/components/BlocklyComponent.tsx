"use client";
import { useEffect, useRef, useState,useCallback } from 'react'
import * as Blockly from 'blockly'
import { loadBlocklyLocale } from './i18n';
import { registerAllBlocks } from './blocks'
import { pythonGenerator } from 'blockly/python'

export default function BlocklyComponent() {
    const blocklyDiv = useRef<HTMLDivElement>(null);
    const [currentLang, setCurrentLang] = useState<'en' | 'zh-cn'>('en');
    const [generatedCode, setGeneratedCode] = useState('');
    const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
    const [targetLanguage, setTargetLanguage] = useState<'python' | 'javascript'>('python');

    const debounce = (func: Function, delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const generateCode = useCallback(() => {
        if (workspaceRef.current) {
            const code = pythonGenerator.workspaceToCode(workspaceRef.current);
            setGeneratedCode(code);
        }
    }, []);

    const debouncedGenerateCode = useCallback(debounce(generateCode, 500), [generateCode]);


    const toolbox = useRef<Blockly.utils.toolbox.ToolboxDefinition>({
        kind: 'categoryToolbox',
        contents: [
            {
                kind: 'category',
                name: '%{BKY_CATEGORY_LOGIC}', // 使用语言键
                contents: [
                    { kind: 'block', type: 'controls_if' },
                    { kind: 'block', type: 'logic_boolean' }
                ]
            },
            {
                kind: 'category',
                name: '%{BKY_CATEGORY_LOOPS}', // 新增循环分类键
                contents: [
                    { kind: 'block', type: 'controls_whileUntil' }
                ]
            },
            {
                kind: 'category',
                name: 'Math', // 新增循环分类键
                contents: [
                    { kind: 'block', type: 'math_square_sum' }
                ]
            },
            {
                kind: 'category',
                name: 'Text', // 新增循环分类键
                contents: [
                    { kind: 'block', type: 'text_repeat' }
                ]
            }
        ]
    })

    // 初始化工作区
    const initWorkspace = async () => {
        if (!blocklyDiv.current) return;

        registerAllBlocks();

        if (workspaceRef.current) {
            workspaceRef.current.dispose();
        }

        const newWorkspace = Blockly.inject(blocklyDiv.current, {
            toolbox: toolbox.current,
            scrollbars: true,
            trashcan: true
        });

        // 初始化官方 Python 生成器
        pythonGenerator.init(newWorkspace);

        newWorkspace.addChangeListener((event) => {
            if (!event.isUiEvent) {
                debouncedGenerateCode();
            }
        });

        workspaceRef.current = newWorkspace;
        generateCode();
    };
    useEffect(() => {
        initWorkspace();
    }, [currentLang]);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1 }}>
                <div style={{ padding: '10px', display: 'flex', gap: 10 }}>
                    <button onClick={() => setCurrentLang('en')}>EN</button>
                    <button onClick={() => setCurrentLang('zh-cn')}>中文</button>
                </div>
                <div
                    ref={blocklyDiv}
                    style={{ height: 'calc(100% - 50px)', width: '100%' }}
                />
            </div>
            
            <div style={{
                flex: 0.4,
                padding: '20px',
                backgroundColor: '#f8f9fa',
                overflow: 'auto'
            }}>
                <h3>生成的 Python 代码：</h3>
                <pre style={{ 
                    backgroundColor: 'white',
                    padding: '15px',
                    borderRadius: '4px',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'monospace'
                }}>
                    <code>{generatedCode || '# 拖动积木开始编程...'}</code>
                </pre>
            </div>
        </div>
    );
}
import * as Blockly from 'blockly'
declare global {
    interface Window {
      Blockly: {
        Msg: Record<string, string>;
        setLocale?: (messages: Record<string, string>) => void;
      };
    }
  }
  
// i18n.ts
export async function loadBlocklyLocale(locale: 'en' | 'zh-hans') {
    try {
        const messages = await import(`../../../public/blockly/msg/${locale}.json`)
        Object.assign(Blockly.Msg, messages.default || messages)
        Blockly.setLocale(Blockly.Msg)
    } catch (error) {
        console.error('Failed to load Blockly locale:', error)
    }
}
import Head from 'next/head'
import BlocklyComponent from '@/components/BlocklyComponent'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Blockly Next.js Demo</title>
        <meta name="description" content="Blockly integration with Next.js" />
      </Head>

      
      <BlocklyComponent></BlocklyComponent>
     
    </div>
  )
}
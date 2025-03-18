import Head from 'next/head'
import BlocklyComponent from '@/components/BlocklyComponent'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Blockly Next.js Demo</title>
        <meta name="description" content="Blockly integration with Next.js" />
      </Head>

      <main className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Blockly Demo</h1>
        <BlocklyComponent></BlocklyComponent>
      </main>
    </div>
  )
}
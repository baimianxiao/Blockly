export * from './math-blocks'
export * from './text-blocks'

export function registerAllBlocks() {
  import('./math-blocks').then(({ registerMathBlocks }) => registerMathBlocks())
  import('./text-blocks').then(({ registerTextBlocks }) => registerTextBlocks())
}
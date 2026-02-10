import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1,
      cdn: 'https://esm.sh/'
    })
  ],
  theme: {
    colors: {
      primary: '#7c3aed',
      'primary-soft': '#a78bfa',
      bg: '#181a1b',
      surface: '#121314',
      'surface-hover': '#1a1b1d',
      border: '#242528',
      'border-hover': '#2e2f33',
      text: '#fcfcfc',
      'text-muted': '#a1a1aa',
      'text-dim': '#52525b'
    }
  },
  shortcuts: {
    'custom-scrollbar': 'scrollbar scrollbar-w-1 scrollbar-track-transparent scrollbar-thumb-text-dim/30 hover:scrollbar-thumb-text-dim/50 scrollbar-thumb-rounded'
  }
})

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
      scale: 1.2
    })
  ],
  theme: {
    colors: {
      primary: '#4d6bfe',
      dark: '#1a1a2e',
      darker: '#16162a'
    }
  }
})

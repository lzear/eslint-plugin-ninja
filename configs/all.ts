import mod from '../index'

export default {
  plugins: {
    ninja: mod,
  },
  rules: mod.configs.all.rules,
}

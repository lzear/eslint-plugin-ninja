import mod from '../index.js'

export default {
  plugins: {
    dont: mod,
  },
  rules: mod.configs.all.rules,
}

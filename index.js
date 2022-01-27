module.exports = (userConfig = {}) => (...nextArguments) => {
  const phase = nextArguments[0]

  let { plugins = [], ...config } = typeof userConfig === 'function'
    ? userConfig(...nextArguments)
    : userConfig

  for (const pluginDefinition of plugins) {
    if (
      Array.isArray(pluginDefinition.phases) &&
      !pluginDefinition.phases.includes(phase)
    ) {
      continue
    }

    const plugin = typeof pluginDefinition === 'string'
      ? require(pluginDefinition)
      : require(pluginDefinition.resolve)

    const pluginOptions = pluginDefinition.options ?? {}
    const pluginResult = pluginDefinition.legacy
      ? plugin({ ...config, ...pluginOptions })
      : plugin(config, pluginOptions)

    config = typeof pluginResult === 'function'
      ? { ...config, ...pluginResult(...nextArguments) }
      : { ...config, ...pluginResult }
  }

  return config
}

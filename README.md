# next-with-plugins

Adds a `plugins` option to `next.config.js` for easy plugins configuration on
Next.js — inspired by Gatsby.

## Installation

```sh
npm install next-with-plugins
```

## Usage

`next-with-plugins` adds a `plugins` option to `next.config.js`, where you can
configure all your plugins:

```js
const withPlugins = require('next-with-plugins')

module.exports = withPlugins({
  /* Next.js config options here */
  plugins: [
    /* Plugins */
  ]
})
```

Or if you use a function:

```js
const withPlugins = require('next-with-plugins')

module.exports = withPlugins((phase, { defaultConfig }) => ({
  /* Next.js config options here */
  plugins: [
    /* Plugins */
  ]
}))
```

### Plugins without options

If a plugin does not need any options, you can add its name as a string to the
plugins array:

```js
const withPlugins = require('next-with-plugins')

module.exports = withPlugins({
  plugins: [
    'next-plugin-name'
  ]
})
```

### Plugins with options

If the plugin has options to configure, instead of adding a name string to the
plugins array, add an object with its name and options. Following is an example
showing how to write an object with keys to resolve the plugin name and an
options object with any applicable settings:

```js
const withPlugins = require('next-with-plugins')

module.exports = withPlugins({
  plugins: [
    {
      resolve: 'next-plugin-name',
      options: {
        optionA: false,
        optionB: 'Another option'
      }
    }
  ]
})
```

### Phases

If the plugin should be enabled only in specific phases, you can specify them
here:

```js
const { PHASE_PRODUCTION_BUILD } = require('next/constants')
const withPlugins = require('next-with-plugins')

module.exports = withPlugins({
  plugins: [
    {
      resolve: 'next-plugin-name',
      phases: [PHASE_PRODUCTION_BUILD],
      options: {
        optionA: false,
        optionB: 'Another option'
      }
    }
  ]
})
```

### Legacy mode

If a plugin was not made to be used with `next-with-plugins` and you want to
configure its options, set the `legacy` property to `true`:

```js
const withPlugins = require('next-with-plugins')

module.exports = withPlugins({
  plugins: [
    {
      resolve: 'next-optimized-images',
      legacy: true,
      options: {
        handleImages: ['jpeg', 'png']
      }
    }
  ]
})
```

If you don't need to set the plugin options, you can just add its name to the
plugins array:

```js
const withPlugins = require('next-with-plugins')

module.exports = withPlugins({
  plugins: [
    'next-optimized-images'
  ]
})
```

## Plugin development

The plugin should return a function, which in turn will receive two arguments:
`nextConfig` and `pluginOptions`. `nextConfig` is the current config object,
modified by previous plugins. `pluginOptions` is the value passed to the
`options` property.

```js
module.exports = (nextConfig, pluginOptions) => {
  /* Do something here */

  return { ...nextConfig }
}
```

If you need access to `phase` or other Next.js arguments, you should return a
function:

```js
module.exports = (nextConfig, pluginOptions) => {
  return (phase, { defaultConfig }) => {
    /* Do something here */

    return return { ...nextConfig }
  }
}
```

## License

[The MIT License][license]

[license]: ./LICENSE

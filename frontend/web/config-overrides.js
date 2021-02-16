/**
 * Config file for react-app-rewired.
 * https://www.npmjs.com/package/react-app-rewired
 *
 * This allow to override webpack config without ejecting the create-react-app (CRA) abstraction.
 * Additional dependencies must be added on top of CRA so, there is a `react-app-rewire-postcss` for postcss processing.
 * 
 * I recommand you to not open node_modules folder for you health 🤪.
 */
var path = require('path');

const { override, babelInclude } = require('customize-cra');

module.exports = function (config, env) {
  return Object.assign(
    config,
    require('react-app-rewire-postcss')(config, {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    }),
    override(
      babelInclude([
        /* transpile (converting to es5) code in src/ and shared component library */
        path.resolve('src'),
        path.resolve('../common'),
      ])
    )(config, env)
  );
};

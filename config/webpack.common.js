const webpack = require('webpack');
const helpers = require('./helpers');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

/*
 * Webpack Constants
 */
const METADATA = {
  title: 'Angular2 Webpack Starter by @gdi2290 from @AngularClass',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

module.exports = function (options) {
  return {

    /*
     * Static metadata for index.html
     *
     * See: (custom attribute)
     */
    metadata: METADATA,

    entry: {

      'polyfills': './src/polyfills.browser.ts',
      'vendor': './src/vendor.browser.ts',
      'main': './src/main.browser.ts'

    },

    resolve: {

      extensions: ['', '.ts', '.js', '.json'],

      // Make sure root is src
      root: helpers.root('src'),

      // remove other default values
      modulesDirectories: ['node_modules']

    },

    module: {

      preLoaders: [
        {
          test: /\.ts$/,
          loader: 'string-replace-loader',
          query: {
            search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
            replace: '$1.import($3).then(mod => (mod.__esModule && mod.default) ? mod.default : mod)',
            flags: 'g'
          },
          include: [helpers.root('src')]
        },

      ],

      loaders: [

        /*
         * Typescript loader support for .ts and Angular 2 async routes via .async.ts
         * Replace templateUrl and stylesUrl with require()
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader
         * See: https://github.com/TheLarkInn/angular2-template-loader
         */
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },

        {
          test: /\.json$/,
          loader: 'json-loader'
        },

        {
          test: /\.css$/,
          loaders: ['to-string-loader', 'css-loader']
        },

        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },

        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file'
        }
      ],

      postLoaders: [
        {
          test: /\.js$/,
          loader: 'string-replace-loader',
          query: {
            search: 'var sourceMappingUrl = extractSourceMappingUrl\\(cssText\\);',
            replace: 'var sourceMappingUrl = "";',
            flags: 'g'
          }
        }
      ]
    },

    plugins: [
      new AssetsPlugin({
        path: helpers.root('dist'),
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),

      /*
       * Plugin: ForkCheckerPlugin
       * Description: Do type checking in a separate process, so webpack don't need to wait.
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
       */
      new ForkCheckerPlugin(),
      /*
       * Plugin: CommonsChunkPlugin
       * Description: Shares common code between the pages.
       * It identifies common modules and put them into a commons chunk.
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
       * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
       */
      new webpack.optimize.CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),

      /**
       * Plugin: ContextReplacementPlugin
       * Description: Provides context to Angular's use of System.import
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
       * See: https://github.com/angular/angular/issues/11580
       */
      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src') // location of your src
      ),

      /*
       * Plugin: CopyWebpackPlugin
       * Description: Copy files and directories in webpack.
       *
       * Copies project static assets.
       *
       * See: https://www.npmjs.com/package/copy-webpack-plugin
       */
      new CopyWebpackPlugin([{
        from: 'src/assets',
        to: 'assets'
      }]),

      /*
       * Plugin: HtmlWebpackPlugin
       * Description: Simplifies creation of HTML files to serve your webpack bundles.
       * This is especially useful for webpack bundles that include a hash in the filename
       * which changes every compilation.
       *
       * See: https://github.com/ampedandwired/html-webpack-plugin
       */
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: 'dependency'
      })

    ],

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: 'window',
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
};

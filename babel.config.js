module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["react-native-reanimated/plugin"],
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
          '.native.js',
        ],
        alias: {
          types: './src/types',
          shared: './src/shared',
          screens: './src/screens',

          core: './src/shared/core',
          configs: './src/shared/core/configs',
          services: './src/shared/core/services',
          providers: './src/shared/core/providers',

          theme: './src/shared/theme',
          enums: './src/shared/enums',
          hooks: './src/shared/hooks',
          store: './src/shared/store',
          'ui-kit': './src/shared/ui-kit',
          utils: './src/shared/utils',
          assets: './src/shared/assets',
          constants: './src/shared/constants',
          components: './src/shared/components',
          icons: './src/shared/assets/icons',
        },
      },
    ],
  ],
};


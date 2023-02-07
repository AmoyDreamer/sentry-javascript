'use strict';

export default {
  presets: [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "corejs": 3,
        "modules": false,
      }
    ]
  ],
  plugins: []
}

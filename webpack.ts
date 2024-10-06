// webpack.config.js
module.exports = {
    // ...
    output: {
      filename: '[@liveblocks].js',
      chunkFilename: '[@liveblocks].[contenthash].js', // Specify a pattern for chunk filenames
      // ...
    },
    // ...
  };
  
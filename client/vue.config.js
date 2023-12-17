module.exports = {
  devServer: {
    proxy: {
      '^/users': {
        target: 'http://localhost:3333/',
        ws: true,
        changeOrigin: true
      },
    }
  }
}
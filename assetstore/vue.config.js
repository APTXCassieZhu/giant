// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#ff0000',
          'link-color': '#ff0000',
          'border-radius-base': '20px',
        },
        javascriptEnabled: true
      }
    }
  }
}
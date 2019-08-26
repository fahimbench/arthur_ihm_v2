module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: process.env.VUE_APP_SLACKAPIURL,
                ws: true,
                changeOrigin: true,
            },
        }
    }
}
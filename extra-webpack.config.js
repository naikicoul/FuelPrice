console.log('custom webpack config');
module.exports = {
    node: {
        path: true,
        crypto: true,
        fs: 'empty'
    }
};

function getScopedNameGenerator () {
    if (process.env.NODE_ENV == 'production') {
        return '[hash:base64:7]';
    }

    return '[name]__[local]__[hash:base64:5]';
}

module.exports = {
    modules: true,
    plugins: {
        'autoprefixer': true,
        'postcss-modules': {
            generateScopedName: getScopedNameGenerator()
        }
    }
};
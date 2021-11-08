module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['react', 'react-hooks'],
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/jsx-props-no-spreading': ['off'],
        'jsx-a11y/label-has-associated-control': ['warn', {assert: 'either'}],
        indent: 'off',
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/jsx-curly-newline': 'off',
        'react/prop-types': 'off',
        'import/no-unresolved': 'off',
        'prettier/prettier': 0,
        'react-hooks/rules-of-hooks': 'warn',
        'react/self-closing-comp': 'off',
        'object-shorthand': 0,
        'no-param-reassign': 0,
        'no-unused-vars': 0,
        'import/newline-after-import': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'import/no-extraneous-dependencies': 0,
        'react/no-array-index-key': 0,
        'dot-notation': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'no-void': 0,
        "import/extensions": "off"
    }
};

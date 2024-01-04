/** We extend a variety of already-configured ESLint rules (see `extends` in the exported ESLint
 * config below). Note that plugins (see `plugins`) simply give us access to rules. We can extend
 * rules from those plugins, if an exported configuration is available, or we can customize
 * individual rules ourselves (see `customRules`). We can also extend rules and then override some
 * of them (see `airbnbOverrides`). To inspect a configured rule that we're extending, simply go to
 * the package repository and search for the rule name (e.g. https://github.com/airbnb/javascript/search?q=arrow-parens).
 */

// Rules that override the airbnb configuration that we extend.
const airbnbOverrides = {
  // Files.com: Brevity.
  // Airbnb: Consistency. Diff churn. Inconvenience of adding/removing parens as code changes.
  'arrow-parens': ['error', 'as-needed'],

  // Files.com: Consistency. Diff churn. Inconvenience of adding/removing braces as code changes.
  // Airbnb: Brevity (only require curly braces for multi-line statements, allowing for single-line
  // `if` statements with no braces, for example).
  curly: ['error', 'all'],

  // Airbnb: Enforces strict equality with the exception of loose equality checks on null (which is
  // an easy way to check for either null or undefined). See
  // https://github.com/airbnb/javascript/issues/1473#issuecomment-312178468.
  // Files.com: No exceptions to strict equality. For a check of either null or undefined, prefer
  // isNil() from lodash which does a loose equality check under the hood, but demonstrates explicit
  // intent when used in our codebase.
  eqeqeq: ['error', 'always'],

  // Function names allow for a better debugging experience (i.e. eliminates anonymous function
  // exceptions). Airbnb has this set to warn, and they recommend always naming functions (in order
  // to eliminate any assumptions made about the Error's call stack). However, in our case, the name
  // is inferred from the containing variable (modern browsers already handle this, as do compilers
  // such as Babel, which we use). Therefore, we can use the 'as-needed' option and only require a
  // name when it isn't assigned automatically per the ECMAScript specification.
  'func-names': ['error', 'as-needed'],

  // Enforced by Airbnb style guide, but not yet enforced via Airbnb's lint rules. This is on
  // Airbnb's TODO list, but we'll go ahead and enforce it now. We can remove override after they
  // enforce expression with an error.
  'func-style': ['error', 'expression'],

  // Airbnb: warn
  'no-console': 'error',

  // Airbnb: off
  'padding-line-between-statements': [
    'error',
    {
      blankLine: 'always',
      next: '*',
      prev: [
        'block',
        'block-like',
        'multiline-block-like',
        'multiline-const',
        'multiline-expression',
        'multiline-let',
      ],
    },
  ],

  // Files.com: Brevity.
  // Airbnb: Rare code-safety concerns that may grow with new editions of ECMAScript.
  semi: ['error', 'never'],

  // Airbnb has this configured, but disabled. We enable it with their configuration, given that
  // Files.com prefers alphabetization. Also see the 'react/jsx-sort-props' and
  // sort-destructure-keys rules.
  'sort-keys': ['error', 'asc', { caseSensitive: false, natural: true }],
}

// Temporary overrides of our extended configurations, until we've either cleaned up all errors or
// make a decision to permanently override a rule. To clean up, remove rule (allowing the extended
// style guide to take over), run lint, and fix errors.
const temporaryOverrides = {
  camelcase: ['warn', { ignoreDestructuring: false, properties: 'never' }],
  'consistent-return': 'warn',
  'global-require': 'off',
  'guard-for-in': 'warn',
  'implicit-arrow-linebreak': 'off',
  'import/no-dynamic-require': 'warn',
  'import/no-import-module-exports': 'off',
  'import/no-named-as-default': 'warn',
  'import/prefer-default-export': 'warn',
  'jest/no-conditional-expect': 'warn',
  'jsx-a11y/label-has-associated-control': ['warn', {
    assert: 'either',
    controlComponents: ['Input', 'Field'],
    depth: 25,
    labelAttributes: [],
    labelComponents: [],
  }],
  'jsx-a11y/no-autofocus': ['warn', { ignoreNonDOM: true }],
  'max-len': "off",
  'no-await-in-loop': 'warn',
  'no-confusing-arrow': ['warn', { allowParens: true }],
  'no-continue': 'warn',
  'no-empty-function': ['warn', {
    allow: [
      'arrowFunctions',
      'functions',
      'methods',
    ],
  }],
  'no-nested-ternary': 'off',
  'no-param-reassign': 'off',
  'no-plusplus': 'off',
  'no-promise-executor-return': 'warn',
  'no-restricted-exports': ['warn', { restrictedNamedExports: ['default', 'then'] }],
  'no-restricted-syntax': [
    'warn',
    {
      message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      selector: 'ForInStatement',
    },
    {
      message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
      selector: 'ForOfStatement',
    },
    {
      message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      selector: 'LabeledStatement',
    },
    {
      message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      selector: 'WithStatement',
    },
  ],
  'no-return-await': 'warn',
  'no-shadow': 'warn',
  'no-underscore-dangle': 'off',
  'import/extensions': 'off',
  radix: 'warn',
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // Rule names without prefixes (standard ESLint rules), and those prefixed with jsx-a11y/,
    // react/, and import/
    'airbnb',

    // Rule names prefixed with jest/
    'plugin:jest/recommended',
  ],
  overrides: [
    {
      files: ['*_spec.js'], // cypress specs
      rules: {
        'jest/expect-expect': 'off',
      },
    },
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['jest'],
  rules: {
    ...airbnbOverrides,
    ...temporaryOverrides,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
}

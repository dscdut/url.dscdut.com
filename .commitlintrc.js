module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['enhancement', 'build', 'feat', 'fix', 'refactor', 'docs','update','revert']],
      },
};
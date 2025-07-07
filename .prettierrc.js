module.exports = {
  // 最大行宽
  printWidth: 100,
  // 使用单引号
  singleQuote: true,
  // 在对象或数组最后一个元素后面加逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // jsx 使用双引号
  jsxSingleQuote: false,
  // 插件配置
  plugins: ['prettier-plugin-tailwindcss', '@ianvs/prettier-plugin-sort-imports'],
  // import 排序配置
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/components/(.*)$',
    '^@/hooks/(.*)$',
    '^@/utils/(.*)$',
    '^@/(.*)$',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
} 
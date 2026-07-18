import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import siteConfig, { tokenizeSearch } from '../src/.vitepress/config.mjs'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceRoot = path.join(projectRoot, 'src')
const sectionRoot = path.join(
  sourceRoot,
  'base',
  'infrastructure',
  'linux'
)
const roadmapFile = path.join(sectionRoot, 'learning-roadmap.md')

const errors = []
const requireFromVitePress = createRequire(import.meta.resolve('vitepress'))
const MiniSearch = requireFromVitePress('minisearch')

function walkMarkdown(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) return walkMarkdown(absolute)
    return entry.name.endsWith('.md') ? [absolute] : []
  })
}

function relative(file) {
  return path.relative(sectionRoot, file).replaceAll('\\', '/')
}

function targetExists(source, href) {
  const clean = decodeURIComponent(href.split('#')[0].split('?')[0])
  const absolute = clean.startsWith('/')
    ? path.join(sourceRoot, clean)
    : path.resolve(path.dirname(source), clean)

  return [absolute, `${absolute}.md`, path.join(absolute, 'index.md')].some(
    fs.existsSync
  )
}

function checkLinks(file, lines) {
  const linkPattern = /(?<!!)\[([^\]]+)\]\(([^)]+)\)/g

  lines.forEach((line, index) => {
    for (const match of line.matchAll(linkPattern)) {
      const href = match[2].trim()
      if (/^(?:https?:|mailto:|#)/i.test(href)) continue
      if (!targetExists(file, href)) {
        errors.push(`${relative(file)}:${index + 1}: dead link ${href}`)
      }
    }
  })
}

function checkStructure(file, lines) {
  let containerDepth = 0
  let inFence = false
  let seeAlsoLine = -1

  lines.forEach((line, index) => {
    const trimmed = line.trim()

    if (/^```/.test(trimmed)) {
      inFence = !inFence
      return
    }
    if (inFence) return

    if (/^:::\s*$/.test(trimmed)) {
      if (containerDepth === 0) {
        errors.push(`${relative(file)}:${index + 1}: unexpected container close`)
      } else {
        containerDepth -= 1
      }
      return
    }
    if (/^:::\s*[a-z]/i.test(trimmed)) {
      containerDepth += 1
      return
    }

    if (/^## См\. также\s*$/.test(trimmed)) seeAlsoLine = index
    if (seeAlsoLine >= 0 && index > seeAlsoLine && /^##\s+/.test(trimmed)) {
      errors.push(
        `${relative(file)}:${index + 1}: level-two heading after See also`
      )
      seeAlsoLine = Number.POSITIVE_INFINITY
    }
  })

  if (containerDepth !== 0) {
    errors.push(`${relative(file)}: unclosed custom container`)
  }
  if (inFence) errors.push(`${relative(file)}: unclosed code fence`)
}

function checkRiskyExamples(file, lines) {
  lines.forEach((line, index) => {
    const location = `${relative(file)}:${index + 1}`

    if (/\bfind\b.*\|\s*xargs\b/.test(line)) {
      if (!/-print0\b/.test(line) || !/xargs\s+-0\b/.test(line)) {
        errors.push(`${location}: find | xargs must use NUL delimiters`)
      }
    }
    if (/for\s+\w+\s+in\s+\$\(cat\b/.test(line)) {
      errors.push(`${location}: read files with while IFS= read -r`)
    }
    if (/\bsudo\s+[^|]+>\s*\/(?:etc|proc|sys)\//.test(line)) {
      errors.push(`${location}: sudo does not elevate shell redirection`)
    }
    if (/\bss\b.*\|\s*grep\s+:[0-9]+/.test(line)) {
      errors.push(`${location}: use an ss port filter instead of grep`)
    }
  })
}

function checkRoadmap(file) {
  if (!fs.existsSync(file)) {
    errors.push('learning-roadmap.md: missing file')
    return
  }

  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)
  const stages = []

  lines.forEach((line, index) => {
    const match = line.match(/^## Этап (\d+)\./)
    if (match) stages.push({ number: Number(match[1]), line: index })
  })

  const stageNumbers = stages.map(({ number }) => number)
  const expectedStageNumbers = Array.from({ length: 12 }, (_, index) => index + 1)
  if (JSON.stringify(stageNumbers) !== JSON.stringify(expectedStageNumbers)) {
    errors.push(
      `learning-roadmap.md: expected stages 1-12, got ${stageNumbers.join(', ')}`
    )
  }

  const requiredSections = [
    '### Результат',
    '### Изучить',
    '### Практика',
    '### Проверьте себя'
  ]

  stages.forEach((stage, index) => {
    const end = stages[index + 1]?.line ?? lines.length
    const stageLines = lines.slice(stage.line + 1, end)
    for (const heading of requiredSections) {
      const count = stageLines.filter((line) => line === heading).length
      if (count !== 1) {
        errors.push(
          `learning-roadmap.md: stage ${stage.number} must contain one ${heading}`
        )
      }
    }
  })

  const projects = lines
    .map((line) => line.match(/^### Проект (\d+)\./)?.[1])
    .filter(Boolean)
    .map(Number)
  if (JSON.stringify(projects) !== JSON.stringify([1, 2, 3, 4])) {
    errors.push(
      `learning-roadmap.md: expected projects 1-4, got ${projects.join(', ')}`
    )
  }
}

const markdownFiles = walkMarkdown(sectionRoot)

for (const file of markdownFiles) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)
  checkLinks(file, lines)
  checkStructure(file, lines)
  checkRiskyExamples(file, lines)
}

checkRoadmap(roadmapFile)

const sectionPrefix = '/base/infrastructure/linux/'
const roadmapRoute = `${sectionPrefix}learning-roadmap`
const sidebarLinks = new Set()

function collectSidebarLinks(items) {
  for (const item of items ?? []) {
    if (typeof item.link === 'string') {
      sidebarLinks.add(item.link.replace(/index$/, '').replace(/\.md$/, ''))
    }
    collectSidebarLinks(item.items)
  }
}

function routeForMarkdown(file) {
  const markdown = relative(file)
  if (markdown === 'index.md') return sectionPrefix
  if (markdown.endsWith('/index.md')) {
    return sectionPrefix + markdown.slice(0, -'index.md'.length)
  }
  return sectionPrefix + markdown.slice(0, -'.md'.length)
}

collectSidebarLinks(siteConfig.themeConfig.sidebar['/base/'])
const expectedRoutes = new Set(markdownFiles.map(routeForMarkdown))
const sectionSidebarLinks = [...sidebarLinks].filter((link) =>
  link.startsWith(sectionPrefix)
)

for (const route of expectedRoutes) {
  if (!sidebarLinks.has(route)) errors.push(`sidebar: missing ${route}`)
}
if (!sidebarLinks.has(roadmapRoute)) {
  errors.push(`sidebar: missing ${roadmapRoute}`)
}
for (const route of sectionSidebarLinks) {
  if (!expectedRoutes.has(route)) errors.push(`sidebar: unknown ${route}`)
}

const tokenizerCases = new Map([
  ['/etc/fstab', ['etc', 'fstab']],
  ['rm -rf', ['rm', '-rf', 'rf']],
  ['systemctl --failed', ['systemctl', '--failed', 'failed']],
  ['Bash-скрипты', ['bash-скрипты', 'bash', 'скрипты']],
  ['ssh-copy-id', ['ssh-copy-id', 'ssh', 'copy', 'id']],
  ['Всё ещё', ['всё', 'все', 'ещё', 'еще']],
  ['C++ и node.js', ['c++', 'и', 'node.js', 'node', 'js']],
  [
    'Пользователи-и-группы',
    ['пользователи-и-группы', 'пользователи', 'и', 'группы']
  ]
])

for (const [input, expected] of tokenizerCases) {
  const actual = tokenizeSearch(input)
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    errors.push(
      `search tokenizer: ${JSON.stringify(input)} returned ${JSON.stringify(actual)}`
    )
  }
}

try {
  const serializedTokenizer = Function(
    '"use strict"; return (' + tokenizeSearch.toString() + ')'
  )()
  const serializedTokens = serializedTokenizer('Bash-скрипты')
  if (!serializedTokens.includes('скрипты')) {
    errors.push('serialized search tokenizer: missing скрипты token')
  }
  const titleTokens = serializedTokenizer('Bash-скрипты', 'title')
  if (!titleTokens.includes('crhbgns')) {
    errors.push('serialized search tokenizer: missing keyboard-layout token')
  }
} catch (error) {
  errors.push('serialized search tokenizer: ' + error)
}

const miniSearchConfig = siteConfig.themeConfig.search.options.miniSearch
const searchIndex = new MiniSearch({
  fields: ['title', 'titles', 'text'],
  storeFields: ['title', 'titles'],
  searchOptions: {
    fuzzy: 0.2,
    prefix: true,
    boost: { title: 4, text: 2, titles: 1 },
    ...miniSearchConfig.searchOptions
  },
  ...miniSearchConfig.options
})

searchIndex.addAll([
  { id: 'bash', title: 'Bash-скрипты', titles: [], text: '' },
  {
    id: 'users',
    title: 'Пользователи-и-группы',
    titles: [],
    text: ''
  },
  { id: 'yo', title: 'Всё ещё работает', titles: [], text: '' },
  { id: 'ssh', title: 'ssh-copy-id', titles: [], text: '' }
])

for (const [query, expectedId] of [
  ['скрипты', 'bash'],
  ['crhbgns', 'bash'],
  ['груп', 'users'],
  ['пользоватили', 'users'],
  ['все еще', 'yo'],
  ['copy', 'ssh']
]) {
  const found = searchIndex.search(query).some(({ id }) => id === expectedId)
  if (!found) {
    errors.push(`local search: ${JSON.stringify(query)} did not find ${expectedId}`)
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  console.error(`Linux docs checks failed with ${errors.length} error(s).`)
  process.exit(1)
}

console.log(`Linux docs checks passed for ${markdownFiles.length} Markdown files.`)

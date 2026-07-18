import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import siteConfig, { tokenizeSearch } from '../src/.vitepress/config.mjs'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceRoot = path.join(projectRoot, 'src')
const sectionRoot = path.join(
  sourceRoot,
  'base',
  'infrastructure',
  'linux',
  'commands'
)

const errors = []

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

const markdownFiles = walkMarkdown(sectionRoot)

for (const file of markdownFiles) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)
  checkLinks(file, lines)
  checkStructure(file, lines)
  checkRiskyExamples(file, lines)
}

const sectionPrefix = '/base/infrastructure/linux/commands/'
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
for (const route of sectionSidebarLinks) {
  if (!expectedRoutes.has(route)) errors.push(`sidebar: unknown ${route}`)
}

const tokenizerCases = new Map([
  ['/etc/fstab', ['etc', 'fstab']],
  ['rm -rf', ['rm', '-rf']],
  ['systemctl --failed', ['systemctl', '--failed']]
])

for (const [input, expected] of tokenizerCases) {
  const actual = tokenizeSearch(input)
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    errors.push(
      `search tokenizer: ${JSON.stringify(input)} returned ${JSON.stringify(actual)}`
    )
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  console.error(`Linux docs checks failed with ${errors.length} error(s).`)
  process.exit(1)
}

console.log(`Linux docs checks passed for ${markdownFiles.length} Markdown files.`)

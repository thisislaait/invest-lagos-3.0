import fs from 'fs'
import path from 'path'
import SimulationClient from './SimulationClient'

export default function SimulationPage() {
  const htmlPath = path.join(process.cwd(), 'lib', 'simulation.html')
  const rawHtml = fs.readFileSync(htmlPath, 'utf-8')

  const cssMatch = rawHtml.match(/<style>([\s\S]*?)<\/style>/)
  const css = cssMatch ? cssMatch[1] : ''

  const bodyMatch = rawHtml.match(/<body>([\s\S]*)<\/body>/)
  const bodyContent = bodyMatch ? bodyMatch[1] : ''
  const cleanBody = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '')

  return <SimulationClient bodyHtml={cleanBody} css={css} />
}

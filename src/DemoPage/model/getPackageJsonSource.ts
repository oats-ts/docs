import type { PackageJson } from 'type-fest'
import pkg from '../../../package.json'
import { Dep } from '../../types'

const oatsVersion = pkg.dependencies['@oats-ts/oats-ts']

// TODO might be worth getting the latest version from non-oats packages?
function asRuntimeDep(name: string): Dep {
  if (name.startsWith('@oats-ts/')) {
    return { name, version: oatsVersion }
  }
  if (name === 'express') {
    return { name, version: '^4.18.1' }
  }
  return { name, version: '*' }
}

function getDependencyObject(dependencies: Dep[]): Record<string, string> {
  return Array.from(dependencies)
    .sort((a, b) => a.name.localeCompare(b.name))
    .reduce((obj: Record<string, string>, { name, version }: Dep) => ({ ...obj, [name]: version }), {})
}

export function getPackageJsonSource(deps: string[], versionMap: Record<string, string>): string {
  const dependencies = getDependencyObject(deps.map(asRuntimeDep))
  const packageJson: PackageJson = {
    name: 'your-project',
    version: '1.0.0',
    description: "You will need 'devDependencies' to run oats, and 'dependencies' make it's output work at runtime.",
    scripts: {
      oats: 'ts-node ./generate.ts',
    },
    ...(deps.length === 0 ? {} : { dependencies }),
    devDependencies: getDependencyObject([
      { name: '@oats-ts/oats-ts', version: oatsVersion },
      { name: '@oats-ts/openapi', version: oatsVersion },
      { name: 'typescript', version: versionMap['typescript']! },
      { name: 'ts-node', version: versionMap['ts-node']! },
    ]),
  }
  return JSON.stringify(packageJson, null, 2)
}

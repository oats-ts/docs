import type { PackageJson } from 'type-fest'
import pkg from '../../../package.json'

const oatsVersion = pkg.dependencies['@oats-ts/oats-ts']

function getDependencyObject(dependencies: string[]): Record<string, string> {
  return Array.from(dependencies)
    .sort((a, b) => a.localeCompare(b))
    .reduce((obj: Record<string, string>, dep: string) => {
      if (dep.startsWith('@oats-ts/')) {
        return { ...obj, [dep]: oatsVersion }
      }
      if (dep === 'express') {
        return { ...obj, [dep]: '^4.18.1' }
      }
      if (dep === 'ts-node') {
        return { ...obj, [dep]: '^10.9.1' }
      }
      return { ...obj, [dep]: '*' }
    }, {})
}

export function getPackageJsonSource(dependencies: string[]): string {
  const packageJson: PackageJson = {
    name: 'your-project',
    version: '1.0.0',
    description: "You will need 'devDependencies' to run oats, and 'dependencies' make it's output work at runtime.",
    scripts: {
      oats: 'ts-node ./generate.ts',
    },
    dependencies: getDependencyObject(dependencies),
    devDependencies: getDependencyObject(['@oats-ts/oats-ts', '@oats-ts/openapi']),
  }
  return JSON.stringify(packageJson, null, 2)
}

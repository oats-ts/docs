import { RuntimeDependency, version } from '@oats-ts/oats-ts'
import type { PackageJson } from 'type-fest'

function getDependencyObject(dependencies: RuntimeDependency[]): Record<string, string> {
  return Array.from(dependencies)
    .sort((a, b) => a.name.localeCompare(b.name))
    .reduce((obj: Record<string, string>, { name, version }: RuntimeDependency) => ({ ...obj, [name]: version }), {})
}

export function getPackageJsonSource(deps: RuntimeDependency[], versionMap: Record<string, string>): string {
  const dependencies = getDependencyObject(deps)
  const packageJson: PackageJson = {
    name: 'your-project',
    version: '1.0.0',
    description: "You will need 'devDependencies' to run oats, and 'dependencies' make it's output work at runtime.",
    scripts: {
      oats: 'ts-node ./generate.ts',
    },
    ...(deps.length === 0 ? {} : { dependencies }),
    devDependencies: getDependencyObject([
      { name: '@oats-ts/oats-ts', version },
      { name: '@oats-ts/openapi', version },
      { name: 'typescript', version: versionMap['typescript']! },
      { name: 'ts-node', version: versionMap['ts-node']! },
    ]),
  }
  return JSON.stringify(packageJson, null, 2)
}

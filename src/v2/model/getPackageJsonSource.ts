import { RuntimeDependency, version } from '@oats-ts/oats-ts'
import type { PackageJson } from 'type-fest'

function getDependencyObject(dependencies: RuntimeDependency[]): Record<string, string> {
  return Array.from(dependencies)
    .sort((a, b) => a.name.localeCompare(b.name))
    .reduce((obj: Record<string, string>, { name, version }: RuntimeDependency) => ({ ...obj, [name]: version }), {})
}

export function getPackageJsonSource(deps: RuntimeDependency[], _versionMap: Record<string, string>): string {
  const dependencies = getDependencyObject(deps)
  const packageJson: PackageJson = {
    scripts: {
      oats: 'node ./oats.js',
    },
    ...(deps.length === 0 ? {} : { dependencies }),
    devDependencies: getDependencyObject([{ name: '@oats-ts/openapi', version }]),
  }
  return JSON.stringify(packageJson, null, 2)
}

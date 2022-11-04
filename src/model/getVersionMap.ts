import { prerelease, gt } from 'semver'
import { isNil } from 'lodash'
import { RuntimeDependency } from '@oats-ts/oats-ts'

const versionCache: Record<string, string> = {}

async function getLastestVersion(name: string): Promise<RuntimeDependency> {
  if (typeof versionCache[name] !== 'string') {
    try {
      const response = await fetch(`https://registry.npmjs.org/${name}`)
      const data = await response.json()
      const keys = Object.keys(data.versions)
        .filter((version) => isNil(prerelease(version)))
        .sort((latest, version) => (gt(version, latest) ? 1 : -1))
      versionCache[name] = keys[0] ?? '*'
    } catch (e) {
      // Doesn't make sense to retry.
      versionCache[name] = '*'
      console.error(e)
    }
  }
  return { name, version: versionCache[name]! }
}

export async function getVersionMap(...packages: string[]): Promise<Record<string, string>> {
  const results = await Promise.all(packages.map((pkg) => getLastestVersion(pkg)))
  return results.reduce(
    (versionMap: Record<string, string>, { name, version }: RuntimeDependency) => ({ ...versionMap, [name]: version }),
    {},
  )
}

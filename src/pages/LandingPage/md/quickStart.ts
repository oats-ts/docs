import { default as ConfigureOats } from './ConfigureOats.md'
import { default as InstallOats } from './InstallOats.md'
import { default as NextSteps } from './NextSteps.md'
import { default as PrepareInput } from './PrepareInput.md'
import { default as RunOats } from './RunOats.md'
import { default as VerifyResults } from './VerifyResults.md'
import { QuickStartDescriptor } from '../../../types'

const configureOatsDescriptor: QuickStartDescriptor = {
  title: 'Configure Oats',
  content: ConfigureOats.substring(ConfigureOats.indexOf('\n') + 1).trim(),
}

const installOatsDescriptor: QuickStartDescriptor = {
  title: 'Install Oats',
  content: InstallOats.substring(InstallOats.indexOf('\n') + 1).trim(),
}

const nextStepsDescriptor: QuickStartDescriptor = {
  title: 'Next steps',
  content: NextSteps.substring(NextSteps.indexOf('\n') + 1).trim(),
}

const prepareInputDescriptor: QuickStartDescriptor = {
  title: 'Prepare your OpenAPI document',
  content: PrepareInput.substring(PrepareInput.indexOf('\n') + 1).trim(),
}

const runOatsDescriptor: QuickStartDescriptor = {
  title: 'Run Oats',
  content: RunOats.substring(RunOats.indexOf('\n') + 1).trim(),
}

const verifyResultsDescriptor: QuickStartDescriptor = {
  title: 'Verify results',
  content: VerifyResults.substring(VerifyResults.indexOf('\n') + 1).trim(),
}

export const quickStart = {
  configureOatsDescriptor,
  installOatsDescriptor,
  nextStepsDescriptor,
  prepareInputDescriptor,
  runOatsDescriptor,
  verifyResultsDescriptor,
}

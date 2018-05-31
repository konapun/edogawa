import edoInstrumenter from './instrumenter'
import matcher from './matchers'
import language from './languages'

function edogawa (options) {
  const extendedOpts = {
    language: language.JAVASCRIPT,
    repository: null, // if repository is null, edogawa will attempt to locate it
    ...options
  }

  const instrumenter = edoInstrumenter(extendedOpts)

  return {
    instrument: instrumenter.instrument,
  }
}

export { matcher as matchers }
export { language as languages }
export default edogawa

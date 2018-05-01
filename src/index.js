import edoInstrumenter from './instrumenter'
import matcher from './matchers'
import language from './languages'

function edogawa (options) {
  const extendedOpts = {
    language: language.JAVASCRIPT,
    ...options
  }

  const instrumenter = edoInstrumenter(extendedOpts)

  return {
    instrument: instrumenter.instrument,

    // enums
    language,
    matcher
  }
}

export default edogawa

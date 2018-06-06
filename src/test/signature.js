function signature (gitnodeSig) {
  return {
    get email () {
      return gitnodeSig.email()
    },

    get name () {
      return gitnodeSig.name()
    },

    get when () {
      return gitnodeSig.when()
    }
  }
}

export default signature

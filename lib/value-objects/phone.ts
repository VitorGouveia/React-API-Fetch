const utils = {
  unmaskData: (mobile: string) => mobile.replace(/[^0-9]/g, ""),
  parseMobile: (mobile: string) => {
    const parseMobileRegex = /^0?(55)?0?(\d{2})?(9?\d{8})$/g
    const numberParsed = [...mobile.matchAll(parseMobileRegex)][0]

    return numberParsed
  },
  mobileConsolidation: /^55\d{2}9?\d{8}$/g,
}

export class Phone {
  static create(input: string) {
    let mobile = utils.unmaskData(input)

    if (mobile.length < 10 || mobile.length > 15) {
      throw new Error("Número de celular inválido")
    }

    const mobileParsed = utils.parseMobile(mobile)

    mobile = mobileParsed.slice(1, 4).join("")

    if (mobileParsed[1] === undefined) mobile = `55${mobile}`

    try {
      utils.mobileConsolidation.test(mobile)
      return mobile
    } catch (error) {
      throw new Error("Número de celular inválido")
    }
  }
}

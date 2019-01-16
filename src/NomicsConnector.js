import axios from 'axios'
import memoize from 'memoizee'

class NomicsConnector {
  constructor(apiKey) {
    this.client = axios.create({
      baseURL: 'https://api.nomics.com/v1',
      method: 'get',
      repsonseType: 'json',
      params: { key: apiKey }
    })

    this.getPricesByCurrencyCached = memoize(
      this.getPricesByCurrency,
      {
        maxAge: 300000, //5 minutes til cache expiration
        preFetch: 0.05, //pre-fetch 15s before expiration
        promise: 'then' //handle async
      }
    )
  }

  async getPrices() {
    const response = await this.client('/prices')
    return response.data
  }

  async getPricesByCurrency() {
    const prices = await this.getPrices()
    return prices.reduce(
      (pricesByCurrency, { currency, price }) => {
      pricesByCurrency[currency] = price
      return pricesByCurrency
    }, {})
  }

  async getPrice(currency) {
    const pricesByCurrency = await this.getPricesByCurrencyCached()
    return pricesByCurrency[currency]
  }
}

export default NomicsConnector

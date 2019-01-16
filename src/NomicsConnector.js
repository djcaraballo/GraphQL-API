import axios from 'axios'
import { apiKey } from "../apiKey"

class NomicsConnector {
  constructor(apiKey) {
    this.client = axios.create({
      baseURL: 'https://api.nomics.com/v1',
      method: 'get',
      repsonseType: 'json',
      params: { key: apiKey }
    })
  }

  async getPrices() {
    const response = await this.client('/prices')
    return response.data
  }
}

export default NomicsConnector

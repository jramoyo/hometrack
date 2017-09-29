const concataddress = address => `${address.buildingNumber} ${address.street} ${address.suburb} ${address.state} ${address.postcode}`

class Service {
  process (payload) {
    return payload
      .filter(item => item.workflow === 'completed' && item.type === 'htv')
      .map(item => {
        return {
          concataddress: concataddress(item.address),
          type: item.type,
          workflow: item.workflow
        }
      })
  }
}

module.exports = Service

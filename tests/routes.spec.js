const chai = require('chai')
chai.use(require('chai-http'))

const app = require('../index')
const expect = chai.expect

describe('endpoint', () => {
  describe('POST /', () => {
    it('returns a list items having workflow completed for the type htv', () => {
      return chai.request(app).post('/')
      .send(request)
      .then(res => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.eql(response)
      })
    })

    it('returns an empty list if the payload is empty', () => {
      return chai.request(app).post('/')
      .send({ 'payload': [] })
      .then(res => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.eql({ 'response': [] })
      })
    })

    it('returns 400 if the payload is missing', () => {
      return chai.request(app).post('/')
      .send({})
      .catch(err => {
        expect(err.response).to.have.status(400)
        expect(err.response).to.be.json
        expect(err.response.body).to.eql({
          'error': 'Request payload is missing'
        })
      })
    })

    it('returns 400 if the payload contains an item without an address', () => {
      return chai.request(app).post('/')
      .send({
        'payload': [{
          'type': 'htv',
          'workflow': 'completed'
        }]
      })
      .catch(err => {
        expect(err.response).to.have.status(400)
        expect(err.response).to.be.json
        expect(err.response.body).to.eql({
          'error': 'Request payload contains an item without an address'
        })
      })
    })

    it('returns 400 if an invalid JSON is received', () => {
      return chai.request(app).post('/')
      .set('Content-type', 'application/json')
      .send('qwerty')
      .catch(err => {
        expect(err.response).to.have.status(400)
        expect(err.response).to.be.json
        expect(err.response.body).to.eql({
          'error': 'Could not decode request: JSON parsing failed'
        })
      })
    })
  })
})

const request = {
  'payload': [
    {
      'address': {
        'buildingNumber': '28',
        'lat': -33.912542000000002,
        'lon': 151.00293199999999,
        'postcode': '2198',
        'state': 'NSW',
        'street': 'Donington Ave',
        'suburb': 'Georges Hall'
      },
      'propertyTypeId': 3,
      'readyState': 'init',
      'reference': 'aqsdasd',
      'shortId': '6Laj49N3PiwZ',
      'status': 0,
      'type': 'htv',
      'workflow': 'pending'
    },
    {
      'address': {
        'buildingNumber': 'Level 6',
        'postcode': '2060',
        'state': 'NSW',
        'street': '146 Arthur Street',
        'suburb': 'North Sydney'
      },
      'propertyTypeId': 3,
      'readyState': 'init',
      'reference': 'asdasd',
      'shortId': 'E9eQVYEMkub2',
      'status': 4,
      'type': 'htv',
      'valfirm': null,
      'workflow': 'completed'
    },
    {
      'address': {
        'buildingNumber': '25',
        'postcode': '4000',
        'state': 'QLD',
        'street': 'Mary St',
        'suburb': 'Brisbane'
      },
      'propertyTypeId': 3,
      'readyState': 'init',
      'reference': 'asdas',
      'shortId': 'nQMyWWLBvu4A',
      'status': 1,
      'type': 'avm',
      'workflow': 'pending'
    },
    {
      'address': {
        'buildingNumber': '92',
        'postcode': '2000',
        'state': 'NSW',
        'street': 'Pitt Street',
        'suburb': 'Sydney',
        'unitNumber': 'Suite 1 Level 8'
      },
      'propertyTypeId': 3,
      'readyState': 'complete',
      'reference': 'asdasd',
      'shortId': 'ZM73nE4nKH56',
      'status': 4,
      'type': 'avm',
      'workflow': 'cancelled'
    },
    {
      'address': {
        'buildingNumber': '28',
        'lat': -33.912542000000002,
        'lon': 151.00293199999999,
        'postcode': '2198',
        'state': 'NSW',
        'street': 'Donington Ave',
        'suburb': 'Georges Hall'
      },
      'propertyTypeId': 3,
      'readyState': 'complete',
      'reference': 'asdasdas',
      'shortId': 'AQzAB5xMXFNx',
      'status': 3,
      'type': 'avm',
      'workflow': 'completed'
    },
    {
      'address': {
        'buildingNumber': '360',
        'postcode': '3000',
        'state': 'VIC',
        'street': 'Elizabeth St',
        'suburb': 'Melbourne',
        'unitNumber': 'Level 28'
      },
      'propertyTypeId': 3,
      'readyState': 'complete',
      'reference': 'asdas',
      'shortId': 'yebZvgdA7FRk',
      'status': 1,
      'type': 'htv',
      'workflow': 'completed'
    },
    {
      'address': {
        'buildingNumber': '153',
        'postcode': '2229',
        'state': 'NSW',
        'street': 'Denman Avenue',
        'suburb': 'CARINGBAH',
        'unitNumber': 'Suite 7'
      },
      'propertyTypeId': 3,
      'readyState': 'complete',
      'reference': 'asdas',
      'shortId': 'YP7NJVNpVCdr',
      'status': 4,
      'type': 'htv',
      'workflow': 'cancelled'
    }
  ]
}

const response = {
  'response': [
    {
      'concataddress': 'Level 6 146 Arthur Street North Sydney NSW 2060',
      'type': 'htv',
      'workflow': 'completed'
    },
    {
      'concataddress': '360 Elizabeth St Melbourne VIC 3000',
      'type': 'htv',
      'workflow': 'completed'
    }
  ]
}

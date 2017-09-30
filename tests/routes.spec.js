const chai = require('chai')
chai.use(require('chai-http'))

const app = require('../index')
const expect = chai.expect

describe('endpoint', () => {
  describe('POST /', () => {
    it('returns a list items having workflow completed for the type htv', () => {
      const request = require('./sample-request.json')
      const response = require('./sample-response.json')
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

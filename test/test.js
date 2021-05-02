var app = require('../app.js'),
  chai = require('chai'),
  assert = require('assert'),
  should = require('should'),
  request = require('supertest');

let authtoken, userId, apartmentId;

//Test login
describe('/POST login', () => {
    it('it should login with JSON response', (done) => {
        let creds = {
          username: 'kaustubh91@gmail.com',
          password: 'testing'
        }
      request(app)
        .post('/users/login')
        .send(creds)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          authtoken = res.body.token;
          done();
        });
    });
});

//Get Users
describe('/GET users', () => {
    it('it should GET all the users', (done) => {
      request(app)
        .get('/users')
        .set({ "Authorization": `Bearer ${authtoken}` })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.have.property('users');
          done();
        });
    });
});

//Create User
describe('/POST users', () => {
    it('it should create a user', (done) => {
      let createUser = {"email": "testserver@test.com", "role": "client", "password": "testing", "name": "Test User4"}
      request(app)
        .post('/users/create/')
        .send(createUser)
        .set({ "Authorization": `Bearer ${authtoken}` })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.have.property('user');
          userId = res.body.user._id;
          done();
        });
    });
});

//Update User
describe('/PUT users', () => {
    it('it should update a user', (done) => {
      let updateUser = {"role": "realtor", "name": "Test User5"}
      request(app)
        .put('/users/update/' + userId)
        .send(updateUser)
        .set({ "Authorization": `Bearer ${authtoken}` })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.have.property('user');
          done();
        });
    });
});

//Delete User
describe('/DELETE users', () => {
    it('it should delete a user', (done) => {
      request(app)
        .delete('/users/delete/' + userId)
        .set({ "Authorization": `Bearer ${authtoken}` })
        .end((err, res) => {
          res.status.should.equal(200);
          done();
        });
    });
});


//Get Apartments
describe('/GET apartments', () => {
    it('it should GET all the apartments', (done) => {
      request(app)
        .get('/apartments')
        .set({ "Authorization": `Bearer ${authtoken}` })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.have.property('apartments');
          done();
        });
    });
});

//Create Apartment
describe('/POST apartments', () => {
    it('it should create an apartment', (done) => {
      let createApartment = {"area": 140, "price": 180, "rooms": 3, "name":"Server Test Apartment ", "description": "An affordable and spacious apartment located in the heart of the city", "realtorId": "singlewindowsearch@gmail.com", "location": { "type": "Point", "coordinates": [28.576168, 77.207553]} }
      request(app)
        .post('/apartments/create/')
        .send(createApartment)
        .set({ "Authorization": `Bearer ${authtoken}` })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.have.property('apartment');
          apartmentId = res.body.apartment._id;
          done();
        });
    });
});

//Update Apartment
describe('/PUT apartments', () => {
    it('it should update a user', (done) => {
      let updateApartment = {"area": 150, "price": 190};
      request(app)
        .put('/apartments/update/' + apartmentId)
        .send(updateApartment)
        .set({ "Authorization": `Bearer ${authtoken}` })
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.should.have.property('apartment');
          done();
        });
    });
});

//Delete Apartment
describe('/DELETE apartments', () => {
    it('it should delete an apartment', (done) => {
      request(app)
        .delete('/apartments/delete/' + apartmentId)
        .set({ "Authorization": `Bearer ${authtoken}` })
        .end((err, res) => {
          res.status.should.equal(200);
          done();
        });
    });
});

require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const {TEST_DATABASE_URL} = require('../config');
const {MakeupLook} = require('../makeup-looks/models');
const {app, runServer, closeServer} = require('../server');



chai.use(chaiHttp);

function seedMakeupData() {
  console.info('seeding data');
  const seedData=[];
  for(let i = 1; i<=10; i++) {
    seedData.push(generateMakeupData());
  }
  return MakeupLook.insertMany(seedData);
}

function generateSkinType() {
  let skinTypeArray = [];
  const types = ['N/A', 'oily', 'dry', 'combination', 'normal'];
  skinTypeArray.push(types[Math.floor(Math.random() * types.length)]);
  return skinTypeArray;
}

function generateMakeupData() {
  return {
    title: faker.lorem.words(),
    username: faker.lorem.word(),
    steps: [faker.lorem.words()],
    products: [faker.lorem.words()],
    skintype: generateSkinType(),
    colortheme: [faker.lorem.words()],
    publish: faker.date.recent()
  };
}

function generateUser() {
  return {
    username: faker.random.word(),
    password: faker.random.alphaNumeric()
  }
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}


describe('Makeitup API resources', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedMakeupData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  // GET
  describe('GET endpoint', function() {
    it('should return all makeup looks', function(){
      let res;
      return chai.request(app)
        .get('/api/makeuplooks/')
        .then(function(_res) {
          res = _res;
          res.should.have.status(200);
          res.should.be.json;
          return MakeupLook.count();
        })
    });

    it('should return looks with correct fields', function() {
      let resMakeupLook;
      return chai.request(app)
      .get('/api/makeuplooks/')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        resMakeupLook = res.body.makeupLooks[0];
        return MakeupLook.findById(resMakeupLook.id);
      })
        .then(look => {
          resMakeupLook.title.should.equal(look.title);
          let stringOne = look.steps.toString();
          let stringTwo = resMakeupLook.steps.toString();
          stringOne.should.equal(stringTwo);
        });
    });
  });

  // POST
  describe('POST endpoint', function() {
    it('should add a new makeup look', function() {
      const newLook = {
        title: faker.lorem.words(),
        steps: [faker.lorem.words()],
      };
      return chai.request(app)
        .post('/api/makeuplooks/create-test')
        .send(newLook)
        .then(function(res) {
          console.log("POST res", res);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys
            ('id', 'title', 'steps');
          res.body.title.should.equal(newLook.title);
          // Mongo should have created id on insertion
          return MakeupLook.findById(res.body.id)
          .then(function(look) {
            look.title.should.equal(resMakeupLook);
            look.steps.should.equal(resMakeupLook.steps);
          })
          .catch(function(err) {
            console.log("console log err", err);
          })
        })
        
    });
  });

  // PUT
  describe('PUT endpoint', function() {
    it('should update fields you send over', function() {
      const updateData = {
        title: 'Minimal Makeup',
        steps: ['Apply concealer', 'apply blush']
      };
      return MakeupLook
        .findOne()
        // assign updateData's id to that existing look's id
        .then(look => {
          updateData.id = look._id;
          return chai.request(app)
            .put(`/api/makeuplooks/update-test`)
            .send(updateData)
        })
        .then(res => {
          res.should.have.status(204);
          return MakeupLook.findById(updateData.id);
        })
        .then(look => {
          post.title.should.equal(updateData.title);
          post.steps.should.equal(updateData.steps);
        })
        .catch(function(err) {
          console.log("console log err", err);
        });
    });
  });


  describe('DELETE endpoint', function() {
    it('should delete a look by id', function() {
      let look;
      return MakeupLook
        .findOne()
        .then(_look => {
          look = _look;
          return chai.request(app).delete(`/api/makeuplooks/${look.id}`);
        })
        .then(res => {
          res.should.have.status(204);
          return MakeupLook.findById(look.id);
        })
        .then(_look => {
          should.not.exist(_look);
        });
    });
  });
});
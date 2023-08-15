const request = require("supertest");
const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const chaiaspromise = require("chai-as-promised");
const sinonChai = require("sinon-chai");
const rewire = require("rewire");

chai.use(chaiaspromise);
chai.use(sinonChai);

let fastify = require("../../src/app");
let sandbox = sinon.createSandbox();
const Report = require("../../src/models/reportModel");

before((done) => {
  fastify.ready();
  require("../../src/db/dbConnection");
  done();
});

beforeEach((done) => {
  Report.deleteMany();
  done();
});

afterEach((done) => {
  Report.deleteMany();
  sandbox.restore();
  done();
});

describe("auth", () => {
  let sampleReport;
  let sampleArgs;
  let findStub;

  context("GET /api/v1.0/findAll", function () {
    this.timeout(9000);
    it("Get all Reports", (done) => {
      request(fastify.server)
        .get("/api/v1.0/findAll")
        .end((err, response) => {
          expect(response.status).to.equal(401);
          expect(response.body.success).to.be.false;
          done(err);
        });
    });
  });
});

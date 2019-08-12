const chai = require("chai");
const chaiHttp = require("chai-http");
// const app = require('../../app');
const { assert } = chai;
chai.use(chaiHttp);

describe("Test trick controller", function() {
  describe("POST /trick", function() {
    describe("With correct data", function() {
      before(async function() {
        await chai
          .request(this.app)
          .delete("/tricks")
          .send();
        this.response = await chai
          .request(this.app)
          .post("/tricks")
          .send({
            name: "trick",
            complexity: 100,
            description: "Test text...",
          });
      });
      it("Should be status 201", function() {
        assert.equal(this.response.status, 201);
      });
      it("Check object", function() {
        assert.equal(this.response.body.id, 1);
        assert.equal(this.response.body.name, "trick");
        assert.equal(this.response.body.complexity, 100);
        assert.equal(this.response.body.description, "Test text...");
      });
    });
    describe("With uncorrect data", function() {
      before(async function() {
        await chai
          .request(this.app)
          .delete("/tricks")
          .send();
        this.response = await chai
          .request(this.app)
          .post("/tricks")
          .send({
            name: 112,
            description: "",
          });
      });
      it("Should be status 500", function() {
        assert.equal(this.response.status, 500);
      });
    });
  });

  describe("GET /tricks", function() {
    describe("With tricks", function() {
      before(async function() {
        await chai
          .request(this.app)
          .delete("/tricks")
          .send();
        for (let i = 0; i < 3; i++) {
          await chai
            .request(this.app)
            .post("/tricks")
            .send({
              name: `trick_${i}`,
              complexity: 100,
              description: "Test text...",
            });
        }
        this.response = await chai
          .request(this.app)
          .get("/tricks")
          .send();
      });
      it("Should be status 200", function() {
        assert.equal(this.response.status, 200);
      });
      it("List should have 3 item", function() {
        assert.lengthOf(this.response.body, 3);
      });
    });
    describe("Without tricks", function() {
      before(async function() {
        await chai
          .request(this.app)
          .delete("/tricks")
          .send();
        this.response = await chai
          .request(this.app)
          .get("/tricks")
          .send();
      });
      it("Should be status 200", function() {
        assert.equal(this.response.status, 200);
      });
      it("Body should be empty", function() {
        assert.lengthOf(this.response.body, 0);
      });
    });
  });

  describe("GET /tricks/:id", function() {
    describe("With tricks", function() {
      before(async function() {
        await chai
          .request(this.app)
          .delete("/tricks")
          .send();
        this.trick = await chai
          .request(this.app)
          .post("/tricks")
          .send({
            name: `trick`,
            complexity: 100,
            description: "Test text...",
          });
        this.response = await chai
          .request(this.app)
          .get(`/tricks/${this.trick.body.id}`)
          .send();
      });
      it("Should be status 200", function() {
        assert.equal(this.response.status, 200);
      });
      it("Check object", function() {
        assert.equal(this.trick.body.id, this.response.body.id);
      });
    });
    describe("Without tricks", function() {
      before(async function() {
        await chai
          .request(this.app)
          .delete("/tricks")
          .send();
        this.response = await chai
          .request(this.app)
          .get("/tricks/1")
          .send();
      });
      it("Should be status 200", function() {
        assert.equal(this.response.status, 200);
      });
      it("Body should be null", function() {
        assert.isNull(this.response.body);
      });
    });
  });

  describe("DELETE /tricks/:id", function() {
    describe("With tricks", function() {
      before(async function() {
        await chai
          .request(this.app)
          .delete("/tricks")
          .send();
        this.trick = await chai
          .request(this.app)
          .post("/tricks")
          .send({
            name: `trick`,
            complexity: 100,
            description: "Test text...",
          });
        this.response = await chai
          .request(this.app)
          .delete(`/tricks/${this.trick.body.id}`)
          .send();
      });
      it("Should be status 200", function() {
        assert.equal(this.response.status, 200);
      });
      it("Response equalse 1", function() {
        assert.equal(this.response.text, 1);
      });
    });
    describe("Without tricks", function() {
      before(async function() {
        await chai
          .request(this.app)
          .delete("/tricks")
          .send();
        this.response = await chai
          .request(this.app)
          .delete("/tricks/1")
          .send();
      });
      it("Should be status 200", function() {
        assert.equal(this.response.status, 200);
      });
      it("Response equalse 0", function() {
        assert.equal(this.response.text, 0);
      });
    });
  });

  describe("DELETE /tricks", function() {
    describe("With tricks", function() {
      before(async function() {
        await chai
          .request(this.app)
          .delete("/tricks")
          .send();
        for (let i = 0; i < 3; i++) {
          await chai
            .request(this.app)
            .post("/tricks")
            .send({
              name: `trick_${i}`,
              complexity: 100,
              description: "Test text...",
            });
        }
        this.response = await chai
          .request(this.app)
          .delete("/tricks")
          .send();
      });
      it("Should be status 200", function() {
        assert.equal(this.response.status, 200);
      });
      it("Delete response equalse 3", function() {
        assert.equal(this.response.text, 3);
      });
    });
    describe("Without tricks", function() {
      before(async function() {
        await chai
          .request(this.app)
          .delete("/tricks")
          .send();
        this.response = await chai
          .request(this.app)
          .delete("/tricks")
          .send();
      });
      it("Should be status 200", function() {
        assert.equal(this.response.status, 200);
      });
      it("Delete response equalse 0", function() {
        assert.equal(this.response.text, 0);
      });
    });
  });
});

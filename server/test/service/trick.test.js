var SequelizeMock = require("sequelize-mock");
var proxyquire = require("proxyquire");
const chai = require("chai");

const { assert } = chai;
var dbMock = new SequelizeMock();

var TrickMock = dbMock.define("Trick");

var trickService = proxyquire("../../src/service/trickService", {
  "../../src/models": {
    sequelize: SequelizeMock,
    Trick: TrickMock,
  },
});

describe("Tric mock unit test", function() {
  describe("#getTrickById", function() {
    before(function() {
      TrickMock.$queryInterface.$useHandler(function(
        query,
        queryOptions,
        done,
      ) {
        if (query === "findOne") {
          return TrickMock.build({
            id: 1,
            name: "Backflip",
            complexity: 100,
            description: "description",
          });
        } else {
          return null;
        }
      });
    });
    it("should return a trick by id", async function() {
      const result = await trickService.getTrickById(1);
      assert.equal(result.id, 1);
      assert.equal(result.name, "Backflip");
      assert.equal(result.complexity, "100");
      assert.equal(result.description, "description");
    });
    after(function() {
      TrickMock.$queryInterface.$clearResults();
    });
  });
  describe("#getTrickList", function() {
    before(function() {
      TrickMock.$queryInterface.$queueResult([
        TrickMock.build({
          id: 1,
          name: "trick1",
          complexity: 100,
          description: "description",
        }),
        TrickMock.build({
          id: 2,
          name: "trick2",
          complexity: 100,
          description: "description",
        }),
        TrickMock.build({
          id: 3,
          name: "trick3",
          complexity: 100,
          description: "description",
        }),
      ]);
    });
    it("should return a trick list with 3 item", async function() {
      const result = await trickService.getTrickList();
      assert.equal(result.length, 3);
    });
    after(function() {
      TrickMock.$queryInterface.$clearResults();
    });
  });
  describe("#destroyTrickById", function() {
    before(function() {
      TrickMock.$queryInterface.$useHandler(function(
        query,
        queryOptions,
        done,
      ) {
        if (query === "destroy" && queryOptions[0].where.id === 1) {
          return 1;
        } else {
          return null;
        }
      });
    });
    it("should return 1", async function() {
      const result = await trickService.destroyTrickById(1);
      assert.equal(result, 1);
    });
    after(function() {
      TrickMock.$queryInterface.$clearResults();
    });
  });
  describe("#destroyAllTrick", function() {
    before(function() {
      TrickMock.$queryInterface.$useHandler(function(
        query,
        queryOptions,
        done,
      ) {
        if (
          query === "destroy" &&
          Object.keys(queryOptions[0].where).length === 0
        ) {
          return 100;
        } else {
          return null;
        }
      });
    });
    it("should return 100", async function() {
      const result = await trickService.destroyAllTrick();
      assert.equal(result, 100);
    });
    after(function() {
      TrickMock.$queryInterface.$clearResults();
    });
  });
  describe("#addTrick", function() {
    before(function() {
      TrickMock.$queryInterface.$useHandler(function(
        query,
        queryOptions,
        done,
      ) {
        if (query === "create") {
          return TrickMock.build({
            id: 1,
            name: queryOptions[0].name,
            complexity: queryOptions[0].complexity,
            description: queryOptions[0].description,
          });
        } else {
          return null;
        }
      });
    });
    it("should return 100", async function() {
      const trick = {
        name: "trick",
        complexity: 100,
        description: "description",
      };
      const result = await trickService.addTrick(trick);
      assert.equal(result.id, 1);
      assert.equal(result.name, trick.name);
      assert.equal(result.complexity, trick.complexity);
      assert.equal(result.description, trick.description);
    });
    after(function() {
      TrickMock.$queryInterface.$clearResults();
    });
  });
});

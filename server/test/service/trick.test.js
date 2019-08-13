var SequelizeMock = require("sequelize-mock");
var proxyquire = require("proxyquire");
const chai = require("chai");

const { assert } = chai;
var dbMock = new SequelizeMock();

var TrickMock = dbMock.define("Trick", {
  name: "Backflip",
  complexity: 100,
  description: "description",
});

var trickService = proxyquire("../../src/service/trickService", {
  "../../src/models": {
    sequelize: SequelizeMock,
    Trick: TrickMock,
  },
});

// TrickMock.$useHandler(function(query, queryOptions, done) {
//   if (query === "findAll") {
//     return [
//       TrickMock.build({
//         id: 1,
//         name: "foo1",
//         complexity: 100,
//         description: "description",
//       }),
//       TrickMock.build({
//         id: 2,
//         name: "foo2",
//         complexity: 100,
//         description: "description",
//       }),
//       TrickMock.build({
//         id: 3,
//         name: "foo3",
//         complexity: 100,
//         description: "description",
//       }),
//       TrickMock.build({
//         id: 4,
//         name: "foo4",
//         complexity: 100,
//         description: "description",
//       }),
//     ];
//   }
// });

describe("Tric mock unit test", function() {
  describe("#getTrickById", function() {
    it("should return a trick by id", async function() {
      const result = await trickService.getTrickById(1);
      assert.equal(result.id, 1);
      assert.equal(result.name, "Backflip");
      assert.equal(result.complexity, "100");
      assert.equal(result.description, "description");
    });
  });
  describe("#getTrickList", function() {
    // it("should return a trick list", async function() {
    //   const result = await trickService.getTrickById(1);
    //     console.log(result);
    // });
  });
});

const SequelizeMock = require("sequelize-mock");
const proxyquire = require("proxyquire");
const chai = require("chai");

const {assert} = chai;
const dbMock = new SequelizeMock();

const TrickMock = dbMock.define("Trick");

const trickService = proxyquire("../../src/service/trickService", {
    "../../src/models": {
        sequelize: SequelizeMock,
        Trick: TrickMock,
    },
});

describe("Trick mock unit test", () => {

    describe("#getTrickById", () => {

        before(() => {
            TrickMock.$queryInterface.$useHandler((query) => {
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

        it("should return a trick by id", async () => {
            const result = await trickService.getTrickById(1);
            assert.equal(result.id, 1);
            assert.equal(result.name, "Backflip");
            assert.equal(result.complexity, "100");
            assert.equal(result.description, "description");
        });

        after(() => {
            TrickMock.$queryInterface.$clearResults();
        });
    });

    describe("#getTrickList", () => {

        before(() => {
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

        it("should return a trick list with 3 item", async () => {
            const result = await trickService.getTrickList();
            assert.equal(result.length, 3);
        });

        after(() => {
            TrickMock.$queryInterface.$clearResults();
        });
    });

    describe("#destroyTrickById", () => {

        before(() => {
            TrickMock.$queryInterface.$useHandler((query, queryOptions) => {
                if (query === "destroy" && queryOptions[0].where.id === 1) {
                    return 1;
                } else {
                    return null;
                }
            });
        });

        it("should return 1", async () => {
            const result = await trickService.destroyTrickById(1);
            assert.equal(result, 1);
        });

        after(() => {
            TrickMock.$queryInterface.$clearResults();
        });
    });

    describe("#destroyAllTrick", () => {

        before(() => {
            TrickMock.$queryInterface.$useHandler((query, queryOptions) => {
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

        it("should return 100", async () => {
            const result = await trickService.destroyAllTricks();
            assert.equal(result, 100);
        });

        after(() => {
            TrickMock.$queryInterface.$clearResults();
        });
    });

    describe("#addTrick", () => {
        before(() => {
            TrickMock.$queryInterface.$useHandler((query, queryOptions) => {
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

        it("should return 100", async () => {
            const trick = {
                name: "trick",
                complexity: 100,
                description: "description",
            };
            const result = await trickService.createTrick(trick);
            assert.equal(result.id, 1);
            assert.equal(result.name, trick.name);
            assert.equal(result.complexity, trick.complexity);
            assert.equal(result.description, trick.description);
        });
        after(() => {
            TrickMock.$queryInterface.$clearResults();
        });
    });
});

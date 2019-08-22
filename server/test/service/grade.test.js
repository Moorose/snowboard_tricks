const chai = require("chai");
const {stub, resetHistory} = require('sinon');
const sinonChai = require("sinon-chai");
const proxyquire = require('proxyquire');
const {makeMockModels} = require('sequelize-test-helpers');

const expect = chai.expect;
chai.use(sinonChai);

describe('gradeService', () => {
    const User = {findByPk: stub(), addTrick: stub()};
    const Trick = {findByPk: stub()};
    const sequelize = {query: stub(), QueryTypes: {UPDATE: 'type'}};
    const mockModels = makeMockModels({User, Trick, sequelize});

    const gradeService = proxyquire('../../src/service/gradeService', {
        '../../src/models': mockModels
    });

    const userMock = {id: 1, addTrick: stub(), getTricks: stub()};
    const trickMock = {id: 1, complexity: 500, grade: {destroy: stub()}, getUsers: stub()};
    let result;

    context('joinTrickToUser', () => {
        before(async () => {
            User.findByPk.resolves(userMock);
            Trick.findByPk.resolves(trickMock);
            await gradeService.joinTrickToUser({userId: 1, trickId: 1});
        });

        after(resetHistory);

        it('should called User.findByPk', () => {
            expect(User.findByPk).to.have.been.calledOnce;
            expect(User.findByPk).to.have.been.calledWith(1);
        });

        it('should called Trick.findByPk', () => {
            expect(Trick.findByPk).to.have.been.calledOnce;
            expect(Trick.findByPk).to.have.been.calledWith(1);
        });

        it('should called userMock.addTrick', () => {
            expect(userMock.addTrick).to.have.been.calledOnce;
            expect(userMock.addTrick).to.have.been.calledWith(trickMock, {through: {mark: false}});
        });
    });

    context('unJoinTrickToUser', () => {
        before(async () => {
            User.findByPk.resolves(userMock);
            userMock.getTricks.resolves([trickMock]);
            await gradeService.unJoinTrickToUser({userId: 1, trickId: 1});
        });

        after(resetHistory);

        it('should called User.findByPk', () => {
            expect(User.findByPk).to.have.been.calledOnce;
            expect(User.findByPk).to.have.been.calledWith(1);
        });

        it('should called userMock.getTricks', () => {
            expect(userMock.getTricks).to.have.been.calledOnce;
            expect(userMock.getTricks).to.have.been.calledWith({where: {id: 1}});
        });

        it('should called trick.grade.destroy', () => {
            expect(trickMock.grade.destroy).to.have.been.calledOnce;
        });
    });

    context('markTrick', () => {
        beforeEach(() => {
            User.findByPk.resolves(userMock);
            userMock.getTricks.resolves([trickMock]);
            sequelize.query.resolves(1);
        });

        describe('mark as done', () => {
            before(async () => {
                await gradeService.markTrick({is_done: true, userId: 1, trickId: 1});
            });

            after(resetHistory);

            it('should called User.findByPk', () => {
                expect(User.findByPk).to.have.been.calledOnce;
            });

            it('should called userMock.getTricks', () => {
                expect(userMock.getTricks).to.have.been.calledOnce;
                expect(userMock.getTricks).to.have.been.calledWith({where: {id: 1}});
            });

            it('should called sequelize.query', () => {
                expect(sequelize.query).to.have.been.calledOnce;
            });

        });

        describe('mark as undone', () => {
            before(async () => {
                await gradeService.markTrick({is_done: true, userId: 1, trickId: 1});
            });

            after(resetHistory);


            it('should called User.findByPk', () => {
                expect(User.findByPk).to.have.been.calledOnce;
            });

            it('should called userMock.getTricks', () => {
                expect(userMock.getTricks).to.have.been.calledOnce;
                expect(userMock.getTricks).to.have.been.calledWith({where: {id: 1}});
            });

            it('should called sequelize.query', () => {
                expect(sequelize.query).to.have.been.calledOnce;
            });
        });
    });

    context('getUserListByTrickId', () => {
        before(async () => {
            Trick.findByPk.resolves(trickMock);
            trickMock.getUsers.resolves([userMock]);
            result = await gradeService.getUserListByTrickId(1);
        });

        after(resetHistory);

        it('should called Trick.findByPk', () => {
            expect(Trick.findByPk).to.have.been.calledOnce;
            expect(Trick.findByPk).to.have.been.calledWith(1);
        });

        it('should called trickMock.getUsers', () => {
            expect(trickMock.getUsers).to.have.been.calledOnce;
        });

        it('should return mas with 1 user ', () => {
            expect(result).to.have.lengthOf(1);
            expect(result).to.include(userMock);
        });

    });

    context('getTrickListByUserId', () => {
        before(async () => {
            User.findByPk.resolves(userMock);
            userMock.getTricks.resolves([trickMock]);
            result = await gradeService.getTrickListByUserId(1);
        });

        after(resetHistory);

        it('should called User.findByPk', () => {
            expect(User.findByPk).to.have.been.calledOnce;
            expect(User.findByPk).to.have.been.calledWith(1);
        });

        it('should called userMock.getTricks', () => {
            expect(userMock.getTricks).to.have.been.calledOnce;
        });

        it('should return list with 1 trick ', () => {
            expect(result).to.have.lengthOf(1);
            expect(result).to.include(trickMock);
        });

    });

    context('getUserLevel', () => {
        before(async () => {
            User.findByPk.resolves(userMock);
            userMock.getTricks.resolves([trickMock, trickMock, trickMock]);
            result = await gradeService.getUserLevel(1);
        });

        after(resetHistory);

        it('should called User.findByPk', () => {
            expect(User.findByPk).to.have.been.calledOnce;
            expect(User.findByPk).to.have.been.calledWith(1);
        });

        it('should called userMock.getTricks', () => {
            expect(userMock.getTricks).to.have.been.calledOnce;
        });

        it('should return object with level and exp ', () => {
            expect(result).to.include({
                level: 1,
                exp: 1500
            });
        });

    });

});
const chai = require('chai');
const { stub, resetHistory } = require('sinon');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire');
const { makeMockModels } = require('sequelize-test-helpers');

const { expect } = chai;
chai.use(sinonChai);

describe('userTrickService', () => {
  const User = { findByPk: stub(), addTrick: stub() };
  const Trick = { findByPk: stub() };
  const UserTrick = { findOne: stub() };
  const mockModels = makeMockModels({ User, Trick, UserTrick });

  const userTrickService = proxyquire('../../src/service/userTrickService', {
    '../../src/models': mockModels,
  });

  const userMock = {
    dataValues: { id: 1 }, addTrick: stub(), getTricks: stub(), removeTrick: stub(),
  };
  const userTrickMock = {
    id: 1, UserId: 1, TrickId: 1, is_done: false,
  };
  const trickMock = {
    dataValues: { id: 1 }, complexity: 500, getUsers: stub(), UserTrick: userTrickMock,
  };
  let result;

  context('joinTrickToUser', () => {
    before(async () => {
      User.findByPk.resolves(userMock);
      Trick.findByPk.resolves(trickMock);
      UserTrick.findOne.resolves(userTrickMock);
      result = await userTrickService.joinTrickToUser({ userId: 1, trickId: 1 });
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
      expect(userMock.addTrick).to.have.been.calledWith(trickMock, { through: { is_done: false } });
    });

    it('should called UserTrick.findOne', () => {
      expect(UserTrick.findOne).to.have.been.calledOnce;
      expect(UserTrick.findOne).to.have.been.calledWith({
        where: {
          UserId: userMock.dataValues.id,
          TrickId: trickMock.dataValues.id,
        },
      });
    });

    it('should return userTrickMock', () => {
      expect(result).to.deep.equal(userTrickMock);
    });
  });

  context('unJoinTrickToUser', () => {
    before(async () => {
      User.findByPk.resolves(userMock);
      userMock.getTricks.resolves([trickMock]);
      result = await userTrickService.unJoinTrickToUser({ userId: 1, trickId: 1 });
    });

    after(resetHistory);

    it('should called User.findByPk', () => {
      expect(User.findByPk).to.have.been.calledOnce;
      expect(User.findByPk).to.have.been.calledWith(1);
    });

    it('should called userMock.getTricks', () => {
      expect(userMock.getTricks).to.have.been.calledOnce;
      expect(userMock.getTricks).to.have.been.calledWith({ where: { id: 1 } });
    });

    it('should called userMock.removeTrick', () => {
      expect(userMock.removeTrick).to.have.been.calledOnce;
      expect(userMock.removeTrick).to.have.been.calledWith(trickMock);
    });
  });

  context('markTrick', () => {
    beforeEach(() => {
      User.findByPk.resolves(userMock);
      userMock.getTricks.resolves([trickMock]);
    });

    describe('mark as done', () => {
      before(async () => {
        userTrickMock.is_done = true;
        result = await userTrickService.markTrick({ is_done: true, userId: 1, trickId: 1 });
      });

      after(resetHistory);

      it('should called User.findByPk', () => {
        expect(User.findByPk).to.have.been.calledOnce;
      });

      it('should called userMock.getTricks', () => {
        expect(userMock.getTricks).to.have.been.calledOnce;
        expect(userMock.getTricks).to.have.been.calledWith({ where: { id: 1 } });
      });

      it('should called userMock.addTrick', () => {
        expect(userMock.addTrick).to.have.been.calledOnce;
        expect(userMock.addTrick).to.have.been.calledWith(trickMock, { through: { is_done: true } });
      });

      it('should return userTrickMock', () => {
        expect(result).to.deep.equal(userTrickMock);
      });
    });

    describe('mark as undone', () => {
      before(async () => {
        userTrickMock.is_done = false;
        result = await userTrickService.markTrick({ is_done: false, userId: 1, trickId: 1 });
      });

      after(resetHistory);


      it('should called User.findByPk', () => {
        expect(User.findByPk).to.have.been.calledOnce;
      });

      it('should called userMock.getTricks', () => {
        expect(userMock.getTricks).to.have.been.calledOnce;
        expect(userMock.getTricks).to.have.been.calledWith({ where: { id: 1 } });
      });

      it('should called userMock.addTrick', () => {
        expect(userMock.addTrick).to.have.been.calledOnce;
        expect(userMock.addTrick).to.have.been.calledWith(trickMock, { through: { is_done: false } });
      });

      it('should return userTrickMock', () => {
        expect(result).to.deep.equal(userTrickMock);
      });
    });
  });

  context('getUserListByTrickId', () => {
    before(async () => {
      Trick.findByPk.resolves(trickMock);
      trickMock.getUsers.resolves([userMock]);
      result = await userTrickService.getUserListByTrickId(1);
    });

    after(resetHistory);

    it('should called Trick.findByPk', () => {
      expect(Trick.findByPk).to.have.been.calledOnce;
      expect(Trick.findByPk).to.have.been.calledWith(1);
    });

    it('should called trickMock.getUsers', () => {
      expect(trickMock.getUsers).to.have.been.calledOnce;
    });

    it('should return list with 1 user ', () => {
      expect(result).to.have.lengthOf(1);
      expect(result).to.include(userMock);
    });
  });

  context('getTrickListByUserId', () => {
    before(async () => {
      User.findByPk.resolves(userMock);
      userMock.getTricks.resolves([trickMock]);
      result = await userTrickService.getTrickListByUserId(1);
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
      result = await userTrickService.getUserLevel(1);
    });

    after(resetHistory);

    it('should called User.findByPk', () => {
      expect(User.findByPk).to.have.been.calledTwice;
      expect(User.findByPk).to.have.been.calledWith(1);
    });

    it('should called userMock.getTricks', () => {
      expect(userMock.getTricks).to.have.been.calledOnce;
    });

    it('should return object with level and exp ', () => {
      expect(result).to.include({
        level: 1,
        nextExp: 2000,
        exp: 1500,
      });
    });
  });
});

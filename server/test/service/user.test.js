const chai = require("chai");
const {match, stub, resetHistory} = require('sinon');
const sinonChai = require("sinon-chai");
const proxyquire = require('proxyquire');
const {makeMockModels} = require('sequelize-test-helpers');

const expect = chai.expect;
chai.use(sinonChai);

describe('userService', () => {
    const User = {findOne: stub(), update: stub(), create: stub(), findAll: stub(), destroy: stub()};
    const mockModels = makeMockModels({User});

    const userService = proxyquire('../../src/service/userService', {
        '../../src/models': mockModels
    });

    const id = 1;
    const data = {
        nickname: 'McTest',
        fullName: 'Test',
        email: 'test.test.tes',
        description: 'some-text'
    };
    const userMock = {id, ...data};
    let result;

    context('getUserById', () => {

        before(async () => {
            User.findOne.resolves(userMock);
            result = await userService.getUserById(id);
        });

        after(resetHistory);

        it('called User.findOne', () => {
            expect(User.findOne).to.have.been.calledOnce;
        });

        it('should return the user', () => {
            expect(result).to.deep.equal(userMock)
        });
    });


    context('createUser', () => {

        before(async () => {
            User.create.resolves(userMock);
            result = await userService.createUser({...data});
        });

        after(resetHistory);

        it('called User.create', () => {
            expect(User.create).to.have.been.calledWith(match(data));
        });

        it('should return user', () => {
            expect(result).to.deep.equal(userMock)
        });
    });

    context('updateUser', () => {

        before(async () => {
            User.update.resolves(userMock);
            result = await userService.updateUser({...data});
        });

        after(resetHistory);

        it('called User.update', () => {
            expect(User.update).to.have.been.calledWith(match(data));
        });

        it('should return user', () => {
            expect(result).to.deep.equal(userMock)
        });

    });

    context('getUserList', () => {

        before(async () => {
            User.findAll.resolves([userMock]);
            result = await userService.getUserList();
        });

        after(resetHistory);

        it('called User.findAll', () => {
            expect(User.findAll).to.have.been.calledWith();
        });

        it('should return mas with 1 user ', () => {
            expect(result).to.have.lengthOf(1);
            expect(result).to.include(userMock);
        });

    });

    context('destroyUserById', () => {

        before(async () => {
            User.destroy.resolves(1);
            result = await userService.destroyUserById(id);
        });

        after(resetHistory);

        it('called User.destroy', () => {
            expect(User.destroy).to.have.been.calledWith(match({where: {id}}));
        });

        it('should return 1', () => {
            expect(result).to.equal(1);
        });

    });


});
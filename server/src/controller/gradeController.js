"use strict";
const gradeService = require("../service/gradeService");
const resultSetter = require("../middlewares/resultSetter");

exports.joinTrickToUser = async ctx => {
    const trickList = await trickService.getTrickList();
    await resultSetter.setResult(ctx, trickList);
};


// exports.joinTrickToUser = async (userId, trickId)
// exports.unjoinTrickToUser = async (userId, trickId) => {
// exports.markTrickAsDone = async (userId, trickId) => {
// exports.unmarkTrickAsDone = async (userId, trickId) => {
// exports.getUserListByTrickId = async (trickId) => {
// exports.getTrickListByUserId = async (userId) => {

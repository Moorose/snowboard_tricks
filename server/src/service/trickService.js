const { Trick } = require('../models');

exports.createTrick = ({
  name, complexity, description,
}) => (
  Trick.create({
    name,
    complexity,
    description,
  })
);

exports.updateTrick = ({
  id, name, complexity, description, videoKey,
}) => (
  Trick.update(
    {
      name,
      complexity,
      description,
      videoKey,
    },
    {
      where: {
        id,
      },
    },
  )
);

exports.getTrickById = (id) => (
  Trick.findOne({
    where: {
      id,
    },
  })
);

exports.getTrickList = () => Trick.findAll();

exports.destroyTrickById = (id) => (
  Trick.destroy({
    where: {
      id,
    },
  })
);

exports.destroyAllTricks = () => (
  Trick.destroy({
    where: {},
  })
);

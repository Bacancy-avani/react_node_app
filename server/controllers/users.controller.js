const db = require('../models/index');
const users = db.users;

exports.create = async function(req, res) {
  let user;

  try {
    user = await users.create(req.body);
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'Internal server error',
      details: err,
    });
  }

  return res.status(200).json({
    status: true,
    message: 'User details stored successfully.',
    data: user,
  });
};

exports.list = async function(req, res) {
  let user;

  try {
    user = await users.findAll({ where: { deletedAt: { [db.Sequelize.Op.eq]: null } }});
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'No users found.',
      details: err,
    });
  }

  if (user.length > 0) {
    return res.status(200).json({
      status: true,
      message: 'All user fetched successfully.',
      data: user,
    });
  }
  return res.status(200).json({
    status: true,
    message: 'No users found.',
    data: user,
  });
};

exports.listById = async function(req, res) {
	const userId = req.params.id;
  let user;

  try {
    user = await users.findAll({where: { id: userId, deletedAt: { [db.Sequelize.Op.eq]: null } }});
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'No users found.',
      details: err,
    });
  }

  if (user.length > 0) {
    return res.status(200).json({
      status: true,
      message: 'All user fetched successfully.',
      data: user,
    });
  }
  return res.status(200).json({
    status: true,
    message: 'No users found.',
    data: user,
  });
};

exports.edit = async function(req, res) {
  const userId = req.params.id;
  let user;

  try {
    user = await users.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      isActive: req.body.isActive,
      gender: req.body.gender
    },
    {
      where: { id: userId, deletedAt: { [db.Sequelize.Op.eq]: null } },
      returning: true,
      plain: true,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'User not found.',
      details: err,
    });
  }

  return res.status(200).json({
    status: true,
    message: 'User updated successfully.',
    data: user[1].dataValues,
  });
};

exports.delete = async function(req, res) {
  const userId = req.params.id;
  let user;

  try {
    user = await users.update({
      deletedAt: Date.now(),
    },
    {
      where: { id: userId, deletedAt: { [db.Sequelize.Op.eq]: null } },
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'User not found.',
      details: err,
    });
  }

  return res.status(200).json({
    status: true,
    message: 'User deleted successfully.',
    data: user,
  });
};

exports.active = async function(req, res) {
  const userId = req.params.id;
  let user;

  try {
    user = await users.update({
      isActive: true
    },
    {
      where: { id: userId, deletedAt: { [db.Sequelize.Op.eq]: null } },
      returning: true,
      plain: true,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'User not found.',
      details: err,
    });
  }

  return res.status(200).json({
    status: true,
    message: 'User updated successfully.',
    data: user[1].dataValues,
  });
};
exports.deActive = async function(req, res) {
  const userId = req.params.id;
  let user;

  try {
    user = await users.update({
      isActive: false
    },
    {
      where: { id: userId, deletedAt: { [db.Sequelize.Op.eq]: null } },
      returning: true,
      plain: true,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: 'User not found.',
      details: err,
    });
  }

  return res.status(200).json({
    status: true,
    message: 'User updated successfully.',
    data: user[1].dataValues,
  });
};

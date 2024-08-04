const db = require('../models');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const { registerUser, loginUser } = require("../services/userServices");

exports.register = async (req, res) => {
  try {
    const user = await registerUser(req.body.username, req.body.password, req.body.role);
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await loginUser(req.body.username, req.body.password);
    res.json({ success: true, data: token });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

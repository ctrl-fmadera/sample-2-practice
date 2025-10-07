const User = require("../models/Users");
const bcrypt = require("bcrypt");

exports.registerUser = async (username, password, role) =>{
    const hashed = await bcrypt.hash(password, 10);
    const user = new User ({username, password:hashed, role });
    return user.save();
};
    
const jwt = require("jsonwebtoken");

exports.loginUser = async ( username, password) => {
    const user =await User.findOne ({ username });

    if (!user) throw new Error ("User not found");
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error ("Invalid password");

    const token = jwt.sign(
      { id: user._id, role: user.role},
      process.env.JWT_SECRET || "secret123",
      { expiresIn:"1h"}
    );
    return {token};
};
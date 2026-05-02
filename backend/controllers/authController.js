const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginSchema, registerSchema } = require("../validators/authValidator");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register User
const registerUser = async (req, res) => {


  try {
     const result = registerSchema.safeParse(req.body);
      if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0].message,
      });
    }

    const { name, email, password, role } = result.data;
    res.status(201).json({
      message: "User registered successfully",
    });



    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists " });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  }catch (err) {
  // console.log removed

  res.status(500).json({
    message: err.message,
  });
}
};

// Login User
const loginUser = async (req, res) => {
 
  try {
    // VALIDATE INPUT
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0].message,
      });
    }

    const { email, password, role } = result.data;
   

    const user = await User.findOne({ email });

    if (user && user.role === role && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email, password, or role" });
    }
  } catch (err) {
    // console.log removed

    res.status(500).json({
      message: err.message,
    });
  }
 

  res.status(500).json({
    message: "Server error",
  });
  };

module.exports = { registerUser, loginUser };

// token -"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZWJhMzUwYmVlMmEzZWM1NmVmMGYxOSIsImlhdCI6MTc3NzA1MDU2OSwiZXhwIjoxNzc3NjU1MzY5fQ.bHSSwjJitepMMzXMvnok6Me4nant3fUJ3WZELKzban8"
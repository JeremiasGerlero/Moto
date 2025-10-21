require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const exists = await User.findOne({ email: 'jeremiasgerlero7@gmail.com' });
  if (!exists) {
    const hashed = bcrypt.hashSync('123456', 10);
    await User.create({ email: 'jeremiasgerlero7@gmail.com', password: hashed });
    console.log('✅ Usuario admin creado: jeremiasgerlero7@gmail.com / admin123');
  } else {
    console.log('ℹ️ Usuario admin ya existe');
  }
  process.exit();
});
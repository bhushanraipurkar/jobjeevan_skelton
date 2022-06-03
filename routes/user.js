const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../schmas/user');

router.post('/register', async (req, res) => {
  const { name, email, pass, cpass } = req.body;

  if (!name || !email || !pass || !cpass) {
    res.status(500).json({ message: 'please fill in all fields.' });
    return;
  }
  if (email.length < 5) {
    res.status(500).json({ message: 'email is looking bad.' });
    return;
  }
  if (pass !== cpass) {
    res.status(403).json({ message: 'please use same password !' });
    return;
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash_pass = await bcrypt.hash(pass, salt);

      const user = new User({
        name: name,
        email: email,
        pass: hash_pass,
      });

      const user__search = await User.findOne({ email: email });
      if (user__search) {
        res.status(422).json({ message: 'Use a different email.' });
      } else {
        const response = await user.save();
        res.status(200).json(response);
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, image, email, aadhar, phone, pass, owner, is_owner } = req.body;

  if (pass || email || owner || is_owner) {
    res.json({
      message: "you can't change email,pass and owner related information !",
    });
  } else {
    try {
      const user = await User.findById(id);
      if (user) {
        const updated__user = await User.findByIdAndUpdate(id, req.body);
        res.status(200).json(updated__user);
      } else {
        res.status(404).json({ message: 'This user is not valid.' });
      }
    } catch (e) {
      res.status(202).json(e);
    }
  }
  res.send('end');
});

router.get('/find/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'user not found !' });
  }
});

module.exports = router;

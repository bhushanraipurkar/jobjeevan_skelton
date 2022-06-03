const express = require('express');
const router = express.Router();
const Org = require('../schmas/org');
const User = require('../schmas/user');

router.post('/register', async (req, res) => {
  const { name, street, city, state, pincode, contact, owner } = req.body;

  (!name || !street || !city || !state || !pincode || !contact || !owner) &&
    res.status(500).json({ message: 'Please fill in all related fields.' });

  try {
    const organization = new Org({
      name: name,
      street: street,
      city: city,
      state: state,
      pincode: pincode,
      contact: contact,
      owner: owner,
    });

    const user_exist = await User.findById(owner);
    if (user_exist) {
      const registerd = await organization.save();
      const get_id = registerd._id;
      await user_exist.updateOne({ $push: { owner: get_id } });
      res.status(200).json(registerd);
    } else {
      res.status(404).json({ message: 'User is not present.' });
    }
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/get', async (req, res) => {
  try {
    const organizations = await Org.find().populate(
      'owner',
      'name image phone'
    );
    res.status(200).json(organizations);
  } catch (e) {
    res.status(400).json({
      message: 'failed !',
      error: e,
    });
  }
});

router.get('/one/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const info = await Org.findById(id).populate('owner', 'name image phone');
    res.status(200).json(info);
  } catch (e) {
    res.status(400).json({
      message: 'failed !',
      error: e,
    });
  }
});

router.put('/add/review', async (req, res) => {
  const { org_id, user_id, review } = req.body;
  if (!org_id || !user_id || !review) {
    res.status(500).json({ message: 'please fill in all fileds' });
  } else {
    const orga = await Org.findOne({ _id: org_id });
    const exist_user = await User.findOne({ _id: user_id });
    if (exist_user) {
      const updated = await orga.updateOne({
        $push: { reviews: { _id: user_id, message: review } },
      });
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: 'you are not authorized user' });
    }
  }
});

module.exports = router;

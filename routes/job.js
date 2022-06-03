const express = require('express');
const mongoose = require('mongoose');
const Job = require('../schmas/job');
const Org = require('../schmas/org');
const User = require('../schmas/user');
const router = express.Router();

router.post('/post', async (req, res) => {
  const {
    title,
    desc,
    vacancies,
    role,
    salary,
    time,
    experience,
    contact,
    owner,
  } = req.body;

  if (
    !title ||
    !desc ||
    !vacancies ||
    !role ||
    !salary ||
    !time ||
    !contact ||
    !owner
  ) {
    res.status(500).json({ message: 'please fill in all fields.' });
  } else {
    if (!owner.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(500).json({ message: 'please enter a valid owner id !' });
    } else {
      try {
        const exist_org = await Org.findOne({ _id: owner });
        if (exist_org) {
          const job = new Job({
            title: title,
            desc: desc,
            vacancies: vacancies,
            role: role,
            salary: salary,
            time: time,
            experience: experience,
            contact: contact,
            owner: owner,
          });
          const r_job = await job.save();
          res.status(200).json(r_job);
        } else {
          res.status(500).json({ message: 'please enter a valid owner id !' });
        }
      } catch (e) {
        res.status(404).json(e);
      }
    }
  }
});

router.get('/all', async (req, res) => {
  try {
    const all_jobs = await Job.find().sort({ updatedAt: -1 });
    res.status(200).json(all_jobs);
  } catch (e) {
    res.status(400).json({
      message: 'failed !',
      error: e,
    });
  }
});

router.put('/apply/:id', async (req, res) => {
  const { id } = req.params;
  const { user_idd } = req.body;
  if (!id.match(/^[0-9a-fA-F]{24}$/) || !user_idd.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(500).json({ message: 'Please enter a valid ids' });
    return;
  } else {
    if (!user_idd) {
      res.status(500).json({ message: 'Please fill in all fields' });
      return;
    } else {
      try {
        const exist_user = await User.findById(user_idd);
        if (exist_user) {
          const update_job = await Job.findByIdAndUpdate(id, {
            $push: { appliedby: user_idd },
          });
          res.status(200).json(update_job);
        } else {
          res.status(404).json({ message: 'user by this id is not present' });
          return;
        }
      } catch (e) {
        res.status(400).json({
          message: 'failed !',
          error: e,
        });
      }
    }
  }
});

router.get('/applied/:job', async (req, res) => {
  const { job } = req.params;
  try {
    // const exist_job = await Job.findOne({ _id: job }).populate(
    //   'owner',
    //   '_id name owner'
    // );
    // const second = await exist_job.owner.populate('owner', '_id name');

    const exist_job = await Job.findOne({ _id: job }).populate(
      'appliedby',
      '_id name image'
    );
    // const get__applied = await Promise.all(exist_job.appliedby.map((i)=>{
    //   return
    // }));

    if (exist_job) {
      res.status(200).json(exist_job);
    } else {
      res.status(404).json({ message: 'job is not exist !' });
    }
  } catch (e) {
    res.status(400).json({
      message: 'failed !',
      error: e,
    });
  }
});

module.exports = router;

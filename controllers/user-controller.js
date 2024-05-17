const [User, Thought] = require('../models');

module.exports = {

  async getUser(req, res){
    try{
      const users = await User.find();

      res.json(users);
      }
    catch(error){
      res.status(500).json(error);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user =  await User.findOne({_id: req.params.userId}).select('-__v');
      if(!user){
        res.status(500).json(error);
      };
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body)
      res.json(user);

    } catch (error) {
      res.status(500).json(error);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$set: req.body},
        {runValidators: true, new: true}
      );

        if(!user){
          return res.status(404).json({ message: 'USER DOES NOT EXIST' });
        }

        res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({
        _id: req.params.userId
      });
      if(!user){
        return res.status(404).json({ message: 'USER DOES NOT EXIST' });
      }
      await Thought.deleteMany({_id:{$in: user.thoughts} });
      res.json({message: 'TEAM DISPATCHED - USER TERMINATION SET.'})
    } catch (error) {
      res.status(500).json(error);
    }
  },

}

const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    user:{
        type: String,
        unique: true,
        required: true,
        trimmed: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, 'BAD EMAIL, TRY AGAIN!']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref:'User'
        },
    ],
    friends:[
        {
        type:Schema.Types.ObjectId,
        ref: 'User'
        },
    ],
    toJSON: {
        virtuals: true,
        },
    id: false,
})

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });
  
  const User = model('User', userSchema);
  
  module.exports = User;
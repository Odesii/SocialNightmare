const { Schema, model, Types } = require('mongoose');
const { create } = require('./User');



const formatDate = (timestamp) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(timestamp).toLocaleString('en-US', options);
  };
  
  const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: formatDate,
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );

const thoughtSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    thoughText: {
        type: String,
        required: true,
        maxlength: 280
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: formatDate
    },
    reactions: [reactionSchema],
    toJSON:{
        virtuals: true,
        getters: true,
    },
    id: false,   
});

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

const Thought = model('Throught', thoughtSchema);

module.exports = Thought;
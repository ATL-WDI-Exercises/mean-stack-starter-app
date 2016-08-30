var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  title:     { type: String,  required: true },
  completed: { type: Boolean, required: true },
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  },
  { timestamps: true }  // createdAt, updatedAt
);

function date2String(date) {
  var options = {
    weekday: 'long', year: 'numeric', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}

TodoSchema.methods.getCreatedAt = function() {
  return date2String(this.createdAt);
};

TodoSchema.methods.getUpdatedAt = function() {
  return date2String(this.updatedAt);
};

TodoSchema.methods.toString = function() {
  let status = this.completed ? 'completed' : 'not completed';
  return `Todo: ${this.title} owned by ${this.user.local.email} is ${status}.`;
};

module.exports = mongoose.model('Todo', TodoSchema);

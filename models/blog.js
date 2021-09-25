const  { Schema, model } = require('mongoose');
//'Comment' is being imported by mongoose we don't need to import it
// make schema = bouncer at the club

const blogSchema = new Schema({
  title: { type: String, required: true, unique: true },
  body: String,
  comments: [ { type: Schema.Types.ObjectId, ref: 'Comment'} ]
}, {
  timestamps: true
})

module.exports = model('Blog', blogSchema)

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var commentSchema = new mongoose.Schema(
  {
    route_id: { type: Schema.Types.ObjectId, ref: 'Route' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    body: {
      type: 'string',
      required: true,
    },
  },
  { timestamp: true }
)

const Comments = mongoose.model('Comments', commentSchema)
module.exports = Comments

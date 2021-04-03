const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = mongoose.Schema(
  {
     writer : {
         type: Schma.Types.ObjectId,
         ref: 'User'
     },
     postId:{
        type: Schma.Types.ObjectId,
        ref: 'Video'
     },
     reponseTo:{
        type: Schma.Types.ObjectId,
        ref: 'User'
     },
     content: {
        type: String
     }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };

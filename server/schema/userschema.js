const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const studentSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true
      },
      phone: {
            type: Number,
            required: true
      },
      studentId: {
            type: Number,
            required: true
      },
      branch:{
            type: String,
            required: true
      },
      year:{
            type: Number,
            required: true
      },
      mentor:{
            type: String,
            required: true
      },
      password: {
            type: String,
            required: true
      },
      cpassword: {
            type: String,
            required: true
      },
      date: {
            type: Date,
            default: Date.now
      }
});

const MentorSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true
      },
      phone: {
            type: Number,
            required: true
      },
      mentorId: {
            type: Number,

            required: true
      },
      branch:{
            type: String,
            required: true
      },
      year:{
            type: Number,

            required: true
      },
      password: {
            type: String,
            required: true
      },
      cpassword: {
            type: String,
            required: true
      },
      date: {
            type: Date,
            default: Date.now
      }
});


// Now we need to create a collection
studentSchema.pre("save", async function (next) {
      if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
      }
      next();
});
MentorSchema.pre("save", async function (next) {
      if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
      }
      next();
});

const Student = mongoose.model('Student', studentSchema);
const Mentor = mongoose.model('Mentor', MentorSchema);

module.exports = {
      Student,
      Mentor
}
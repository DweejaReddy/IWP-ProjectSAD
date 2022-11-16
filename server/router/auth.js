const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
const bcrypt = require("bcrypt");
const {Student ,Mentor }  = require("../schema/userschema");

router.get("/", (req, res) => {
 
  res.send("hello world  signin");
});

router.get("/signup", (req, res) => {
  res.send("hello world from signup");
});



router.post("/student/register", async (req, res) => {
  const { name, email, phone, studentId,branch,year,mentor, password, cpassword } = req.body;
  if (!name || !email || !phone || !studentId || !branch || !year || !mentor || !password || !cpassword) {
    res.status(400).json({ msg: "Please fill all the fields" });
  }
  try {
    const userexist = await Student.findOne({ email: email });
    if (userexist) {
      return res.status(400).json({ msg: "User already exists" });
    } else if (password !== cpassword) {
      return res.status(400).json({ msg: "Password does not match" });
    } else {
      const newUser = new Student({
             name: name,
             email: email,
            phone: phone,
            studentId: studentId,
            branch: branch,
            year: year,
            mentor: mentor,
            password: password,
            cpassword: cpassword,
      });
      await newUser.save();
      res.status(201).json({ msg: "User created successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/mentor/register", async (req, res) => {
  const { name, email, phone, studentId,branch,year,mentor, password, cpassword } = req.body;
  if (!name || !email || !phone || !studentId || !branch || !year || !mentor || !password || !cpassword) {
    res.status(400).json({ msg: "Please fill all the fields" });
  }
  try {
    const userexist = await Mentor.findOne({ email: email });
    if (userexist) {
      return res.status(400).json({ msg: "User already exists" });
    } else if (password !== cpassword) {
      return res.status(400).json({ msg: "Password does not match" });
    } else {
      const newUser = new Mentor({
             name: name,
             email: email,
            phone: phone,
            mentorId: studentId,
            branch: branch,
            year: year,
            mentor: mentor,
            password: password,
            cpassword: cpassword,
      });
      await newUser.save();
      res.status(201).json({ msg: "User created successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});


router.get("/student/login", async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ msg: "Please fill all the fields" });
      }
      try {
        const user = await Student.findOne({ email: email });
        if (!user) {
          return res.status(400).json({ msg: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid credentials" });
        }
        res.status(200).json({ msg: "Login successful" });
      } catch (error) {
        console.log(error);
      }
    });



module.exports = router;
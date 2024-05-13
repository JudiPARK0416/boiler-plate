const express = require("express");
const app = express();
const port = 3000;
// const bodyParser = require("body-parser");
const { User } = require("./models/User");
// import User from "./models/User";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const config = require("./config/key");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(
    config.mongoURI
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    // }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World! 아아아악 그만!!");
});

app.post("/register", async (req, res) => {
  // 회원가입시 필요한 정보를 클라이언트에서 가져오면
  // 그걸 DB에 넣어준다.
  const user = new User(req.body);
  //   user.save((err, userInfo) => {
  //     if (err) return res.json({ success: false, err });
  //     return res.status(200).json({
  //       success: true,
  //     });
  //   });
  await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        success: false,
        err: err,
      });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

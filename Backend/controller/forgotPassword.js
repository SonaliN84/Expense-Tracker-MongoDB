const Sib = require("sib-api-v3-sdk");
const uuid = require("uuid");
const User = require("../models/user");
const Forgotpassword = require("../models/forgotPassword");
const bcrypt = require("bcrypt");

exports.postForgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
      const id = uuid.v4();
      console.log(id);

      const pass = new Forgotpassword({
        id: id,
        active: true,
        userId: user._id,
      });
      pass
        .save()
        .then(() => {
         const client = Sib.ApiClient.instance;
         const apiKey = client.authentications["api-key"];

          apiKey.apiKey = process.env.API_KEY;

          const tranEmailApi = new Sib.TransactionalEmailsApi();

          const sender = {
            email: "sonali.nilekar@gmail.com",
          };
          const receivers = [
            {
              email: email,
            },
          ];

          tranEmailApi
            .sendTransacEmail({
              sender,
              to: receivers,
              subject: "regarding Password Reset",
              htmlContent: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
            })
            .then(() => {
                return res
                .status(200)
                .json({
                  message: "Reset Password link has been sent to your email",
                });
            })
            .catch((err) => {
              // throw new Error(err)
              console.log(err);
            });
        });
    } else {
      res.status(400).json({ error: "User not found" });
    }
  } catch (err) {
    res.json({ error: err, success: false });
  }
};

exports.getResetPassword = (req, res, next) => {
  const id = req.params.id;

  Forgotpassword.findOne({ id: id })
    .then((forgotpasswordrequest) => {
      if (forgotpasswordrequest) {
        if (forgotpasswordrequest.active) {
          forgotpasswordrequest.active = false;
          forgotpasswordrequest.save().then(() => {
            res.status(200).send(`<html>
            <script>
                function formsubmitted(e){
                    e.preventDefault();
                    
                    console.log('called')
                }
            </script>
            <form action="/password/updatepassword/${id}" method="get">
                <label for="newpassword">Enter New password</label>
                <input name="newpassword" type="password" required></input>
                <button>reset password</button>
            </form>
        </html>`);
            res.end();
          });
        } else {
          res.status(500).json({ message: "link expired" });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUpdatepassword = (req, res) => {
  try {
    const { newpassword } = req.query;
    console.log(newpassword);
    const id = req.params.id;

    Forgotpassword.findOne({ id: id }).then((resetpasswordrequest) => {
      User.findById(resetpasswordrequest.userId).then((user) => {
        // console.log('userDetails', user)
        if (user) {
          //encrypt the password

          const saltRounds = 10;
          bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
              console.log(err);
              // throw new Error(err);
            }
            bcrypt.hash(newpassword, salt, function (err, hash) {
              // Store hash in your password DB.
              if (err) {
                console.log(err);
                // throw new Error(err);
              }
              user.password = hash;
              user.save().then(() => {
                res
                  .status(201)
                  .json({ message: "Successfuly update the new password" });
              });
            });
          });
        } else {
          return res
            .status(404)
            .json({ error: "No user Exists", success: false });
        }
      });
    });
  } catch (error) {
    return res.status(403).json({ error, success: false });
  }
};

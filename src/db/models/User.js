const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// hash user password before saving to db
userSchema.pre("save", async function (next) {
  const user = this

  // only hash when user password is modified during save
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
});

// invoke automatically before sending response
// remove sensitive data like password and tokens
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password

  return userObject
};

// search for uer object with the email and compare password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error("Invalid email or password!")
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error("Invalid email or password!")
  }

  return user
};

const User = mongoose.model("User", userSchema)

module.exports = User

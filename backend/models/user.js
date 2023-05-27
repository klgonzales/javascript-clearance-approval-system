import mongoose from "mongoose";
import bcrypt from "bcrypt";

const studentSchema = new mongoose.Schema({
  // name: { type: String, required: true },
  // email: { type: String, required: true },
  // password: { type: String, required: true },
  first_name: { type: String, required: true },
  middle_name: { type: String, required: true },
  last_name: { type: String, required: true },
  student_number: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, default: "pending" },
  open_application: { type: mongoose.Schema.Types.ObjectId, ref: "applications", default: null },
  closed_applications: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "applications" }], default: [] },
  adviser: { type: mongoose.Schema.Types.ObjectId, ref: "advisers", default: null },
});

studentSchema.pre("save", function (next) {
  const student = this;

  if (!student.isModified("password")) return next();

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }

    return bcrypt.hash(student.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }

      student.password = hash;
      return next();
    });
  });
});

studentSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, callback);
};

const Student = mongoose.model("student", studentSchema);

export { Student };
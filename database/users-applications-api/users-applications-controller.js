import mongoose from 'mongoose';

await mongoose.connect('mongodb://127.0.0.1:27017/ClearMe')

// await mongoose.connect('mongodb+srv://jpsabile:VUNVL7QcJ2tYPbZr@jpsabile.nvysktb.mongodb.net/?retryWrites=true&w=majority')

const User = mongoose.model('User', {
    first_name: String,
    middle_name: String,
    last_name: String,
    user_type: String,
    email: String,
    password: String,
    student_number: {
        type: String,
        default: null
    },
    adviser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    applications: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application'
        }],
        default: []
    },
});

const remarkSchema = new mongoose.Schema({
    remark: String,
    date: Date,
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    step_given: Number
});

const submissionSchema = new mongoose.Schema({
    step_submitted: Number,
    date_submitted: Date,
    remark_link: String
});

const applicationSchema = new mongoose.Schema({
    status: String,
    step: Number,
    remarks: {
        type: [remarkSchema],
        default: null
    },
    student_submissions: [submissionSchema]
});

const Application = mongoose.model('Application', applicationSchema);

const getStudents = async (req, res) => {
    try {
        const students = await User.find({ user_type: "student" });
        res.send(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "An error occurred while retrieving the students." });
    }
};

const getApprovers = async (req, res) => {
    try {
        const approvers = await User.find({
            user_type: { $in: ["approver_clearanceOfficer", "approver_adviser"] }
        });
        res.send(approvers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "An error occurred while retrieving the approvers." });
    }
};



// const getSubjects = async (req, res) => {
//     const subjects = await Subject.find({});
//     res.send(subjects)
// }

// const greetByPOST = async (req, res) => {
//     console.log(req.body.name)

//     const greeting = "Hello, " + req.body.name;
//     res.send(greeting)
// }


// // get subject by code
// const getSubjectByCode = async (req, res) => {
//     const subject = await Subject.findOne({ code: req.query.code })
//     res.send(subject)
// }

// addStudent
const addStudent = async (req, res) => {
    try {
        const {
            first_name,
            middle_name,
            last_name,
            user_type,
            email,
            password,
            student_number,
        } = req.body;

        const newStudent = new User({
            first_name,
            middle_name,
            last_name,
            user_type,
            email,
            password,
            student_number: student_number
        });

        const savedStudent = await newStudent.save();

        if (savedStudent._id) {
            res.status(200).json({ success: true });
            console.log("SUCCESS");
        } else {
            res.status(500).json({ success: false });
            console.log("FALSE");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "An error occurred while adding the student." });
    }
};

// addApprover
const addApprover = async (req, res) => {
    try {
        const {
            first_name,
            middle_name,
            last_name,
            user_type,
            email,
            password
        } = req.body;

        const newApprover = new User({
            first_name,
            middle_name,
            last_name,
            user_type,
            email,
            password
        });

        const savedApprover = await newApprover.save();

        if (savedApprover._id) {
            res.status(200).json({ success: true });
            console.log("SUCCESS");
        } else {
            res.status(500).json({ success: false });
            console.log("FALSE");
        }
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ success: false, error: "An error occurred while adding the approver." });
    }
};


// edit approver
const editApprover = async (req, res) => {
    try {
        const { approver, edited_approver_data } = req.body;

        const editedApprover = await User.findOneAndUpdate(
            { approver },
            { $set: edited_approver_data },
            { new: true }
        );

        if (editedApprover) {
            res.status(200).json({ success: true, editedApprover });
        } else {
            res.status(404).json({ success: false, message: "Approver not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "An error occurred while editing the approver." });
    }
}


// delete approver
const deleteApprover = async (req, res) => {
    const { approver } = req.body

    const result = await User.deleteOne({ approver })

    if (result.deletedCount == 1) {
        res.send({ success: true })
    } else {
        res.send({ success: false })
    }
}

// let data = await User.find({ user_type: "approver_adviser" });
// console.log(data);

const addApplication = async (req, res) => {
    try {
        const {
            student,
            status,
            step,
            studentSubmission
        } = req.body;

        const newApplication = new Application({
            status: status,
            step: step,
            student_submissions: [studentSubmission]
        });

        const savedApplication = await newApplication.save();

        if (savedApplication._id) {
            // addApplicationToStudent
            const foundStudent = await User.find({ student });
            if (!foundStudent) {
                throw new Error('Student not found');
            }

            foundStudent.applications.push(savedApplication._id);
            await student.save();

            res.status(200).json({ success: true });
            console.log("SUCCESS");

        } else {
            res.status(500).json({ success: false });
            console.log("FALSE");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "An error occurred while adding the student." });
    }
};

const addRemark = async (req, res) => {
    try {
        const { application, remark } = req.body;

        const savedRemark = await newRemark.save();
        48
        if (savedRemark._id) {
            // addRemarkToApplication
            const foundApplication = await Application.find({ application });
            if (!foundApplication) {
                throw new Error('Application not found');
            }

            foundApplication.remarks.push(savedRemark._id);
            await application.save();

            res.status(200).json({ success: true });
            console.log("SUCCESS");

        } else {
            res.status(500).json({ success: false });
            console.log("FALSE");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "An error occurred while adding the remark." });
    }
}





export { getStudents, getApprovers, addStudent, addApprover, editApprover, deleteApprover, addApplication };
import { signUpStudent, loginStudent, checkIfLoggedIn, logInAsAdmin } from "./controllers/auth-controller.js";
import { viewStudentInfo, createApplication, submitStep1 } from "./controllers/student.js";
import {
  getPendingApplications,
  approveStudentAccount,
  rejectStudentAccount,
  getAllApprovers,
  addApproverAccount,
  editApproverAccount,
  deleteApproverAccount,
} from "./controllers/admin.js";
import { getPendingApplicationsByAdviser } from "./controllers/approver.js";

const setUpRoutes = (app) => {
  // auth
  app.get("/", (req, res) => res.send("API Home"));
  app.post("/signup-student", signUpStudent);
  app.post("/login-student", loginStudent);
  app.post("/checkifloggedin", checkIfLoggedIn);

  // student
  // app.post("/add-student", addStudentAccount);
  app.post("/view-student-info", viewStudentInfo);
  app.post("/create-application", createApplication);
  app.post("/submit-step1", submitStep1);

  // admin
  app.post("/login-admin", logInAsAdmin);
  app.get("/get-pending-applications", getPendingApplications);
  app.post("/approve-student-account", approveStudentAccount);
  app.post("/reject-student-account", rejectStudentAccount);
  app.get("/get-all-approvers", getAllApprovers);
  app.post("/add-approver", addApproverAccount);
  app.post("/edit-approver", editApproverAccount);
  app.post("/delete-approver", deleteApproverAccount);

  // approver
  app.post("/get-pending-applications-adviser", getPendingApplicationsByAdviser);
};

export default setUpRoutes;
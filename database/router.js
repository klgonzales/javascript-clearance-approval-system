// import { addStudent, addApprover } from "./controllers/users-applications-controller.js";
import { signUp, login, checkIfLoggedIn } from "./controllers/auth.js";

export default function router(app) {
  // Allow Cross Origin Resource Sharing
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Access-Control-Allow-Methods,Origin,Accept,Content-Type,X-Requested-With,Cookie");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });

  // app.post("/add-student", addStudent);
  // app.post("/add-approver", addApprover);
  // app.get("/get-subjects", getSubjects);
  // app.post("/greet-by-post", greetByPOST);
  // app.get("/get-subject-by-code", getSubjectByCode);

  // app.post("/delete-subject", deleteSubject);

  // authentication
  app.post("/signup", signUp);
  app.post("/login", login);
  app.post("/checkifloggedin", checkIfLoggedIn);
}

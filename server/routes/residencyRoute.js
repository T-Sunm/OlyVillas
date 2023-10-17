import { createUser } from "../controller/userController.js";

const router = express.Router();

router.post("/createResidency", createUser);

export { router as residencyRouter };

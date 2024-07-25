const express = require("express");
const rootRouter = require("./routes/index");
const app = express();
const PORT = rocess.env.PORT || 3000;
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/api/v1", rootRouter);
app.listen(PORT, () => {
	console.log("Listening on Port", PORT);
});

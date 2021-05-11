
const express = require("express");
const app = express();
app.use(express.json());

const adminRouter=require("./routes/admin/adminRouter")
const manufacturerRouter=require("./routes/manufacturer/manufacturerRouter")

const viewerRouter=require("./routes/viewer/viewerRouter")

//app.use("/api/users", userRouter);


app.use("/api/users", adminRouter);
app.use("/api/users", manufacturerRouter);
app.use("/api/users", viewerRouter);
const port = process.env.APP_PORT;


app.listen(port, () => console.log(`Listenong on port ${port}`));


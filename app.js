
const express = require("express");
const app = express();
app.use(express.json());

const adminRouter=require("./routes/admin/adminRouter")
const manufacturerRouter=require("./routes/manufacturer/manufacturerRouter")

//app.use("/api/users", userRouter);


app.use("/api/users", adminRouter);
app.use("/api/users", manufacturerRouter);


const port = process.env.APP_PORT;


app.listen(port, () => console.log(`Listenong on port ${port}`));


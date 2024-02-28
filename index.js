const express =require('express');

const app = express();
const authRoute=require("./routes/authRoute")
const taskRoute = require("./routes/taskRoute")
const bodyParser = require('body-parser');
const PORT=process.env.PORT || 5050;
const cors = require('cors');
const dbConnection = require('./utils/dbConnect');
dbConnection();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use("/api/user",authRoute);
app.use("/api/task",taskRoute);

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}}`);  
})
   
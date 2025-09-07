const express = require(`express`);
const cors = require(`cors`);
const dotenv = require(`dotenv`);

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 6677;
app.listen(port,() => {
    console.log(`Server is running at port ${port}`);
});

app.get("/",(req,res) => {
    res.send("Welcome");
});
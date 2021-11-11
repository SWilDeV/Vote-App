const { application } = require("express");
const express = require("express");
const path = require("path");
const cors = require("cors");

const index = require("./routes/index");
const votes = require("./routes/votes");
const PORT = 3000;

const app = express();

//View engine
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//Set Static Folder
app.use(express.static(path.join(__dirname, "client")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", index);
app.use("/api", votes);

app.listen(PORT, function () {
	console.log(`server started on ${PORT}`);
});

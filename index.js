const express = require("express");
const PORT = process.env.PORT || 8007;
const app = express(); //running express.js
const fs = require("fs").promises

// Don't worry about these 4 lines below
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


/*
  Handles the localhost:8007/ 
*/
// // app.get("/", (req, res) => {  // calls this callback function after it receives a request.
// //  res.render("homepage"); // shows the homepage.ejs located under views folder
// //});
/*
  req -> is an object that holds all of the request data that the user requested.
  res -> is an object that holds all the responding data that the application server (express) is returning to the browser.
*/


app.get("/", (req, res) => {  // calls this callback function after it receives a request.
  res.render("createcard"); // shows the homepage.ejs located under views folder
});


app.post("/create", (req, res) => {
  const user = req.body; // req.body is all the POSTed data the user POSTed. 
  console.log(user)
  // this line below is setting a new property called "id" to the user (which is an object) 
  user.id = Math.floor(Math.random() * 600) + 1
  fs.readFile("database.json", "utf8")
    .then((content) => JSON.parse(content))
    .then((jsonObj) => {
      jsonObj.users.push(user);
      fs.writeFile("database.json", JSON.stringify(jsonObj))
        .then(() => res.redirect("/people/" + user.id))
        .catch((err) => console.log(err))
    }) // ".users" is the array of users in "database.json"
    .catch((err) => console.log(err))

});



app.get("/people/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("database.json", "utf8")
    .then(content => JSON.parse(content).users) // JSON.parse(content) is an object that holds a property called "users" (Google Object-Oriented Programming)
    .then(users => users.find(user => user.id == parseInt(id)))
    .then(foundUser => {
      console.log(foundUser);
      res.render("homepage", { user: foundUser }
      );
    })
});




app.get("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});



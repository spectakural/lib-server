// server/index.js

const PORT = process.env.PORT || 3001;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const db = require('./queries')

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ 
  extended: true 
}))

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.get("/users", db.getUsers)
app.get("/users/:email", db.getUsersByEmail)
app.get("/users/cart/:email", db.getUserCart)
app.post("/users", db.createUser)
app.put("/users/", db.updateUser)
app.put("/users/cart", db.updateUserCart)
app.delete("/users", db.deleteUser)

app.get("/books",db.getBooks)
app.get("/books/:id",db.getBooksById)
app.post("/books",db.createBook)
app.put("/books/:id",db.updateBookDetails)
app.put("/books/avl/:id",db.updateBookAvl)
app.delete("/books/:id",db.deleteBook)

app.post("/rent", db.rents)
app.get("/rent/userid/:id", db.getRentByUserId)
app.get("/rent/bookid/:id", db.getRentByBookId)
app.put("/rent", db.returnBook)

app.post("/cart", db.createCart)
app.post("/cart/add", db.addToCart)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
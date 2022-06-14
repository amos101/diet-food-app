require('dotenv').config()
const { PORT, MONGO_URI } = require('./config')
const express = require("express")
const app = express()
const mongoose = require("mongoose")

const foodRouter = require("./routes/foodRoutes")

app.use(foodRouter)

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("データベース成功"))
  .catch((err) => console.log(err))


app.listen(PORT, () => {
  console.log("サーバー")
})
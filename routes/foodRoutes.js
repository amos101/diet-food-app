const express = require("express")
const app = express()
const foodModel = require("../models/Food")

app.use(express.json())

// データ取得 ここがエンドポイント　asyncは非同期という意味
app.get("/foods", async(req, res) => {
  // テータベースの中のすべてのデータを返す
  const foods = await foodModel.find({})

  // foodsがちゃんと取れているか確認
  try {
     res.send(foods)
  } catch (err) {
    res.status(500).send(err)
  }
})

// データ作成
app.post("/food", async (req, res) => {
  // 新しいデータを入れる
  const food = new foodModel(req.body)

  try {
    // ここで追加したデータをセーブ
    await food.save()
    res.send(food)
  } catch (err) {
    res.status(500).send(err)
  }
})

// データ部分修正 put or patch
app.patch("/food/:id", async (req, res) => {
  try {
    await foodModel.findByIdAndUpdate(req.params.id, req.body)
    await foodModel.save()
  } catch (err) {
    res.status(500).send(err)
  }
})

// データの削除
app.delete("/food/:id", async (req, res) => {
  try {
    await foodModel.findByIdAndDelete(req.params.id)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = app
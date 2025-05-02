const express = require("express")

const app = express()



app.get("/detail/:id", (req, res) => {
    console.log(req.query)
    console.log(req.params)
    res.json({
        message: "11",
        data: [
            {age: 1}
        ]
    })
})

app.listen(9090, () => {
    console.log("success!!!")
})
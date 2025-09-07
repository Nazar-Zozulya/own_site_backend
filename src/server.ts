import express, { Express } from "express"

const app: Express = express()
const PORT = Number(process.env.PORT) || 3000
const HOST = process.env.HOST || "localhost"

app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.listen(PORT, HOST, () => {
	console.log(`Server is running at http://${HOST}:${PORT}`)
})

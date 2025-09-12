import express, { Express } from "express"
import cors from "cors"

const app: Express = express()
const PORT = Number(process.env.PORT) || 8000
const HOST = process.env.HOST || "localhost"

app.use(express.json())

app.use(cors())

app.get("/", (req, res) => {
	res.send("Hello World!")
})

interface contactMeData {
	name: string
	email: string
	message: string
}


app.post("/contact-me/", (req, res) => {
	const body = req.body
	console.log(body)
	res.json(body)
})

app.listen(PORT, HOST, () => {
	console.log(`Server is running at http://${HOST}:${PORT}`)
})

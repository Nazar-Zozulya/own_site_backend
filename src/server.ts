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

const BOT_TOKEN = process.env.BOT_TOKEN
const CHAT_ID = process.env.CHAT_ID

app.post("/contact-me/", async (req, res) => {
	const body = req.body

	const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			chat_id: CHAT_ID,
			text: `name: ${body.name} \nemail: ${body.email} \nmessage: ${body.message}`,
		}),
	})

	const result = response.json()

	res.json(result)
})

app.listen(PORT, HOST, () => {
	console.log(`Server is running at http://${HOST}:${PORT}`)
})

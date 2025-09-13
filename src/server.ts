import express, { Express } from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
const HOST = process.env.HOST || "0.0.0.0" 

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
	try {
		console.log(BOT_TOKEN)
		console.log(CHAT_ID)
		const { name, email, message }: contactMeData = req.body
		const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: CHAT_ID,
				text: `name: ${name} \nemail: ${email} \nmessage: ${message}`,
			}),
		})

		const result = await response.json()
		res.json(result)
	} catch (err) {
		res.send(err)
	}
})

app.listen(PORT, HOST, () => {
	console.log(`Server is running at http://${HOST}:${PORT}`)
})

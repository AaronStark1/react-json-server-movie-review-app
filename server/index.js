const jsonServer = require("json-server")
const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use("/api",router)

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=> {
    console.log(`Server running at http://localhost:${PORT}/api`)
})
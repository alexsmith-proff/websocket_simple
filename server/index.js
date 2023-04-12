import { WebSocketServer } from 'ws'

const port = 5000
const server = new WebSocketServer({ port: port }, () => console.log(`WebSochet server started on port ${port}`))

let messages = []

server.on('connection', ws => {
    ws.send(JSON.stringify({
        event: 'init',
        payload: {
            messages: messages
        }
    }))

    // Обработчик сообщений от клиента
    ws.on('message', (message) => {
        const mes = JSON.parse(message)
        if (mes.event === 'connect') {
            const m = `Пользователь ${mes.payload.username} подключился`
            mes.payload.message = m
            messages = [...messages, m]
        }
        if (mes.event === 'send') {
            const m = `${mes.payload.username}: ${mes.payload.message}`
            mes.payload.message = m
            messages = [...messages, m]
        }
        console.log(mes);
        broadcastMessage(JSON.stringify(mes))

    })
})

// Широковещательная рассылка сообщения
function broadcastMessage(message) {
    server.clients.forEach(client => {
        client.send(message)
    })
}


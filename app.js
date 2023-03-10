const http = require('http')

const server = http.createServer()
const users = [
    {
        id: 1,
        name: "Rebekah Johnson",
        email: "Glover12345@gmail.com",
        password: "123qwe",
    },
    {
        id: 2,
        name: "Fabian Predovic",
        email: "Connell29@gmail.com",
        password: "password",
    },
];
const posts = [
    {
        id: 1,
        title: "간단한 HTTP API 개발 시작!",
        content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
        userId: 1,
    },
    {
        id: 2,
        title: "HTTP의 특성",
        content: "Request/Response와 Stateless!!",
        userId: 1,
    },
];

const httpRequestListener = (request, response) => {
    const { url, method } = request

    if (method === 'GET') {
        if (url === '/get/details') {

        }
        if (url === '/ping') {
            response.writeHead(200, { 'content-type': 'application/json' })
            response.end(JSON.stringify({ message: 'ok' }))
        }
    }

    if (method === 'POST') {
        if (url === '/users/update_posts') {
            let post_body = ''
            request.on('data', (data) => { post_body += data })
            request.on('end', () => {
                const post = JSON.parse(post_body)
                posts.push({
                    id: post_body.id,
                    title: post_body.title,
                    content: post_body.content,
                    userId: post_body.userId,
                })
                response.end(JSON.stringify({ messsage: 'postCreated' }))
            })
        } else if (url === '/users/postman') {
            let body = ''
            request.on('data', (data) => { body += data })
            request.on('end', () => {
                const user = JSON.parse(body)

                users.push({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                })

                response.end(JSON.stringify({ message: 'usersCreated' }))
            })



        }
    }
}

server.on('request', httpRequestListener)

const IP = '127.0.0.1'
const PORT = 8000

server.listen(PORT, IP, () => { console.log(`Listening to request on ${PORT} & ${IP} `) })
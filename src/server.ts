import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import order_routes from './handlers/order_handler'
 
// express object
const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

 // to use express routes in handler file
order_routes(app)

app.listen(3000, function () {
    console.log(`Starting app on: ${address}`)
})

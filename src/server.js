import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import listEndpoints from "express-list-endpoints"
dotenv.config()
import { testDbConnection } from './utils/db/connect.js'
import productRouter from './services/products/index.js'
import reviewRouter from './services/reviews/reviews.js'



 const server = express()
 const PORT = process.env.PORT
 server.use(express.json())
 server.use(cors())

 server.use('/products', productRouter)
 server.use('/reviews', reviewRouter)

 server.listen( process.env.PORT || 3001 , ()=>{
     console.log(`Server is running with ${PORT}`)
     testDbConnection();
     console.table(listEndpoints(server))
 })

 server.on("error", (error) => {
     console.log('Server isnt running', error)
 })
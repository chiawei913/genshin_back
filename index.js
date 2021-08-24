import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

import userRouter from './routes/backusers.js'
import countryRouter from './routes/countries.js'
import fileRouter from './routes/files.js'
import cityRouter from './routes/cities.js'
import characterRouter from './routes/characters.js'
import attributeRouter from './routes/attributes.js'
import featureRouter from './routes/features.js'
import newRouter from './routes/news.js'
import newcarouselRouter from './routes/newscarousel.js'

dotenv.config()

mongoose.connect(process.env.MONGODB)

const app = express()

app.use(cors({
  origin (origin, callback) {
    if (process.env.DEV === 'true') {
      callback(null, true)
    } else {
      if (origin === undefined || origin.includes('github')) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed'), false)
      }
    }
  }
}))

// 處理 cors 錯誤
app.use((_, req, res, next) => {
  res.status(403).send({ success: false, message: '請求被拒絕' })
})

app.use(bodyParser.json())

// 處理 body-parser 錯誤
app.use((_, req, res, next) => {
  res.status(400).send({ success: false, message: '內容格式錯誤' })
})

app.use('/backusers', userRouter)
app.use('/countries', countryRouter)
app.use('/cities', cityRouter)
app.use('/characters', characterRouter)
app.use('/attributes', attributeRouter)
app.use('/features', featureRouter)
app.use('/news', newRouter)
app.use('/newscarousel', newcarouselRouter)
app.use('/files', fileRouter)

// 最後擋住 404 不要讓 express 去處理
app.all('*', (req, res) => {
  res.status(404).send({ success: false, message: '找不到內容' })
})

app.listen(process.env.PORT, () => {
  console.log('server start')
})

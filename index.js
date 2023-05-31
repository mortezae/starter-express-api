import express from 'express'
import proxy from 'express-http-proxy'

const app  = express()

let opt1 = {
  userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
    let data = JSON.parse(proxyResData.toString('utf8'))
    data.newProperty = 'exciting data'
    return JSON.stringify(data)
  }
}

let opt = {}

app.use('/api.binance', proxy('https://api.binance.com', opt))
app.use('/www.mexi',    proxy('https://www.mexc.com', opt))


app.all('/hello', (req, res) => {
    console.log("Just got another request!")
    res.send('Oh Welcome!')
})

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send(`Hey`)
})

app.listen(process.env.PORT || 3000,
  () => {
    console.log(`App listening on port ${process.env.PORT || 3000}!`)
  }
)
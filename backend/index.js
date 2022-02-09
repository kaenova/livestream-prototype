const express = require('express')
const port = 3000
const app = express()
app.use(express.urlencoded())

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

var data = {}

app.post('/auth', (req, res) => {
  /* This server is only available to nginx */
  const streamkey = req.body.key;
  const streamID = req.body.name;

  /* You can make a database of users instead :) */
  try {
    if (data[streamID] === streamkey) {
      res.status(200).send();
      return;
    }
  } catch (e) {
  }

  /* Reject the stream */
  res.status(403).send();
})

app.get('/generate', (req, res) => {
  const streamID = makeid(5)
  const key = makeid(15)
  data[streamID] = key

  res.status(200).send({"stream_key" : `${streamID}?key=${key}`, "stream_id": streamID})
})

app.listen(port, () => {
  console.log(`Example app listening on port :${port}`)
})
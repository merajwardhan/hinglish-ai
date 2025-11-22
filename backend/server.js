import express from 'express';
const app = express();
import 'dotenv/config';

app.get('/', (req,res) => {
  res.send('Hello from express!!');
})

app.listen(`${process.env.PORT}` || 3000, console.log(`App listening on port => ${process.env.PORT}`))

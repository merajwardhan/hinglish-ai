import express from 'express';
const app = express();
import 'dotenv/config';
import chatRouter from './src/routes/chat.js';

app.use(express.json());

//CORS handling
app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if(res.method === 'OPTIONS') return res.sendStatus(200);

  next();
})

app.get('/', (req,res) => {
  res.send('Hello from express!!');
})

app.use('/api/chat', chatRouter);

app.listen(`${process.env.PORT}` || 3000, console.log(`App listening on port => ${process.env.PORT}`))

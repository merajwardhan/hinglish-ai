import express from 'express';
const app = express();
import 'dotenv/config';
import chatRouter from './src/routes/chat.js';

app.use(express.json());

app.get('/', (req,res) => {
  res.send('Hello from express!!');
})

app.use('/api/chat', chatRouter);

app.listen(`${process.env.PORT}` || 3000, console.log(`App listening on port => ${process.env.PORT}`))

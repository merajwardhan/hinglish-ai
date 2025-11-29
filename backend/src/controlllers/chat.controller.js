import geminiServices from '../utils/google.service.js';

async function handleMessage(req, res) {
  try {
     const msg = req.body.message;

     if(!msg) return res.status(400).json({ message: `Message content required!`});
     const response = await geminiServices.sendMessage(msg);
     res.status(200).json({ response });
   } catch (error) {
     console.error(`Something went wrong in the chat controller\nError => ${error}`)
     res.status(500).json({ error : "An error occured while trying to get back the response"});
   } 
}

export default {
  handleMessage
}

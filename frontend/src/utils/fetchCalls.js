export const AiCall = async (message) => {
  try {
    const response = await fetch('http://localhost:3000/api/chat/', {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        message
      })
    });

    if(!response.ok) return `HTTP REQUEST PROBLEM, STATUS CODE - ${response.status}`;

    return await response.json();
  } catch (error) {
    if(error.message) return error.message;
    return error;
  }
}

import express from "express";

const app = express();

app.get('/api/jokes',(req,res)=>{
  const jokes = [
    {
      id: 1,
      title: "Programming Joke",
      content: "Why do programmers prefer dark mode? Because light attracts bugs!",
    },
    {
      id: 2,
      title: "Dad Joke",
      content: "Why don't scientists trust atoms? Because they make up everything!",
    },
    {
      id: 3,
      title: "Pun Joke",
      content: "I used to be a baker because I kneaded dough.",
    },
    {
      id: 4,
      title: "Math Joke",
      content: "Why was the equal sign so humble? Because he knew he wasn't less than or greater than anyone else.",
    },
    {
      id: 5,
      title: "Nature Joke",
      content: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    },
  ];
  res.send(jokes);
});

app.get('/',(req,res)=>{
  res.send("Server is ready");
});

const port = process.env.PORT || 3000;

app.listen(port,()=>{
  console.log(`Serve at http://localhost: ${port}`);
});
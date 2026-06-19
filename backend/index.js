const express = require("express");

const app = express();


const PORT = 3000;



app.get('/', (req,res) => {
    res.send("hi check")
});

app.get('/app', (req,res) => {
    res.send("my app");
});


app.listen(PORT, () => {
    console.log(`serverListeningOn http://localhost:${PORT}`)
});
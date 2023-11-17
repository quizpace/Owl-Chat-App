const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://127.0.0.1:5500', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.get("/emojis", async (req, res) => {
  try {
    const response = await axios.get(
      "https://emoji-api.com/emojis?access_key=daa9ad3ca78509f712098bb71e2d0af6787dc346"
    );
    const emojis = response.data;
    res.json(emojis);
  } catch (error) {
    console.error("Error fetching emojis:", error);
    res.status(500).send("Error fetching emojis");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors'); 

app.use(cors({ origin: '*' }));
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

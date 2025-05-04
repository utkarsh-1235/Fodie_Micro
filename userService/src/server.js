const app = require('./index'); // import the Express app
const dbConnect = require('./db');
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await dbConnect();
  console.log(`User Service is running on port ${PORT}`);
});

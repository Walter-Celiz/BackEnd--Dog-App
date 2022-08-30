const server = require("./src/app.js");
const { db } = require("./src/db.js");
const { PORT } = process.env;

// Syncing all the models at once.
db.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log(`Server listening at ${PORT} 🟢🟢🟢🟢`);
  });
});

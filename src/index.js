const express = require('express');
const {PORT}= require('./env')
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes/main');

app.use('/', routes);

app.use(express.static('src/public'));

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});

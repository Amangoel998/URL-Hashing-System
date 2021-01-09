const express = require('express');
const check = require('express-validator').check;
const validurl = require('valid-url');

const findUrl = require('./config/db').findURL;
const createUrl = require('./config/db').createURL;
const connectDB = require('./config/db').connectDB;

//const {findUrl, createUrl, createCustomUrl} =  require('./config/db')

const app = express();
const router = express.Router();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use('/img', express.static('./assets/images'));

// Route to click.js
app.use('/click', require('./click'));

app.set('view engine', 'ejs');

connectDB();

app.get('/', homeCtrl);

app.get('/shortenURL', (req,res)=>{
    res.redirect('/')
});
app.post('/shortenURL', shortenURL, homeCtrl);

app.get('/:url', async (req, res) => {
  try {
    const fullurl = await findUrl(req.params.url);
    if (fullurl != null) res.redirect(fullurl);
    else res.render('error', { msg: 'The url provided is invalid' });
  } catch (e) {
    res.render('error', { msg: e });
  }
});

function homeCtrl(req, res) {
  const shorturl = req.shorturl?req.shorturl:null;
  const success = req.success?req.success:null;
  res.render('index', { shorturl, success });
}

async function shortenURL(req, res, next) {
  try {
    const longurl = req.body.longurl;
    var shortenedurl = null;
    if (validurl.isUri(longurl)) {
      shortenedurl = createUrl(longurl);
      req.success = 100;
      req.shorturl = await shortenedurl;
    } else {
      req.success = 200;
    }
    return next();
  } catch (e) {
    res.render('error', { msg: e });
  }
}
const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on http://127.0.0.1:${PORT}`));

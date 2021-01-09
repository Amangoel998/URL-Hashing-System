const express = require('express')
const getClicksCount = require('./config/db').getClicksCount;
const check = require('express-validator').check;
const app = express()
const router = express.Router();

app.set('view engine', 'ejs');

router.get('/', clickCtrl);

router.post('/', getClicks, clickCtrl)

function clickCtrl(req, res) {
    const clicksofurl = req.clicksofurl?req.clicksofurl:0;
    const success = req.success?req.success:500;
        res.render('clicks', {
            clicksofurl,
            success
        })
}

async function getClicks(req, res, next) {
    try {
        const shorturl = req.body.shorturl;
        if (check(shorturl, 'Invalid URL').isLength({ min: 3 })) {
            const val  = await getClicksCount(shorturl)
            if(!isNaN(val)){
                req.clicksofurl = val;
                req.success = 100;
            } else
                req.success = 200;
        } else 
            req.success = 200
        return next();
    } catch (e) {
        res.render('error', {
            msg: 'URL is unavailable'
        })
    }
}

module.exports = router
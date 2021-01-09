const mongoose = require('mongoose');
const config = require('config');
const dbURI = config.get('mongoURI');
const Shorturl = require('../models/Shorturl');

// mongoose.connect(db);

//New Standard, Looks Synchronous
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB Connected....');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
// Function to get new shortened URL
async function createURL(furl) {
  try {
    const newobj = await Shorturl.create({
      fullurl: furl
    });
    return newobj.shorturl;
  } catch (e) {
    throw new Error('URL is unavailable');
  }
}
// Function to find Full URL from short URL
async function findURL(surl) {
  try {
    const foundobj = await Shorturl.findOne({
      shorturl: surl
    });
    if (foundobj == null) return null;
    foundobj.clicks++;
    await foundobj.save();
    return foundobj.fullurl;
  } catch (e) {
    throw new Error('URL is unavailable');
  }
}

//Function to get No. of clicks using the short Url
async function getClicksCount(surl) {
  try {
    const foundobj = await Shorturl.findOne({
      shorturl: surl
    });
    if (foundobj == null) return 0;
    return foundobj.clicks;
  } catch (e) {
    throw new Error('URL is Unavailable');
  }
}
async function createCustomURL(lurl, surl) {
  try {
    const newobj = await Shorturl.create({
      fullurl: lurl,
      shorturl: surl
    });
    return newobj.shorturl;
  } catch (e) {
    throw new Error('URL is Unavailable');
  }
}

module.exports = {
  connectDB,
  createURL,
  findURL,
  getClicksCount,
  createCustomURL
};

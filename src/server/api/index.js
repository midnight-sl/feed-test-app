const express = require('express');
const router = express.Router();
const axios = require('axios');
const parser = require('fast-xml-parser');

router.post('/login', loginUser);
router.post('/load-standart', loadStandartFeed);
router.get('/load-nasa', loadNasaFeed);
router.post('/create', createFeed);
router.delete('/delete', deleteFeed);

async function loginUser (req, res) {
  const email = req.body.email;
  const getUsers = await axios.get('https://jsonplaceholder.typicode.com/users');
  const checkedUser = getUsers.data.find(el => el.email === email);
  
  if (checkedUser) {
    res.send(checkedUser)
  } else {
    res.status(400).send('No such user');
  }
}

async function loadStandartFeed (req,res) {
  const userId = req.body.userId;
  const standartFeedLink = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  const getFeeds = await axios.get(standartFeedLink);

  if (getFeeds) {
    res.send(getFeeds.data)
  } else {
    res.status(400).send('There are no feed for this user!');
  }
}

async function loadNasaFeed (req,res) {

  const getNasaFeeds = await axios.get('https://www.nasa.gov/rss/dyn/breaking_news.rss');

  if (getNasaFeeds) {
    res.send(parser.parse(getNasaFeeds.data, {}).rss.channel.item)
  } else {
    res.status(404).send('Request failed! Something went wrong!');
  }
}

async function createFeed (req,res) {
  const userId = req.body.userId;
  const feedBody = req.body.feedBody;
  const title = req.body.title;

  const createdFeed = await axios.post('https://jsonplaceholder.typicode.com/posts', { userId, feedBody, title });
  if (createdFeed) {
    res.send(createdFeed.data)
  } else {
    res.status(500).send('Internal error');
  }
}

async function deleteFeed (req,res) {
  const feedId = req.body.feedId;
  const deleteFeedLink = `https://jsonplaceholder.typicode.com/posts/${feedId}`;
  const deletedFeed = await axios.delete(deleteFeedLink);

  if (deletedFeed) {
    res.status(200).send('');
  } else {
    res.status(500).send('Internal error');
  }
}

module.exports = router;

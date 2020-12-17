import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { loadStandartFeed, loadNasaFeed, createUserFeed, deleteUserFeed } from '../api'
import '../styles/app.css';
import '../styles/feed.css';



export default function FeedPage() {
  const userId = JSON.parse(localStorage.getItem('user')).id || '';
  const [nasaFeed, setNasaFeed] = useState(null);
  const [userFeed, setUserFeed] = useState(null);
  const [feedTitle, setFeedTitle] = useState('');
  const [feedBody, setFeedBody] = useState('');
  const [feedId, setFeedId] = useState(null);
  const [needToDisplayForm, setNeedToDisplayForm] = useState(false);


  const history = useHistory();

  useEffect(() => {
    (async () => {
      const standartFeedResult = await loadStandartFeed(userId);
      const nasaFeedResult = await loadNasaFeed();
      setUserFeed(standartFeedResult);
      setNasaFeed(nasaFeedResult);
    })();
  }, []);

  const logOut = () => {
    history.push('/auth');
    localStorage.clear();
  }

  const handleAddFeed = async () => {
    setNeedToDisplayForm(false);
    const createdFeed = await createUserFeed(userId, feedTitle, feedBody);
    if (createdFeed) {
      setFeedId(createdFeed);
    }
    setUserFeed([...userFeed, { userId, id: feedId, title: feedTitle, body: feedBody }]);

  }

  const deleteFeed = async (id) => {
    const deletedFeed = await deleteUserFeed(id);
    if (deletedFeed.statusText === 'OK') {
      const filteredFeed = userFeed.filter(obj => obj.id !== id);
      setUserFeed(filteredFeed);
    }
  }

  const renderCreateForm = () => {
    return (
      <form id="create-form" name="form" onSubmit={handleAddFeed} >
        <fieldset id="new-item">
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title" placeholder="title" onChange={e => setFeedTitle(e.target.value)} />
          </div>
          <div>
            <label htmlFor="feed">Feed body:</label>
            <input type="text" name="body" id="body" placeholder="some text" onChange={e => setFeedBody(e.target.value)} />
          </div>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    )
  }
  const handleNeedFormDisplay = () => {
    setNeedToDisplayForm(true);
  }

  const renderFeedItems = () => {
    if (userFeed) {
      return userFeed.map(el => {
        return (
          <li className="standard-feed">
            <div>
              Title:
              <p className="standart-feed-title">{el.title}</p>
              <hr />
              Body:
              <p className="standart-feed-body">{el.body}</p>
            </div>
            <button id="delete" onClick={() => deleteFeed(el.id)}><img src="public/delete.png" /></button>
          </li>
        )
      });
    }
    return <Fragment />;
  }

  const renderNasaFeedItems = () => {
    if (nasaFeed) {
      return nasaFeed.map(el => {
        return (
          <li className="nasa-feed">
            <a className="nasa-title" href={el.link} target="_blank">{el.title}</a>
            <p className="nasa-date">{el.pubDate}</p>
          </li>
        )
      });
    }
    return <Fragment />;
  }

  return (
    <div className="page feed">
      <div className='feed-header'>
        <h2>Personalized feed below</h2>
        <button type="submit" onClick={logOut}>Log Out</button>
      </div>
      <div className="create-feed">
        <button type="submit" onClick={handleNeedFormDisplay}>Create New Feed</button>
        {
          needToDisplayForm ? renderCreateForm() : null
        }
      </div>
      <div className='feed-list'>
        <ul>
          {renderFeedItems()}
          {renderNasaFeedItems()}
        </ul>
      </div>
    </div>
  );
}

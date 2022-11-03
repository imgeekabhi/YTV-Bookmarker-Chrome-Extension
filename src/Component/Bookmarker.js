/*global chrome*/
import React, { useState, useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import { ImBin } from 'react-icons/im';

import './Bookmarker.css';
var getYouTubeID = require('get-youtube-id');

//get data from local storage
const getLocalItems = () => {
  let list = localStorage.getItem('lists');
  console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
};
const fetchYoutubeTitle = async (id) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyBazFarwuclT11lJyIxNvqhhtjEDxxXy9o`
  );
  const data = await res.json();
  return data;
};
const Bookmarker = () => {
  const [items, setItems] = useState(getLocalItems());

  //to compare the url with the local storage url
  const checkUrl = (url) => {
    let flag = false;
    items.map((item) => {
      if (item.url === url) {
        flag = true;
      }
    });
    return flag;
  };

  const addItem = (url, youtubeTitle) => {
    if (checkUrl(url)) {
      alert('This Link is already exists');
      return;
    }
    const allInputData = {
      id: new Date().getTime().toString(),
      url: url,
      title: youtubeTitle,
    };
    console.log(allInputData);
    setItems([...items, allInputData]);
  };

  // to delete data
  const deleteData = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });

    setItems(updatedItems);
  };

  // to add data in local storage
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items));
  }, [items]);
  // console.log(youtubeId);
  return (
    <>
      <header>
        <h2>Youtube Bookmarker</h2>
        <div className="plus_icon">
          <AiOutlinePlusCircle
            size={25}
            onClick={() => {
              chrome.tabs.query(
                {
                  active: true,
                  windowId: chrome.windows.WINDOW_ID_CURRENT,
                },
                function (tabs) {
                  let url = tabs[0].url;
                  let id = getYouTubeID(url);
                  fetchYoutubeTitle(id).then((data) => {
                    if (url === 'https://www.youtube.com/') {
                      console.log('Youtube Home Page');
                      addItem(url, "Youtube's Home Page");
                    } else {
                      const title = data.items[0].snippet.title;
                      addItem(url, title);
                    }
                  });
                }
              );
            }}
          />
        </div>
      </header>
      <hr />
      <div className="parent-div">
        <div className="main-div">
          <div className="card">
            <div className="child-div">
              <div className="showItems">
                {items
                  .slice(0)
                  .reverse()
                  .map((elem) => {
                    return (
                      <div className="eachItem" key={elem.id}>
                        <h2>
                          <a
                            href={elem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {elem.title}
                          </a>
                        </h2>
                        <div className="trash-btn">
                          <ImBin
                            className="fa-trash-alt"
                            title="Delete Your Link"
                            onClick={() => deleteData(elem.id)}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookmarker;

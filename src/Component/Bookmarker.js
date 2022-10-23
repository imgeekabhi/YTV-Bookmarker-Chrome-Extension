/*global chrome*/
import React, { useState, useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { ImBin } from 'react-icons/im';

import './Bookmarker.css';

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

const Bookmarker = () => {
  const [items, setItems] = useState(getLocalItems());

  const addItem = (msg) => {
    const allInputData = {
      id: new Date().getTime().toString(),
      name: msg,
    };
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
                  addItem(url);
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
                            href={elem.name}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {elem.name}
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

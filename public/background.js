/*global chrome*/
chrome.action.disable();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    console.log(tab.url);
    if (tab.url.indexOf('youtube') !== -1) {
      console.log('enable');
      chrome.action.enable(tabId);
    } else {
      console.log('disable');
      chrome.action.disable(tabId);
    }
  }
});
// export const getVideoTitle = () => {
//   chrome.tabs.onActivated.addListener(function (activeInfo) {
//     chrome.tabs.get(activeInfo.tabId, function (tab) {
//       console.log('Title: ' + tab.title);
//     });
//   });
// };
// getVideoTitle();

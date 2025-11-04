document.getElementById("censorButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: censorTerms,
    });
  });
});

function censorTerms() {
  chrome.tabs.executeScript({ file: "content_script.js" });
}


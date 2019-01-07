document.addEventListener("DOMContentLoaded", () => {
  const START = "start";
  const STOP = "stop";
  const FACT_URL = "https://cat-fact-server.herokuapp.com/";

  let isFetching;
  let factInterval;

  const initiateInterval = () => {
    factInterval = setInterval(fetchFact, 5000);
  };

  const tearDownInterval = () => clearInterval(factInterval);

  const handleOnClick = () => {
    fetchFact();
    if (isFetching) {
      chrome.storage.sync.set({ isFetching: false });
      isFetching = false;
      tearDownInterval();
      button.innerHTML = START;
    } else {
      chrome.storage.sync.set({ isFetching: true });
      isFetching = true;
      initiateInterval();
      button.innerHTML = STOP;
    }
  };

  const fetchFact = () => {
    fetch(FACT_URL)
      .then(resp => resp.json())
      .then(j => console.log(j));
  };

  const button = document.getElementById("button");
  button.addEventListener("click", handleOnClick);

  chrome.storage.sync.get("isFetching", result => {
    isFetching = result.isFetching || false;
    button.innerHTML = isFetching ? STOP : START;
  });
});

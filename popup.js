document.addEventListener("DOMContentLoaded", () => {
  const START = "start";
  const STOP = "stop";
  const FACT_URL = "https://catfact.ninja/fact";

  let isFetching;

  const handleOnClick = () => {
    fetchFact();
    if (isFetching) {
      chrome.storage.sync.set({ isFetching: false });
      isFetching = false;
      button.innerHTML = START;
    } else {
      chrome.storage.sync.set({ isFetching: true });
      isFetching = true;
      button.innerHTML = STOP;
    }
  };

  const fetchFact = () => {
    const options = {
      method: "GET",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      }
    };
    // fetch(FACT_URL, options)
    //   .then(resp => console.log(resp.json()))
    //   .then(j => console.log(j));
  };

  const button = document.getElementById("button");
  button.addEventListener("click", handleOnClick);

  chrome.storage.sync.get("isFetching", result => {
    isFetching = result.isFetching || false;
    button.innerHTML = isFetching ? STOP : START;
  });
});

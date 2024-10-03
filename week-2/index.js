function setTimeoutPromise(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

setTimeoutPromise(3000).then(() => console.log("hi there"));

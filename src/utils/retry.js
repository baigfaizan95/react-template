const retry = (fn, retriesLeft = 3, interval = 500) =>
  new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch(err => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            reject(new Error(`${err} after 3 retries`));
            return;
          }
          retry(fn, interval, retriesLeft - 1).then(resolve, reject);
        }, interval);
      });
  });

export default retry;

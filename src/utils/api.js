import axios from 'axios';

const instance = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const getRequest = (url, params = {}) => {
  return instance
    .get(url, { params })
    .then(({ data }) => data)
    .catch(err => {
      throw err;
    });
};

const postRequest = (url, body) => {
  return instance
    .post(url, body)
    .then(({ data }) => data)
    .catch(err => {
      throw err;
    });
};

const deleteRequest = url => {
  return instance
    .delete(`${url}`)
    .then(({ data }) => data)
    .catch(err => {
      throw err;
    });
};

const updateRequest = (url, body) => {
  return instance
    .put(url, body)
    .then(({ data }) => data)
    .catch(err => {
      throw err;
    });
};

export default { getRequest, postRequest, deleteRequest, updateRequest };

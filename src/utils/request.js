// import fetch from 'dva/fetch';
import axios from 'axios';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, params) {

  const response = await axios.post(url, params);

  // console.log(response)

  checkStatus(response);

  const data = await response.data;

  const ret = {
    data,
    headers: {},
  };

  // if (response.headers.get('x-total-count')) {
  //   ret.headers['x-total-count'] = response.headers.get('x-total-count');
  // }
  // console.log(ret)
  return ret;
}
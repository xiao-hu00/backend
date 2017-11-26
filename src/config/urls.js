import ENV from './env';

const urls = {
  development: {
    baseUrl : 'http://127.0.0.1:3003/'
  },
  product: {
  },
};

export const getUrl = (path, service, env = ENV.get()) => {
	console.log(urls[env][service] , path)
  return urls[env][service] + path;
};

export default urls;

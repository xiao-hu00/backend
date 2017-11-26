import { post } from './request';

const Resource = (obj = {}, service = 'baseUrl') =>
	Object.keys(obj).reduce((next, key) => {
	  const res = Object.assign({}, next);
	  if (typeof obj[key] === 'function') {
	    res[key] = obj[key];
	  } else if (typeof obj[key] === 'string') {
	  	console.log(service, obj[key])
	  	var data = post(service, obj[key])
	  	async [key](params) {
	  	  return post(service, obj[key], params);
	  	}
	    Object.assign(res, {
	      async [key](params) {
	        return post(service, obj[key], params);
	      },
	    });
	    console.log(res)
	  }
	  return res;
	}, {});

export default Resource;
import request from '../utils/request';


export default {
  async queryAll(params) {
    return request(`http://127.0.0.1:3003/api/list`, params);
  },
  async deleteOne(params) {
    return request(`http://127.0.0.1:3003/api/delete`, params);
  },
  async addOne(params) {
    return request(`http://127.0.0.1:3003/api/add`, params);
  },
};


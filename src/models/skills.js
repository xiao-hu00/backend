
import services from '../services/skills';


export default {
  namespace: 'skills',
  state: {
    list: [],
    total: null,
    current: null,
  },
  effects: {
    *queryAll({ payload }, { call, put }) {
      const data = yield call(services.queryAll, payload);
      yield put({ type: 'queryAllSuccess', payload: data.data});
    },
    *deleteOne({ payload }, { call, put }){
      const { onSuccess, id } = payload;
      let data = yield call(services.deleteOne, {id});

      if (typeof onSuccess === 'function') {
        yield put({ type: 'reload'});
        onSuccess(data.data.msg);
      }
    },
    *addOne({ payload }, { call }){
      const { onSuccess } = payload;
      let data = yield call(services.addOne, payload);

      if (typeof onSuccess === 'function') {
        onSuccess(data);
      }
    },
    *reload({ payload }, { put, call }) {
      const data = yield call(services.queryAll, payload);
      yield put({ type: 'queryAllSuccess', payload: data.data });
    },
  },
  reducers: {
    queryAllSuccess(state, { payload }) {
      let { list, total, current } =  payload;
      return {
        ...state,
        list,
        total,
        current,
      };
    },
  },
};

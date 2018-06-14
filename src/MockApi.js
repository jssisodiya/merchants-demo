import lockr from 'lockr';

// Lodash
import _random from 'lodash/random';
import _size from 'lodash/size';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';

const MockApi = {
  get: (path, payload) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const allEntities = lockr.get(path) || [];
        let entities = [];
        if (payload && payload.id) {
          resolve({
            merchant: _find(allEntities, e => {
              return e.id === payload.id;
            }),
            ...payload
          });
        } else {
          if (payload && payload.limit) {
            let { page, limit } = payload;
            if (page === undefined || limit === null) {
              page = 0;
            }
            entities = allEntities.slice(page * limit, page * limit + limit);
          } else {
            entities = allEntities;
          }
          resolve({
            merchants: entities,
            total: _size(allEntities),
            ...payload
          });
        }
      }, _random(200, 1000));
    }),

  post: (path, payload) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const allEntities = lockr.get(path) || [];
        const index = _findIndex(allEntities, e => {
          return e.id === payload.id;
        });
        if (index > -1) {
          allEntities[index] = payload;
        } else {
          allEntities.push(payload);
        }
        lockr.set(path, allEntities);
        resolve(payload || {});
      }, _random(200, 1000));
    }),
  delete: (path, payload) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        let allEntities = lockr.get(path) || [];
        const index = _findIndex(allEntities, e => {
          return e.id === payload.id;
        });
        if (index > -1) {
          allEntities.splice(index, 1);
        }
        lockr.set(path, allEntities);
        resolve(payload || {});
      }, _random(200, 1000));
    })
};

export default MockApi;

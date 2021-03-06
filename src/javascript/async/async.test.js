import { asyncGenerator } from './async';

describe('async generator', () => {
  it('auto excute generator', done => {
    const asyncFunc = asyncGenerator(function*() {
      const a = yield new Promise(resolve => {
        setTimeout(() => {
          resolve('a');
        }, 1000);
      });
      const b = yield Promise.resolve('b');
      const c = yield 'c';
      const d = yield Promise.resolve('d');
      return [a, b, c, d];
    });

    asyncFunc().then(res => {
      expect(res).toEqual(['a', 'b', 'c', 'd']);
      done();
    });
  });

  it('auto excute generator, when throw error', done => {
    const errorMsg = 'error';
    const asyncFunc = asyncGenerator(function*() {
      const s = yield 's';
      yield Promise.reject(errorMsg);
      return s;
    });

    asyncFunc()
      .catch(res => {
        expect(res).toBe(errorMsg);
        done();
      });
  });
});

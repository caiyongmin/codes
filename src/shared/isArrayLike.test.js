import isArrayLike from './isArrayLike';

describe('judge array like', () => {
  it('arguments is array like object', () => {
    (function (x) {
      x === 1;
      expect(isArrayLike(arguments)).toBe(true);
    })(1);
  });

  it('window is not array like object', () => {
    expect(isArrayLike(window)).toBe(false);
  });
});
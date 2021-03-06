import SearchParams from './searchParams';

describe('URL SearchParams', () => {
  it('parse string params', () => {
    const searchParams1 = new SearchParams({ a: 1, b: 2, c: '哈哈' });
    const searchParams2 = new SearchParams('a=1&b=2&c=%E5%93%88%E5%93%88');
    const searchParams3 = new URLSearchParams('a=1&b=2&c=%E5%93%88%E5%93%88');
    expect(searchParams1.toString()).toBe(searchParams2.toString());
    expect(searchParams2.toString()).toBe(searchParams3.toString());
  });

  it('searchParams.get', () => {
    const paramString = 'a=1&a=2&b=3&c=%E5%93%88%E5%93%88';
    const searchParams1 = new SearchParams(paramString);
    const searchParams2 = new URLSearchParams(paramString);
    expect(searchParams1.get('a')).toBe(searchParams2.get('a'));
    expect(searchParams1.get('b')).toBe(searchParams2.get('b'));
    expect(searchParams1.get('c')).toBe(searchParams2.get('c'));
  });

  it('searchParams.getAll', () => {
    const paramString = 'a=1&a=2&b=3&c=%E5%93%88%E5%93%88';
    const searchParams1 = new SearchParams(paramString);
    const searchParams2 = new URLSearchParams(paramString);
    expect(searchParams1.getAll('a')).toEqual(searchParams2.getAll('a'));
    expect(searchParams1.getAll('b')).toEqual(searchParams2.getAll('b'));
    expect(searchParams1.getAll('c')).toEqual(searchParams2.getAll('c'));
  });

  it('searchParams.set', () => {
    const paramString = '';
    const searchParams1 = new SearchParams(paramString);
    const searchParams2 = new URLSearchParams(paramString);
    searchParams1.set('a', 1); searchParams2.set('a', 1);
    searchParams1.set('a', 2); searchParams2.set('a', 2);  // reset value
    searchParams1.set('c', '哈哈'); searchParams2.set('c', '哈哈');
    expect(searchParams1.toString()).toBe(searchParams2.toString());
  });

  it('searchParams.append', () => {
    const paramString = '';
    const searchParams1 = new SearchParams(paramString);
    const searchParams2 = new URLSearchParams(paramString);
    searchParams1.append('a', 1); searchParams2.append('a', 1);
    searchParams1.append('a', 2); searchParams2.append('a', 2);
    searchParams1.append('c', '哈哈'); searchParams2.append('c', '哈哈');
    expect(searchParams1.toString()).toBe(searchParams2.toString());
  });

  it('searchParams.has', () => {
    const paramString = '';
    const searchParams1 = new SearchParams(paramString);
    const searchParams2 = new URLSearchParams(paramString);
    searchParams1.append('a', 1);
    searchParams2.append('a', 1);
    expect(searchParams1.has('a')).toBe(searchParams2.has('a'));
    expect(searchParams1.has('b')).toBe(searchParams2.has('b'));
  });

  it('searchParams for .. of', () => {
    const paramString = 'topic=api&topic=hpi&q=va';
    const searchParams1 = new SearchParams(paramString);
    const searchParams2 = new URLSearchParams(paramString);
    const result1 = [];
    const result2 = [];
    for (const p1 of searchParams1) {  // eslint-disable-line no-unused-vars
      result1.push(p1);
    }
    for (const p2 of searchParams2) {  // eslint-disable-line no-unused-vars
      result2.push(p2);
    }

    expect(result1).toEqual(result2);
  });
});

describe('URL SearchParams catch throw error', () => {
  it('searchParams.get', () => {
    const searchParams = new SearchParams('');
    expect(() => searchParams.get()).toThrowError(
      'Failed to execute \'get\' on \'URLSearchParams\':'
      + '1 arguments required, but only 0 present.'
    );
  });

  it('searchParams.getAll', () => {
    const searchParams = new SearchParams('');
    expect(() => searchParams.getAll()).toThrowError(
      'Failed to execute \'getAll\' on \'URLSearchParams\':'
      + '1 arguments required, but only 0 present.'
    );
  });

  it('searchParams.set', () => {
    const searchParams = new SearchParams('');
    expect(() => searchParams.set()).toThrowError(
      'Failed to execute \'set\' on \'URLSearchParams\':'
      + '2 arguments required, but only 0 present.'
    );
    expect(() => searchParams.set('a')).toThrowError(
      'Failed to execute \'set\' on \'URLSearchParams\':'
      + '2 arguments required, but only 1 present.'
    );
  });

  it('searchParams.append', () => {
    const searchParams = new SearchParams('');
    expect(() => searchParams.append()).toThrowError(
      'Failed to execute \'append\' on \'URLSearchParams\':'
      + '2 arguments required, but only 0 present.'
    );
    expect(() => searchParams.append('a')).toThrowError(
      'Failed to execute \'append\' on \'URLSearchParams\':'
      + '2 arguments required, but only 1 present.'
    );
  });

  it('searchParams.has', () => {
    const searchParams = new SearchParams('');
    expect(() => searchParams.has()).toThrowError(
      'Failed to execute \'has\' on \'URLSearchParams\':'
      + '1 arguments required, but only 0 present.'
    );
  });
});

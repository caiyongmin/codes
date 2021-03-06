import bind from './bind';

describe('Function.prototype.bind', () => {

  Function.prototype._bind = bind;

  it('change the direction of this, return a function, excute success', () => {
    const foo = {
      value: 1,
    };
    function bar(age1, age2) {
      age1 = age1 || 0;
      age2 = age2 || 0;
      return this.value + age1 + age2;
    }
    const newBar = bar._bind(foo, 3);
    expect(typeof newBar).toBe('function');
    // 和原生的 bind 操作进行比较验证
    expect(newBar(2)).toBe((bar.bind(foo, 3))(2));
  });

  it('when return function as a constructor, \'this\' points to the instance object', () => {
    const foo = { value: 1 };
    function bar(name, age) {
      this.name = name;
      this.age = age;
    }
    bar.prototype.friend = 'kevin';

    const bindFoo = bar.bind(foo);  // 原生 bind 操作生成的实例对象
    const bindFoo2 = bar._bind(foo);
    bindFoo2.prototype.address = 1; // 修改返回函数的原型对象

    // 验证返回的函数作为构造函数，实例对象会从原函数的原型对象上继承属性
    expect(new bindFoo2().friend).toBe(new bindFoo().friend);
    // 验证返回的函数作为构造函数，之前绑定的 this 对象会失效，this 会指向实例对象
    expect(new bindFoo2().value).toBe(undefined);
    expect(new bindFoo2().value).toBe(new bindFoo().value);
    // 验证修改返回函数的原型对象，不会引起原始函数 bar 原型对象的修改
    expect(bar.prototype.address).toBe(undefined);
  });

  it('when rebind \'this\', cannot change the direction of this', () => {
    const foo = {
      value: 1,
    };
    function bar(age1, age2) {
      age1 = age1 || 0;
      age2 = age2 || 0;
      return this.value + age1 + age2;
    }
    const bindFoo = bar.bind(foo);  // 原生 bind 操作生成的实例对象
    const bindFoo2 = bar._bind(foo);

    // 对返回的函数用 call 或者 apply 重新绑定 this 对象时，this 对象不会发生改变
    expect(bindFoo2.call({ value: 2 })).toBe(1);
    expect(bindFoo2.call({ value: 2 })).toBe(bindFoo.call({ value: 2 }));
  });

  it('when \'this\' argument is null or undefined', () => {
    window.value = 2;
    function bar(age1, age2) {
      age1 = age1 || 0;
      age2 = age2 || 0;
      return this.value + age1 + age2;
    }

    // 这是非严格模式下的运行结果，严格模式下会报错
    expect(bar._bind(null, 3)(1)).toBe(6);
    expect(bar._bind(undefined, 3)(1)).toBe(6);
  });
});

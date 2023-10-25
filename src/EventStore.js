// 引入事件总线
const EventBus = require('./EventBus');
// 引入工具
const { isObject } = require('./utils');
class EventStore {
  // 对数据进行初始化--接收一个opstion对象
  constructor(opstion) {
    // 类型的判断
    if (!isObject(opstion.state)) {
      throw new TypeError('state must be object type');
    }
    if (opstion.action && isObject(opstion.action)) {
      // 获取到所有的action进行判断
      const values = Object.values(opstion.action);
      for (const value of values) {
        if (typeof value !== 'function') {
          throw new TypeError('action must be function type');
        }
      }
      // 添加到类上
      this.action = opstion.action;
    }
    // 将opstion中的数据添加到类上
    this.state = opstion.state;
    // 创建两个事件总线用于通知
    this.even = new EventBus();
    this.evens = new EventBus();
    // 对state数据进行监听
    this.observe(opstion.state);
  }
  observe(state) {
    // 获取到this
    const _this = this;
    // 获取到state上的key 再根据key获取到数据源
    Object.keys(state).forEach((key) => {
      let Orderdata = this.state[key]; //拿到每个数据--旧数据
      // 调用object.defineproperty方法对数据进行监听
      Object.defineProperty(state, key, {
        get: function () {
          return Orderdata;
        },
        set: function (NewData) {
          if (Orderdata === NewData) return;
          // 1.更新数据
          Orderdata = NewData;
          // 2.通知事件
          _this.even.emit(key, Orderdata);
          _this.evens.emit(key, { [key]: Orderdata });
        },
      });
    });
  }
  /**
   * 监听函数
   * @param {*} stateKey 监听的state中的key
   * @param {*} stateCallback 监听到后的处理函数
   */
  onState(stateKey, stateCallback) {
    const keys = Object.keys(this.state);
    if (keys.indexOf(stateKey) === -1) {
      throw new Error('the  key does not in state');
    }
    if (typeof stateCallback !== 'function') {
      throw new TypeError('the eventCallback must be function type');
    }
    this.even.on(stateKey, stateCallback);
    const data = this.state[stateKey];
    stateCallback.apply(this.state, [data]);
  }
  /**
   * 监听多个key
   * @param {*} stateKeys 多个key
   * @param {*} stateCallback 一个回调
   */
  onStates(stateKeys, stateCallback) {
    if (typeof stateKeys !== 'object') {
      throw new TypeError('the onStates keys must be Array type');
    }
    const keys = Object.keys(this.state);
    const value = {};
    for (const key of stateKeys) {
      if (keys.indexOf(key) === -1) {
        throw new Error('the state dose node have your key');
      }
      this.evens.on(key, stateCallback);
      value[key] = this.state[key];
    }
    stateCallback.apply(this.state, [value]);
  }
  /**
   * Set数据
   * @param {*} stateKey setkey
   * @param {*} stateValue setdata
   */
  setState(stateKey, stateValue) {
    this.state[stateKey] = stateValue;
  }
  /**
   * 取消监听函数s版
   * @param {*} stateKeys 需要取消的key
   * @param {*} stateCallback 已绑定的回调
   */
  offStates(stateKeys, stateCallback) {
    const keys = Object.keys(this.state);
    if (typeof stateKeys !== 'object') {
      throw new TypeError('the keys must be Array type');
    }
    stateKeys.forEach((key) => {
      if (keys.indexOf(key) === -1) {
        throw new TypeError('the key does not in state');
      }
      this.evens.off(key, stateCallback);
    });
  }
  /**
   * 取消监听函数
   * @param {*} statekey 需要取消的key
   * @param {*} stateCallback 已绑定的回调
   */
  offState(statekey, stateCallback) {
    const keys = Object.keys(this.state);
    if (keys.indexOf(statekey) === -1) {
      throw new Error('the state does not have your key');
    }
    this.even.off(statekey, stateCallback);
  }
  /**
   * 执行异步
   * @param {*} actionName 异步名称
   * @param  {...any} args 想传递的参数
   */
  dispatch(actionName, ...args) {
    if (typeof actionName !== 'string') {
      throw new TypeError('the action must be string type');
    }
    if (Object.keys(this.action).indexOf(actionName) === -1) {
      throw new Error('the action dont in stateAction');
    }
    // 通过this调用该函数
    const actionFun = this.action[actionName];
    // 第二个参数是ctx目的是吧state传递过去做修改以及我们的payload
    actionFun.apply(this, [this.state, ...args]);
  }
}
module.exports = EventStore;

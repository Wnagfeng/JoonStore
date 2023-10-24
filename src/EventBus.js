// 全局事件总线
// Author:coderwhy(恩师)
// Rewrite:coderJoon(小粉丝)
class EventBus {
  constructor() {
    // 存储事件的对象
    this.EventBus = {};
  }
  /**
   * 监听事件
   * @param {*} eventName 事件名称
   * @param {*} eventCallback 事件回调
   * @param {*} thisArg this指向
   */
  on(eventName, eventCallback, thisArg) {
    // 类型校验
    if (typeof eventName !== 'string') {
      throw new TypeError('eventname must be string type');
    }

    if (typeof eventCallback !== 'function') {
      throw new TypeError('eventCallback must be function type');
    }
    // 根据事件名取到对应的数据源
    let handlers = this.EventBus[eventName];
    // 第一次可能为空 如果取不到我们需要创建数据结构并且把该数据结构push进去
    if (!handlers) {
      // 创建数据结构
      handlers = [];
      // 把数据结构放进去
      this.EventBus[eventName] = handlers;
    }
    // 添加事件回调和this指向
    handlers.push({
      eventCallback,
      thisArg,
    });
    // 返回this目的是为了后期可能进行链式调用
    return this;
  }
  /**
   * 触发事件
   * @param {*} eventName 触发事件名称
   * @param  {...any} payload 触发事件传递的数据
   */
  emit(eventName, ...payload) {
    if (typeof eventName !== 'string') {
      throw new TypeError('eventname must be string type');
    }
    // 根据事件名称找到对应的事件回调去触发函数
    // 1.取到事件数据结构
    // tips:给他||的原因是防止取不到为undefined 防止报错
    const handlers = this.EventBus[eventName] || [];
    handlers.forEach((handler) => {
      handler.eventCallback.apply(handler.thisArg, payload);
    });
    return this;
  }
  /**
   * 取消监听
   * @param {*} eventName 事件名称
   * @param {*} eventCallback 事件回调
   */
  off(eventName, eventCallback) {
    if (typeof eventName !== 'string') {
      throw new TypeError('eventname must be string type');
    }
    if (typeof eventCallback !== 'function') {
      throw new TypeError('eventcallback must bu function type');
    }
    // 最难的部分
    // 1.首先要拿到事件名对应的数据结构
    const handlers = this.EventBus[eventName]; //不用|| 因为下面有判断
    if (handlers && eventCallback) {
      // 拿到数据对象
      const newHandlers = [...handlers];
      // 数据结构为 xxx:[{eventcallback,thisarg},...]
      // 遍历这个结构
      for (let i = 0; i < newHandlers.length; i++) {
        const handler = newHandlers[i]; //每一个对象
        if (handler.eventCallback === eventCallback) {
          const index = handlers.indexOf(handler);
          handlers.splice(index, 1);
        }
      }
    }

    if (handlers.length === 0) {
      delete this.EventBus[eventName];
    }
  }
  /**
   * 只监听一次
   * @param {*} eventName 事件名称
   * @param {*} eventCallback 事件回调
   * @param {*} thisArg this指向
   */
  once(eventName, eventCallback, thisArg) {
    if (typeof eventName !== 'string') {
      throw new TypeError('eventname must be string type');
    }
    if (typeof eventCallback !== 'function') {
      throw new TypeError('eventcallback must be function');
    }
    // 只监听一次函数我们怎么写？
    // 1.肯定要执行监听
    // 2.把以前的监听都取消掉
    /* 
    实现思路：
    你只要调用了我的once方法你肯定是要执行监听的
    但是在执行监听之前我需要把之前的监听都取消掉
    当emit执行的时候我们需要调用这个函数执行回调
    看我操作
     */
    const tempfunction = (...payload) => {
      this.off(eventName, tempfunction); //取消监听
      eventCallback.apply(thisArg, payload); //执行函数
    };
    // 执行监听逻辑
    return this.on(eventName, tempfunction, thisArg);
    /*
    你可能会问的问题
    老师 你传递eventname 没毛病 你这个 tempfunction传递过去我那边的off方法是通过 eventcallback判断是否取消的 你这怎么取消呢 你这有bug 
    回答：你看底下this.on 是不是push了temfunction作为回调函数 所以这个tem函数能正常取消掉
     */
  }

  clear() {
    this.EventBus = {};
  }

  hasEvent(eventName) {
    return Object.keys(this.EventBus).includes(eventName);
  }
}
module.exports = EventBus;
// 全局事件总线methods
/* 
on---监听事件
once---之监听一次
emit---触发事件
off---取消监听
clear---清除事件
hasEvent---是否含有该事件
 */

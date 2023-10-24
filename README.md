# JoonStore

#### 一个全局事件总线和全局数据共享库

# 设计灵感

一个基于事件的全局状态管理工具，可以在Vue、React、小程序等任何地方使用。

coderwhy说过：对于代码进行优秀的管理是你不写出屎山的前提

# 1.如何使用

```shell
npm install joonstore
```

# 2.用法演示

## 2.1事件总线(EventBus)

* 监听和触发测试

  ```js
  const changename = (arg) => {
    console.log('他改名字了，传递的参数是' + arg);
  };
  
  eventbus.on('changename', changename);
  
  setTimeout(() => {
    eventbus.emit('changename', ['Joon', 'Thomas']);
  }, 3000);
  ```

* 取消监听测试

  ```js
  const changename = (arg) => {
    console.log('他改名字了，传递的参数是' + arg);
  };
  
  eventbus.on('changename', changename);
  eventbus.off('changename', changename);
  
  setTimeout(() => {
    eventbus.emit('changename', ['Joon', 'Thomas']);
  }, 3000);
  ```

* Once方法

  ```js
  const changename = (arg) => {
    console.log('他改名字了，传递的参数是' + arg);
  };
  
  eventbus.once('changename', changename);
  
  // 触发一：
  setTimeout(() => {
    eventbus.emit('changename', ['Joon', 'Thomas']);
  }, 3000);
  // 触发二：
  setTimeout(() => {
    eventbus.emit('changename', ['Joon1', 'Thomas1']);
  }, 4000);
  ```

* Clear方法

  ```js
  const changename = (arg) => {
    console.log('他改名字了，传递的参数是' + arg);
  };
  
  eventbus.once('changename', changename);
  eventbus.clear();
  
  // 触发一：
  setTimeout(() => {
    eventbus.emit('changename', ['Joon', 'Thomas']);
  }, 3000);
  // 触发二：
  setTimeout(() => {
    eventbus.emit('changename', ['Joon1', 'Thomas1']);
  }, 4000);
  ```

* Hasevent方法

  ```js
  const changename = (arg) => {
    console.log('他改名字了，传递的参数是' + arg);
  };
  
  eventbus.once('changename', changename);
  
  console.log(eventbus.hasEvent('changename'));
  ```

## 2.2事件共享(EventStore)








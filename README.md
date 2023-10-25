# JoonStore

#### 一个全局事件总线和全局数据共享库

### A global event bus and global data sharing library

# 设计灵感(Design inspiration)

专门在 Vue 中实现集中式状态(数据)管理的一个 Vue 插件，多个组件中的共享状态的管理(读/写),且适用于任意组件间的通信

A Vue plug-in that specifically implements centralized state (data) management in Vue, the management of shared state (read/write) in multiple components, and is suitable for communication between any component

coderwhy 说过：对于数据进行优秀的管理是你不写出屎山的前提

Coderwhy said: Good management of data is a prerequisite for you not to write a mountain of

# 1.如何使用(How to use)

```shell
npm install joonstore
```

# 2.用法演示(Usage demonstration)

## 2.1 事件总线(EventBus)

- 监听和触发测试(Listen and trigger tests)

  ```js
  const changename = (arg) => {
    console.log('他改名字了，传递的参数是' + arg);
  };

  eventbus.on('changename', changename);

  setTimeout(() => {
    eventbus.emit('changename', ['Joon', 'Thomas']);
  }, 3000);
  ```

- 取消监听测试(Cancel the listening test)

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

- Once 方法(Once method)

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

- Clear 方法 (Clear method)

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

- Hasevent 方法 (Hasevent  method)

  ```js
  const changename = (arg) => {
    console.log('他改名字了，传递的参数是' + arg);
  };
  
  eventbus.once('changename', changename);
  
  console.log(eventbus.hasEvent('changename'));
  ```

## 2.2 事件共享(EventStore)

#### tips：我们建议您在使用监听器监听数据时使用公共函数对其进行处理，否则可能会出现取消不掉的情况！

#### tips：We recommend that you use public functions to process data when listening to data using the listener, otherwise it may not be canceled!

#### 使用步骤：

* 引入库

  Ingest libraries

* 格式化数据(我们建议您按照Demo去格式化数据)

  Format data (we recommend that you follow the demo to format data)



* 监听(Snoop test)

  ```js
  const eventhandelfunction = (newValue) => {
    console.log('监听到', newValue);
  };
  eventStore.onState('name', eventhandelfunction);
  setTimeout(() => {
    eventStore.setState('name', 'wangfeng1');
  }, 2000);
  
  ```

* 多个数据监听(Multiple data listeners)

  ```js
  const eventhandelfunction = (newValue) => {
    console.log('监听到', newValue);
  };
  eventStore.onStates(['name', 'skill'], eventhandelfunction);
  setTimeout(() => {
    eventStore.setState('skill', ['1', '2', '3', '4']);
  }, 2000);
  setTimeout(() => {
    eventStore.setState('name', 'Joon');
  }, 4000);
  ```

* 取消监听(Cancel listening)

  ```js
  const eventhandelfunction = (newValue) => {
    console.log('监听到', newValue);
  };
  eventStore.onState('name', eventhandelfunction);
  eventStore.offState('name', eventhandelfunction);
  setTimeout(() => {
    eventStore.setState('name', 'wangfeng1');
  }, 2000);
  ```

* 多个数据监听取消(Multiple data listeners canceled)

  ```js
  const eventhandelfunction = (newValue) => {
    console.log('监听到', newValue);
  };
  eventStore.onStates(['name', 'skill'], eventhandelfunction);
  eventStore.offStates(['name', 'skill'], eventhandelfunction);
  setTimeout(() => {
    eventStore.setState('skill', ['1', '2', '3', '4']);
  }, 2000);
  ```

* Dispatch

  ```js
  const payload = {
    success: '你成功了',
  };
  const info = {
    name: 'JoonStore',
    state: 'dev',
  };
  eventStore.dispatch('fetchGetPersongInfoForyou', payload);
  eventStore.dispatch('changeStatedata', info);
  console.log(eventStore.state);
  ```

  






// eventbus测试
// const { EventBus } = require('../src');
// const eventbus = new EventBus();
// 1.测试监听函数和触发函数
// const changename = (arg) => {
//   console.log('他改名字了，传递的参数是' + arg);
// };
// eventbus.on('changename', changename);

// setTimeout(() => {
//   eventbus.emit('changename', ['Joon', 'Thomas']);
// }, 3000);

// 2.取消监听测试
// const changename = (arg) => {
//   console.log('他改名字了，传递的参数是' + arg);
// };
// eventbus.on('changename', changename);
// eventbus.off('changename', changename);
// setTimeout(() => {
//   eventbus.emit('changename', ['Joon', 'Thomas']);
// }, 3000);

// 3.只监听一次测试
// const changename = (arg) => {
//   console.log('他改名字了，传递的参数是' + arg);
// };
// eventbus.once('changename', changename);
// // 触发一：
// setTimeout(() => {
//   eventbus.emit('changename', ['Joon', 'Thomas']);
// }, 3000);
// // 触发二：
// setTimeout(() => {
//   eventbus.emit('changename', ['Joon1', 'Thomas1']);
// }, 4000);

// 4.测试clear函数
// const changename = (arg) => {
//   console.log('他改名字了，传递的参数是' + arg);
// };
// eventbus.once('changename', changename);
// // 清除函数：
// eventbus.clear();
// // 触发一：
// setTimeout(() => {
//   eventbus.emit('changename', ['Joon', 'Thomas']);
// }, 3000);
// // 触发二：
// setTimeout(() => {
//   eventbus.emit('changename', ['Joon1', 'Thomas1']);
// }, 4000);

// 5.测试hasevent方法
// const changename = (arg) => {
//   console.log('他改名字了，传递的参数是' + arg);
// };
// eventbus.once('changename', changename);
// console.log(eventbus.hasEvent('changename'));

// 6.测试为啥需要this
// const object = {
//   name: 'wangfeng',
//   age: '20',
//   gender: '男',
//   fun: function Resume() {
//     console.log(
//       '我的名字是:',
//       this.name,
//       '我的年龄是:',
//       this.age,
//       '我的性别是:',
//       this.gender,
//     );
//   },
// };
// // 不传递this的情况
// // A组件:
// eventbus.on('PlaceResume', object.fun);
// // B组件两秒后触发
// setTimeout(() => {
//   eventbus.emit('PlaceResume');
// }, 2000);
// // 我的名字是: undefined 我的年龄是: undefined 我的性别是: undefined
// // 传递this的情况
// eventbus.on('PlaceResume', object.fun, object);
// // B组件两秒后触发
// setTimeout(() => {
//   eventbus.emit('PlaceResume');
// }, 2000);
// // 我的名字是: wangfeng 我的年龄是: 20 我的性别是: 男

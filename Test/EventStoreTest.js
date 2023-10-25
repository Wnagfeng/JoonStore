const { EventStore } = require('../src');
const axios = require('axios');
const eventStore = new EventStore({
  state: {
    name: 'wangfeng',
    age: '20',
    gender: '男',
    skill: ['code', 'JavaScript', 'vue', 'React'],
    slogan: '',
    data: {},
  },
  action: {
    fetchGetPersongInfoForyou(ctx, { success }) {
      axios.get('http://localhost:3000/getinfo').then((res) => {
        ctx.slogan = res.data.slogan;
      });
      console.log(success);
    },
    changeStatedata(ctx, data) {
      console.log(data);
      ctx.data = data;
    },
  },
});
// 1.监听测试
// const eventhandelfunction = (newValue) => {
//   console.log('监听到', newValue);
// };
// eventStore.onState('name', eventhandelfunction);
// setTimeout(() => {
//   eventStore.setState('name', 'wangfeng1');
// }, 2000);

// 2.监听测试s版本
// const eventhandelfunction = (newValue) => {
//   console.log('监听到', newValue);
// };
// eventStore.onStates(['name', 'skill'], eventhandelfunction);
// setTimeout(() => {
//   eventStore.setState('skill', ['1', '2', '3', '4']);
// }, 2000);
// setTimeout(() => {
//   eventStore.setState('name', 'Joon');
// }, 4000);

// 3.取消监听测试s版本
// const eventhandelfunction = (newValue) => {
//   console.log('监听到', newValue);
// };
// eventStore.onStates(['name', 'skill'], eventhandelfunction);
// eventStore.offStates(['name', 'skill'], eventhandelfunction);
// setTimeout(() => {
//   eventStore.setState('skill', ['1', '2', '3', '4']);
// }, 2000);

// 4.取消监听测试
// const eventhandelfunction = (newValue) => {
//   console.log('监听到', newValue);
// };
// eventStore.onState('name', eventhandelfunction);
// eventStore.offState('name', eventhandelfunction);
// setTimeout(() => {
//   eventStore.setState('name', 'wangfeng1');
// }, 2000);

// 5.测试Dispatch
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

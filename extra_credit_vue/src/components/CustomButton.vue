<template>
    <button @click="incrementCount">
      Times Clicked: {{ count }} times!
    </button>
  </template>
  
  <script>
  export default {
    data() {
      return {
        count: 0
      };
    },
    methods: {
      incrementCount() {
        this.count++;
      }
    }
  };
  </script>
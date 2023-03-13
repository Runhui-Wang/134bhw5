<template>
  <div>
    <custom-button></custom-button>
  </div>
</template>

<script>
import CustomButton from './components/CustomButton.vue';

export default {
  components: {
    CustomButton
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <AppHeader />
  <router-view />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'

export default {
  components: {
    AppHeader
  }
}
</script>

<style lang="scss">
* {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

li {
  list-style-type: none;
}

.flex1 {
  flex: 1;
}

.flex2 {
  flex: 2;
}

.flex3 {
  flex: 3;
}

.flex10 {
  flex: 10;
}

button {
  color: white;
  background-color: #416bf3;
  border: none;
  height: 30px;
  padding: 3px 20px;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4345fb;
  }

  &:focus {
    outline: none;
  }
}
</style>

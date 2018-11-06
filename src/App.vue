<template>
<layout>
  <h1 slot="header">Le titre de ma page</h1>
  <grid class="grid"/>
  <textarea slot="footer" name="console" id="cmd" >type code here...</textarea>


</layout>

</template>

<script>
import Layout from "./components/Layout.vue";
import Grid from "./components/Grid.vue";
export default {
  name: "app",
  components: {
    Layout,
    Grid
  }
};
</script>

<style  >
body {
  overscroll-behavior: none;
}
header {
  background-color: aquamarine;
}
footer {
  display: flex;
}
footer > textarea {
  flex: 1;
}
nav {
  background-color: blanchedalmond;
}
aside {
  background-color: antiquewhite;
}
main {
  display: flex;
}
main > canvas {
  flex: 1;
  border: 1px solid gray;
}
</style>




<template>
  <div class="image">
    <img
      src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="">
  </div>
</template>

<script>
export default {

  data() {
    return {
    }
  },
  props: ['user'],
}
</script>
<style>
.image {
  width: 100%;
  height: 93vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
</style>




<template>
  <div>
    <h3 v-if="user">HI, {{ user._source.name }}</h3>
    <h3 v-else>Hello</h3>
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




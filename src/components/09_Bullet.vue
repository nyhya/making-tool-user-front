<template>
  <v-circle :config="options"></v-circle>
</template>
<script>
export default {
  data() {
    return {
      options: {
        x: 0,
        y: 0,
        radius: window.innerWidth * 0.011,
        fill: "#deb658",
        stroke: "#deb658",
        strokeWidth: 0,
      },
    };
  },
};
</script>
<template>
  <v-group :config="contentOptions" ref="container" v-if="isLoading">
    <v-rect :config="rectOptions" />
    <v-image :config="svgOptions" />
  </v-group>
</template>
<script>
import * as DesignElement from "@/constant/DesignElement.js";
const windowWidth = DesignElement.COMMON_LAYOUT.WINDOW_WIDTH;
const windowHeight = DesignElement.COMMON_LAYOUT.WINDOW_HEIGHT;
export default {
  name: "DesignGuide03",
  data() {
    return {
      round: 30,
      contentOptions: {
        x: 0,
        y: 0,
        listening: false,
      },
      rectOptions: {
        x: 0,
        y: 0,
        width: windowWidth,
        height: windowHeight * 0.65 + 1,
        fill: "#e9e9e9",
      },
      svgOptions: {
        x: 0,
        y: windowHeight * 0.65,
        image: null,
        width: windowWidth,
        height: 0,
        crop: null,
      },
      isLoading: false,
    };
  },
  computed: {
    container() {
      return this.$refs.container.getNode();
    },
  },
  created() {
    const that = this;
    const svg = new window.Image();
    svg.src = "./images/ribbon.svg";
    svg.onload = function () {
      that.svgOptions.image = svg;
      that.svgOptions.height = windowWidth * (svg.height / svg.width);
      that.isLoading = true;
    };
  },
  mounted() {},
  methods: {},
};
</script>
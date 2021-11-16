<template>
  <v-group :config="contentOptions" ref="container">
    <v-rect :config="rectTopOptions" />
    <v-rect :config="rectBottomOptions" />
  </v-group>
</template>
<script>
import * as DesignElement from "@/constant/DesignElement.js";
const windowWidth = DesignElement.COMMON_LAYOUT.WINDOW_WIDTH;
const windowHeight = DesignElement.COMMON_LAYOUT.WINDOW_HEIGHT;
export default {
  name: "DesignGuide01",
  data() {
    return {
      round: 30,
      contentOptions: {
        x: 0,
        y: 0,
        listening: false,
      },
      rectTopOptions: {
        x: 0,
        y: 0,
        width: windowWidth,
        height: windowHeight * 0.13647,
        // fill: "#e9e9e9",
        fillLinearGradientStartPoint: { x: 0, y: 0 },
        fillLinearGradientEndPoint: { x: 0, y: windowHeight * 0.13647 },
        fillLinearGradientColorStops: [
          0,
          "rgba(0, 0, 0, 0.45)",
          1,
          "rgba(0, 0, 0, 0)",
        ],
      },
      rectBottomOptions: {
        x: 0,
        y: windowHeight - windowHeight * 0.3317664,
        width: windowWidth,
        height: windowHeight * 0.3317664,
        // fill: "#e9e9e9",
        fillLinearGradientStartPoint: { x: 0, y: 0 },
        fillLinearGradientEndPoint: { x: 0, y: windowHeight * 0.3317664 },
        fillLinearGradientColorStops: [
          0,
          "rgba(0, 0, 0, 0)",
          1,
          "rgba(0, 0, 0, 0.65)",
        ],
      },
    };
  },
  computed: {
    container() {
      return this.$refs.container.getNode();
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
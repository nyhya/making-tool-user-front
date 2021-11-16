<template>
  <v-group>
    <v-shape :config="optionProfileGuide" />
  </v-group>
</template>
<script>
import * as DesignElement from "@/constant/DesignElement.js";

const windowWidth = DesignElement.COMMON_LAYOUT.WINDOW_WIDTH;
const windowHeight = DesignElement.COMMON_LAYOUT.WINDOW_HEIGHT;

export default {
  name: "DesignGuide02",
  data() {
    return {
      optionProfileGuide: {
        sceneFunc: function (context, shape) {
          var circleSize = (windowWidth / 2) * 0.8;
          var circlePositionX = windowWidth / 2;
          var circlePositionY = windowHeight / 2;

          context.beginPath();
          context.arc(
            circlePositionX,
            circlePositionY,
            circleSize,
            0,
            Math.PI * 2,
            true
          );
          context.moveTo(0, 0);
          context.lineTo(windowWidth, 0);
          context.lineTo(windowWidth, windowHeight);
          context.lineTo(0, windowHeight);
          context.fillStrokeShape(shape);
        },
        x: 0,
        y: 0,
        fill: "rgba(0, 0, 0, 0.5)",
        listening: false,
      },
    };
  },
};
</script>

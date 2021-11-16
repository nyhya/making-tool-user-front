<template>
  <v-group :config="contentOptions" ref="container">
    <v-shape :config="optionDesignTypeFill" />
    <v-shape :config="optionDesignTypeLine" />
  </v-group>
</template>
<script>
import * as DesignElement from "@/constant/DesignElement.js";
export default {
  name: "DesignGuide04",
  data() {
    return {
      contentOptions: {
        x: 0,
        y: 0,
        listening: false,
      },
      optionDesignTypeFill: {
        sceneFunc: function (context, shape) {
          var round = 20; // 곡선
          var width = DesignElement.COMMON_LAYOUT.WINDOW_WIDTH; //전체 영역의 가로
          var height = DesignElement.COMMON_LAYOUT.WINDOW_WIDTH * 1.5; //전체 영역의 세로
          var rectWidth = parseInt(width * 0.565);
          var rectHeight = parseInt(width * 1.0675) - round - 5;
          var paddingLeft = parseInt(width * 0.38666667);
          context.beginPath();
          context.moveTo(0, 0);
          context.lineTo(paddingLeft, 0);
          context.lineTo(paddingLeft, rectHeight);
          context.quadraticCurveTo(
            paddingLeft,
            rectHeight + round,
            paddingLeft + round,
            rectHeight + round
          );
          context.lineTo(paddingLeft + rectWidth - round, rectHeight + round);
          context.quadraticCurveTo(
            paddingLeft + rectWidth,
            rectHeight + round,
            paddingLeft + rectWidth,
            rectHeight
          );
          context.lineTo(paddingLeft + rectWidth, 0);
          context.lineTo(width, 0);
          context.lineTo(width, height);
          context.lineTo(0, height);
          context.moveTo(0, 0);
          context.closePath();
          context.fillStrokeShape(shape);
        },
        x: 0,
        y: 0,
        fill: "#ece0d7",
        listening: false,
      },
      optionDesignTypeLine: {
        sceneFunc: function (context, shape) {
          var round = 20; // 곡선
          var width = DesignElement.COMMON_LAYOUT.WINDOW_WIDTH; //전체 영역의 가로
          var rectWidth = parseInt(width * 0.565);
          var rectHeight = parseInt(width * 1.0675) - round - 5;
          var paddingLeft = parseInt(width * 0.38666667);
          context.beginPath();
          context.moveTo(paddingLeft, -10);
          context.lineTo(paddingLeft, rectHeight);
          context.quadraticCurveTo(
            paddingLeft,
            rectHeight + round,
            paddingLeft + round,
            rectHeight + round
          );
          context.lineTo(paddingLeft + rectWidth - round, rectHeight + round);
          context.quadraticCurveTo(
            paddingLeft + rectWidth,
            rectHeight + round,
            paddingLeft + rectWidth,
            rectHeight
          );
          context.lineTo(paddingLeft + rectWidth, 0);
          context.lineTo(width, -10);
          context.closePath();
          context.fillStrokeShape(shape);
        },
        x: 0,
        y: 0,
        stroke: "#9C866A",
        listening: false,
      },
    };
  },
};
</script>
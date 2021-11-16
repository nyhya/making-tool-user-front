<template>
  <v-group :config="contentOptions" ref="container">
    <v-shape :config="optionDesignType" />
  </v-group>
</template>
<script>
import * as DesignElement from "@/constant/DesignElement.js";
export default {
  name: "DesignGuide02",
  data() {
    return {
      round: 30,
      contentOptions: {
        x: 0,
        y: 0,
        listening: false,
      },
      optionDesignType: {
        sceneFunc: function (context, shape) {
          var round = 30; // 곡선
          var width = DesignElement.COMMON_LAYOUT.WINDOW_WIDTH; //전체 영역의 가로
          var height = DesignElement.COMMON_LAYOUT.WINDOW_WIDTH * 1.5; //전체 영역의 세로
          var topHeight = width * 0.35; //상단 영역의 높이
          var blankWidth = width * 0.0625; // 빈 공간을 채울 왼쪽영역
          var blankHeight = Math.max(round * 2, width * 0.5175); // 빈 공간의 높이

          blankHeight, round;
          context.beginPath();
          context.moveTo(0, 0);
          context.lineTo(width, 0);
          context.lineTo(width, topHeight - round);
          context.quadraticCurveTo(width, topHeight, width - round, topHeight);
          context.lineTo(blankWidth + round, topHeight);
          context.quadraticCurveTo(
            blankWidth,
            topHeight,
            blankWidth,
            topHeight + round
          );
          context.lineTo(blankWidth, topHeight + blankHeight - round);
          context.quadraticCurveTo(
            blankWidth,
            topHeight + blankHeight,
            blankWidth + round,
            topHeight + blankHeight
          );
          context.lineTo(width - round, topHeight + blankHeight);
          context.quadraticCurveTo(
            width,
            topHeight + blankHeight,
            width,
            topHeight + blankHeight + round
          );
          context.lineTo(width, height);
          context.lineTo(0, height);
          context.moveTo(0, 0);
          context.closePath();

          context.fillStrokeShape(shape);
        },
        x: 0,
        y: 0,
        fill: "white",
        listening: false,
      },
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
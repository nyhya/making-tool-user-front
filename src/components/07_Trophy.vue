<template>
  <v-image v-if="isShowTrophy" :config="options" />
</template>

<script>
import * as UTIL from "@/utils/Util.js";

export default {
  name: "Trophy",
  props: {
    topLogo: { type: String, default: "" },
    designType: { type: String, default: "" },
    isShowTrophy: { type: Boolean, default: true },
    awardHistoryPositionY: { type: Number, default: 0 },
  },
  watch: {
    awardHistoryPositionY(value) {
      this.awardHistoryRePositionY = value;
      this.init();
    },
  },

  created() {
    this.init();
  },
  data() {
    return {
      options: {
        name: "Trophy",
        x: 0,
        y: 0,
        image: null,
        width: 0,
        height: 0,
        crop: null,
      },
    };
  },
  methods: {
    init() {
      const that = this;
      var storeTemplateData = this.$store.getters.findTemplateDate(
        this.designType
      );
      if (storeTemplateData.length > 0 && storeTemplateData[0]) {
        var templateInfo = storeTemplateData[0];
        const trophyImage = new window.Image();
        trophyImage.crossOrigin = "Anonymous";

        trophyImage.src = templateInfo.trophyPath;
        trophyImage.onload = function () {
          var imgRatio = trophyImage.width / trophyImage.height;
          that.options.image = trophyImage;
          that.options.x = templateInfo.trophyX;

          that.designType == "DESIGN_TYPE_B"
            ? (that.options.y =
                templateInfo.trophyY + that.awardHistoryRePositionY)
            : (that.options.y = templateInfo.trophyY);
          that.options.width = templateInfo.trophyWidth;
          that.options.height = templateInfo.trophyWidth / imgRatio;
          that.options.crop = UTIL.getCrop(
            trophyImage,
            {
              width: templateInfo.trophyWidth,
              height: templateInfo.trophyWidth / imgRatio,
            },
            "center-middle"
          );
        };
      } else {
        console.error("trophy.vue", "템플릿키에 대한 정보 없음");
      }
    },
  },
};
</script>
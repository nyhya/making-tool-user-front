<template>
  <v-image :config="options" />
</template>

<script>
import * as UTIL from "@/utils/Util.js";

export default {
  name: "TopLogo",
  props: {
    designType: { type: String, default: "" },
  },
  created() {
    const that = this;

    const backgroundImg = new window.Image();
    backgroundImg.crossOrigin = "Anonymous";

    var storeTemplateData = this.$store.getters.findTemplateDate(
      this.designType
    );

    if (storeTemplateData.length > 0 && storeTemplateData[0]) {
      var templateInfo = storeTemplateData[0];

      backgroundImg.src = templateInfo.topLogo;

      backgroundImg.onload = function () {
        var imgRatio = backgroundImg.width / backgroundImg.height;
        that.options.image = backgroundImg;
        that.options.x = templateInfo.topLogoX;
        that.options.y = templateInfo.topLogoY;
        that.options.width = templateInfo.topLogoWidth;
        that.options.height = templateInfo.topLogoWidth / imgRatio;
        that.options.crop = UTIL.getCrop(
          backgroundImg,
          {
            width: templateInfo.topLogoWidth,
            height: templateInfo.topLogoWidth / imgRatio,
          },
          "center-middle"
        );
      };
    } else {
      console.error("01_TopLogo.vue", "템플릿키에 대한 정보 없음");
    }
  },
  data() {
    return {
      options: {
        name: "TopLogo",
        image: null,
        width: 0,
        height: 0,
        crop: null,
      },
    };
  },
};
</script>
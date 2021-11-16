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

    const kyoboImage = new window.Image();
    kyoboImage.crossOrigin = "Anonymous";

    var storeTemplateData = this.$store.getters.findTemplateDate(
      this.designType
    );

    if (storeTemplateData.length > 0 && storeTemplateData[0]) {
      var templateInfo = storeTemplateData[0];

      kyoboImage.src = templateInfo.kyoboLogoPath;

      kyoboImage.onload = function () {
        var imgRatio = kyoboImage.width / kyoboImage.height;
        that.options.image = kyoboImage;
        that.options.x = templateInfo.kyoboLogoPostionX;
        that.options.y = templateInfo.kyoboLogoPostionY;
        that.options.width = templateInfo.kyoboLogoImageWidth;
        that.options.height = templateInfo.kyoboLogoImageWidth / imgRatio;
        that.options.crop = UTIL.getCrop(
          kyoboImage,
          {
            width: templateInfo.kyoboLogoImageWidth,
            height: templateInfo.kyoboLogoImageWidth / imgRatio,
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
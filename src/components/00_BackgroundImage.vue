<template>
  <v-group>
    <v-group :config="groupOptions" ref="group">
      <v-rect :config="rectOptions" />
      <v-image :config="imageOptions" ref="backgroundImage" />
    </v-group>
    <DesignGuide01 v-if="designType == SELECT_DESIGN_TYPE_LIST[0].designType" />
    <DesignGuide02 v-if="designType == SELECT_DESIGN_TYPE_LIST[1].designType" />
    <DesignGuide03 v-if="designType == SELECT_DESIGN_TYPE_LIST[2].designType" />
    <DesignGuide04 v-if="designType == SELECT_DESIGN_TYPE_LIST[3].designType" />
  </v-group>
</template>

<script>
import * as UTIL from "@/utils/Util.js";
import Constant from "@/constant/Constant.js";
import * as DesignElement from "@/constant/DesignElement.js";
import DesignGuide01 from "./DesignGuide01.vue";
import DesignGuide02 from "./DesignGuide02.vue";
import DesignGuide03 from "./DesignGuide03.vue";
import DesignGuide04 from "./DesignGuide04.vue";
const windowWidth = DesignElement.COMMON_LAYOUT.WINDOW_WIDTH;
const windowHeight = DesignElement.COMMON_LAYOUT.WINDOW_HEIGHT;

export default {
  name: "BackgroundImage",
  props: {
    designType: { type: String, default: "" },
    userImageBackgroundPath: { type: String, default: "" },
    defaultBackgroundType: { type: String, default: "" },
  },
  components: {
    DesignGuide01,
    DesignGuide02,
    DesignGuide03,
    DesignGuide04,
  },
  watch: {
    defaultBackgroundType(value) {
      var storeTemplateData = this.$store.getters.findTemplateDate(
        this.designType
      );
      if (
        storeTemplateData.length > 0 &&
        storeTemplateData[0].backgroundImageList
      ) {
        if (this.userImageBackgroundPath.length == 0) {
          this.initImageDefault(
            storeTemplateData[0].backgroundImageList[value]
          );
        }
      } else {
        console.error("00_BackgroundImage.vue", "템플릿키에 대한 정보 없음");
      }
    },
  },
  created() {
    this.init();
  },
  computed: {
    layer() {
      return this.backgroundImage.parent.parent;
    },
    group() {
      return this.backgroundImage.parent;
    },
    backgroundImage() {
      return this.$refs.backgroundImage.getNode();
    },
    SELECT_DESIGN_TYPE_LIST() {
      return Constant.SELECT_DESIGN_TYPE_LIST;
    },
  },
  data() {
    return {
      groupOptions: {
        x: windowWidth / 2,
        y: windowHeight / 2,

        width: 0,
        height: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        listening: false,
      },
      imageOptions: {
        name: "backgroundImg",
        image: null,
        width: windowWidth,
        height: windowHeight,
        offsetX: windowWidth / 2,
        offsetY: windowHeight / 2,
        crop: null,
        listening: false,
      },
      rectOptions: {
        x: -(windowWidth * 100) / 2,
        y: -(windowHeight * 100) / 2,
        width: windowWidth * 100,
        height: windowHeight * 100,
        fill: "#000",
        listening: false,
      },
      lastCenter: null,
      lastDist: 0,
      startScale: 0,
      prevPositionX: 0,
      prevPositionY: 0,
    };
  },
  methods: {
    init() {
      var storeTemplateData = this.$store.getters.findTemplateDate(
        this.designType
      );

      if (
        storeTemplateData.length > 0 &&
        storeTemplateData[0].backgroundImageList
      ) {
        if (this.userImageBackgroundPath.length == 0) {
          this.initImageDefault(
            storeTemplateData[0].backgroundImageList[this.defaultBackgroundType]
          );
        } else {
          this.initImageCustom(this.userImageBackgroundPath);
        }
      } else {
        console.error("00_BackgroundImage.vue", "템플릿키에 대한 정보 없음");
      }
    },
    initImageDefault(src) {
      const that = this;
      const initImageDefault = new window.Image();

      this.imageOptions.offsetX = windowWidth / 2;
      this.imageOptions.offsetY = windowHeight / 2;

      initImageDefault.crossOrigin = "Anonymous";
      initImageDefault.src = src;
      initImageDefault.onload = function () {
        that.groupOptions.x = windowWidth / 2;
        that.groupOptions.y = windowHeight / 2;
        that.groupOptions.scaleX = 1;
        that.groupOptions.scaleY = 1;
        that.imageOptions.image = initImageDefault;
        that.imageOptions.width = windowWidth;
        that.imageOptions.height = windowHeight;
        that.imageOptions.crop = UTIL.getCrop(
          initImageDefault,
          {
            width: windowWidth,
            height: windowHeight,
          },
          "center-top"
        );
      };
    },
    initImageCustom(src) {
      console.log("custom");
      const that = this;
      const backgroundImg = new window.Image();
      backgroundImg.crossOrigin = "Anonymous";
      backgroundImg.src = src;

      backgroundImg.onload = function () {
        that.imageOptions.image = backgroundImg;
        var cropBackgroundInfo = that.$store.state.pathCropImageBackground;
        that.imageOptions.crop = {
          width: backgroundImg.width,
          height: backgroundImg.height,
          x: 0,
          y: 0,
        };
        console.log(JSON.stringify(cropBackgroundInfo));
        that.imageOptions.width = backgroundImg.width;
        that.imageOptions.height = backgroundImg.height;
        that.imageOptions.offsetX = backgroundImg.width / 2;
        that.imageOptions.offsetY = backgroundImg.height / 2;
        that.groupOptions.x = cropBackgroundInfo.x + windowWidth / 2;
        that.groupOptions.y = cropBackgroundInfo.y + windowHeight / 2;
        that.groupOptions.scaleX = cropBackgroundInfo.scaleX;
        that.groupOptions.scaleY = cropBackgroundInfo.scaleY;
        that.groupOptions.rotation = cropBackgroundInfo.rotation;
      };
    },
  },
};
</script>
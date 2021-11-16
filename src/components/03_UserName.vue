<template>
  <v-text :config="options"></v-text>
</template>
<script>
import * as DesignElement from "@/constant/DesignElement.js";
import Constant from "@/constant/Constant.js";
export default {
  name: "UserName",
  props: {
    designType: { type: String, default: "" },
    userName: { type: String, default: "" },
    isShowProfile: { type: Boolean, default: false },
  },
  data() {
    return {
      options: {
        listening: false,
      },
      userNameY: 0,
    };
  },
  created() {
    if (this.designType.length > 0) {
      this.init();
      this.initFont();
      this.updatePosition();
    }
  },
  watch: {
    userName(value) {
      this.options.text = value;
    },
    isShowProfile() {
      this.updatePosition();
    },
  },
  methods: {
    init() {
      var storeTemplateData = this.$store.getters.findTemplateDate(
        this.designType
      );

      if (storeTemplateData.length > 0 && storeTemplateData[0]) {
        var templateInfo = storeTemplateData[0];

        this.$set(this.options, "x", templateInfo.salesNameX);
        this.$set(this.options, "y", templateInfo.salesNameY);
        this.userNameY = templateInfo.salesNameY;
        this.$set(this.options, "text", this.userName);
      } else {
        console.error("03_UserName.vue", "템플릿키에 대한 정보 없음");
      }
    },
    initFont() {
      var defaultFontOptions =
        DesignElement.FONT_OPTION[`${this.designType}`].userName;

      if (this.designType == Constant.SELECT_DESIGN_TYPE_LIST[0].designType) {
        this.$set(this.options, "strokeWidth", 10);
        this.$set(this.options, "shadowColor", "rgba(0, 0, 0, 1)");
        this.$set(this.options, "shadowBlur", 7);
        this.$set(this.options, "shadowOffset", { x: 1, y: 2 });
        this.$set(this.options, "shadowOpacity", 0.5);
      }

      this.options.fontFamily = DesignElement.COMMON_LAYOUT.fontFamily;
      this.options.fontSize = defaultFontOptions.fontSize;
      this.options.fill = defaultFontOptions.fontColor;
      this.options.fontStyle = defaultFontOptions.fontWeight;
      this.options.align = defaultFontOptions.textAlign;
      this.options.verticalAlign = defaultFontOptions.textVerticalAlign;
      this.options.letterSpacing = defaultFontOptions.textLetterSpascing;
    },
    resetPosition() {
      var storeTemplateData = this.$store.getters.findTemplateDate(
        this.designType
      );

      if (storeTemplateData.length > 0 && storeTemplateData[0]) {
        var templateInfo = storeTemplateData[0];
        this.options.x = templateInfo.salesNameX;
        this.options.y = templateInfo.salesNameY;
      } else {
        console.error("03_UserName.vue", "템플릿키에 대한 정보 없음");
      }
    },
    updatePosition() {
      if (
        this.designType == Constant.SELECT_DESIGN_TYPE_LIST[0].designType ||
        this.designType == Constant.SELECT_DESIGN_TYPE_LIST[1].designType
      ) {
        if (!this.isShowProfile) {
          this.options.x =
            DesignElement.COMMON_LAYOUT[
              `${this.designType}`
            ].containerPadding.left;
          console.log("바뀐 x 좌표 ", this.options.x);
          this.options.y = this.userNameY;
        } else {
          this.resetPosition();
        }
      }

      if (this.designType == Constant.SELECT_DESIGN_TYPE_LIST[3].designType) {
        if (!this.isShowProfile) {
          this.options.y = 80;
        } else {
          this.options.y = this.userNameY;
        }
      }
    },
  },
};
</script>



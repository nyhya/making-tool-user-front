<template>
  <v-group :config="containerOptions" ref="container">
    <v-rect :config="rectOptions" ref="rect" />
    <v-text :config="txtFieldOptions" ref="txtField" />
  </v-group>
</template>
<script>
import * as DesignElement from "@/constant/DesignElement.js";
import Constant from "@/constant/Constant.js";
export default {
  name: "SalesRegion",
  props: {
    designType: {
      type: String,
      default: "",
    },
    userSalesRegion: { type: String, default: "" },
    isShowProfile: { type: Boolean, default: true },
  },

  data() {
    return {
      txtFieldOptions: {},
      rectOptions: { width: "", height: "", fill: "", cornerRadius: "" },
      containerOptions: {},
    };
  },
  computed: {
    rect() {
      return this.$refs.rect.getNode();
    },
    txtField() {
      return this.$refs.txtField.getNode();
    },
    container() {
      return this.$refs.container.getNode();
    },
  },
  watch: {
    isShowProfile() {
      this.updatePosition();
    },
  },
  created() {
    if (this.designType.length > 0) {
      this.init();
      this.initFontStyle();
      this.updatePosition();
    }
  },
  mounted() {
    const that = this;
    setTimeout(function () {
      that.updateRect();
    }, 0);
  },
  methods: {
    init() {
      var storeTemplateData = this.$store.getters.findTemplateDate(
        this.designType
      );

      if (storeTemplateData.length > 0 && storeTemplateData[0]) {
        var templateInfo = storeTemplateData[0];
        // 그룹 디자인 > 네모 세팅
        this.rectOptions.fill = templateInfo.salesRegionRectBgColor;
        this.rectOptions.cornerRadius = 0;
        // this.rectOptions.width = 100;
        // this.rectOptions.height = 100;

        this.txtFieldOptions.text = this.userSalesRegion;
        this.txtFieldOptions.padding = 5;

        //그룹 세팅
        this.$set(
          this.containerOptions,
          "x",
          templateInfo.salesRegionContainerX
        );
        this.$set(
          this.containerOptions,
          "y",
          templateInfo.salesRegionContainerY
        );
      } else {
        console.error("04_SalesRegion.vue", "템플릿키에 대한 정보 없음");
      }
    },
    initFontStyle() {
      var defaultFontOptions =
        DesignElement.FONT_OPTION[`${this.designType}`].salesRegion;

      this.txtFieldOptions.fontFamily = DesignElement.COMMON_LAYOUT.fontFamily;
      this.txtFieldOptions.fontSize = defaultFontOptions.fontSize;
      this.txtFieldOptions.fill = defaultFontOptions.fontColor;
      this.txtFieldOptions.fontStyle = defaultFontOptions.fontWeight;
      this.txtFieldOptions.align = defaultFontOptions.textAlign;
      this.txtFieldOptions.verticalAlign = defaultFontOptions.textVerticalAlign;
      this.txtFieldOptions.padding = 8;
      this.txtFieldOptions.height = defaultFontOptions.rectHeight;
    },
    resetPosition() {
      var storeTemplateData = this.$store.getters.findTemplateDate(
        this.designType
      );

      if (storeTemplateData.length > 0 && storeTemplateData[0]) {
        var templateInfo = storeTemplateData[0];
        //그룹 세팅
        this.containerOptions.x = templateInfo.salesRegionContainerX;
        this.containerOptions.y = templateInfo.salesRegionContainerY;
      } else {
        console.error("04_SalesRegion.vue", "템플릿키에 대한 정보 없음");
      }
    },
    updateRect() {
      const that = this;
      this.rectOptions.cornerRadius = that.txtField.getHeight() / 2;
      this.txtField.to({
        width: this.txtField.width(),
        duration: 0,
        onFinish: function () {},
      });

      this.rectOptions.width = this.txtField.getWidth();
      this.rectOptions.height = this.txtField.getHeight();
    },
    updatePosition() {
      if (this.designType == Constant.SELECT_DESIGN_TYPE_LIST[1].designType) {
        if (!this.isShowProfile) {
          this.containerOptions.x =
            DesignElement.COMMON_LAYOUT[this.designType].containerPadding.left;
        } else {
          this.resetPosition();
        }
      }
      if (this.designType == Constant.SELECT_DESIGN_TYPE_LIST[0].designType) {
        if (!this.isShowProfile) {
          this.containerOptions.x =
            DesignElement.COMMON_LAYOUT[this.designType].containerPadding.left;
        } else {
          this.resetPosition();
        }
      }
      if (this.designType == Constant.SELECT_DESIGN_TYPE_LIST[3].designType) {
        if (!this.isShowProfile) {
          this.containerOptions.y = 105;
        } else {
          this.resetPosition();
        }
      }
    },
  },
};
</script>

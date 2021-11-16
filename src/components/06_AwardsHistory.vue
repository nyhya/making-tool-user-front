<template>
  <v-group :config="contentOptions" ref="container">
    <v-rect :config="rectOptions" ref="rect" />
    <v-text
      v-if="isShowAwardHistory"
      :config="txtFieldOptions"
      ref="txtField"
    />
    <Bullet v-if="this.designType == SELECT_DESIGN_TYPE_LIST[1].designType" />
  </v-group>
</template>
<script>
import * as DesignElement from "@/constant/DesignElement.js";
import Bullet from "@/components/09_Bullet.vue";
import Constant from "@/constant/Constant.js";

export default {
  name: "AwardsHistory",
  props: {
    designType: { type: String, default: "" },
    mode: { type: String, default: "" },
    userAwardsHistory: { type: String, default: "" },
    isShowTrophy: { type: Boolean, default: false },
    isEditModePlay: { type: Boolean, default: true },
    awardHistoryPositionY: { type: Number, default: 0 },
  },
  components: {
    Bullet,
  },
  data() {
    return {
      rectOptions: {
        width: 0,
        height: 0,
        fill: "",
        cornerRadius: 0,
      },
      txtFieldOptions: {
        text: "",
      },
      contentOptions: {
        x: 0,
        y: 0,
      },
      editTxtGuideOption: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      isShowAwardHistory: true,
    };
  },
  watch: {
    isShowTrophy(value) {
      if (this.designType == Constant.SELECT_DESIGN_TYPE_LIST[1].designType) {
        if (value) {
          this.txtFieldOptions.x =
            DesignElement.SALES_AWARD[`${this.designType}`].txtX;
          this.editTxtGuideOption.x =
            DesignElement.SALES_AWARD[`${this.designType}`].txtX;
        } else {
          this.txtFieldOptions.x = 10;
          this.editTxtGuideOption.x = 10;
        }
      }
    },
    awardHistoryPositionY(value) {
      if (this.designType == "DESIGN_TYPE_B") {
        var introduceAndIntroduceGap = 10;
        var storeTemplateData = this.$store.getters.findTemplateDate(
          this.designType
        );
        if (storeTemplateData.length > 0 && storeTemplateData[0]) {
          var templateInfo = storeTemplateData[0];
          // 컨테이너
          this.contentOptions.y =
            templateInfo.salesAwardHistoryContainerY +
            value +
            introduceAndIntroduceGap;
        } else {
          console.error("06_AwardsHistory.vue", "템플릿키에 대한 정보 없음");
        }
      } else if (
        this.designType == "DESIGN_TYPE_C" ||
        this.designType == "DESIGN_TYPE_D"
      ) {
        // this.contentOptions.y = templateInfo.salesAwardHistoryContainerY;
      }
    },
    userAwardsHistory(value) {
      var text = value.slice(0, -1);
      this.txtFieldOptions.text = text;

      // const that = this;
      // this.$nextTick(function () {
      //   that.updateRect();
      // });
    },
  },
  computed: {
    txtField() {
      return this.$refs.txtField.getNode();
    },
    rect() {
      return this.$refs.rect.getNode();
    },
    editTxtGuideOptionContent() {
      return this.editTxtGuideOption;
    },
    isShowEditTxtGuide() {
      return this.mode == Constant.EDIT_PROFILE_VIEW_MODE.EDIT_MODE;
    },
    SELECT_DESIGN_TYPE_LIST() {
      return Constant.SELECT_DESIGN_TYPE_LIST;
    },
  },
  created() {
    if (this.designType.length > 0) {
      this.init();
      this.initFontStyle();
    }
  },
  mounted() {
    this.updateRect();
  },
  methods: {
    init() {
      var storeTemplateData = this.$store.getters.findTemplateDate(
        this.designType
      );
      if (storeTemplateData.length > 0 && storeTemplateData[0]) {
        var templateInfo = storeTemplateData[0];
        // 컨테이너
        this.contentOptions.x = templateInfo.salesAwardHistoryContainerX;
        this.contentOptions.y = templateInfo.salesAwardHistoryContainerY;
        // 네모
        this.rectOptions.width = templateInfo.salesAwardHistoryRectWidth;
        this.rectOptions.fill = templateInfo.salesAwardHistoryRectBgcolor;
        this.rectOptions.cornerRadius = templateInfo.salesAwardHistoryRadious;
        //텍스트
        this.$set(
          this.txtFieldOptions,
          "x",
          templateInfo.salesAwardHistoryTxtX
        );
        // this.txtFieldOptions.x = templateInfo.salesAwardHistoryTxtX;
        this.txtFieldOptions.y = templateInfo.salesAwardHistoryTxtY;
        this.txtFieldOptions.width = templateInfo.salesAwardHistoryTxtWidth;
        this.txtFieldOptions.align = templateInfo.salesAwardHistoryTxtAlign;
        this.txtFieldOptions.text = this.userAwardsHistory.slice(0, -1);
        this.txtFieldOptions.padding = templateInfo.salesAwardHistoryPadding;
      } else {
        console.error("06_AwardsHistory.vue", "템플릿키에 대한 정보 없음");
      }
    },
    initFontStyle() {
      var defaultFontOptions =
        DesignElement.FONT_OPTION[`${this.designType}`].awardsHistory;

      this.txtFieldOptions.fontFamily = DesignElement.COMMON_LAYOUT.fontFamily;
      this.txtFieldOptions.fontSize = defaultFontOptions.fontSize;
      this.txtFieldOptions.fill = defaultFontOptions.fontColor;
      this.txtFieldOptions.fontStyle = defaultFontOptions.fontWeight;
      this.txtFieldOptions.align = defaultFontOptions.textAlign;
      this.txtFieldOptions.verticalAlign = defaultFontOptions.textVerticalAlign;
      this.txtFieldOptions.letterSpacing =
        defaultFontOptions.textLetterSpascing;
      this.txtFieldOptions.lineHeight = defaultFontOptions.textLineHeight;
    },
    updateRect() {
      var that = this;
      this.rect.to({
        height:
          this.txtField.textHeight * 4 * that.txtFieldOptions.lineHeight +
          that.txtFieldOptions.padding * 2, //텍스트 4줄
        duration: 0,
        onFinish: function () {},
      });
    },
    setUserAwardHistory(text) {
      this.isShowAwardHistory = true;
      this.txtFieldOptions.text = text;
      this.$emit("setUserAwardHistory", text);
    },
    toggleShowAwardHistory(value) {
      this.isShowAwardHistory = value;
    },
  },
};
</script>
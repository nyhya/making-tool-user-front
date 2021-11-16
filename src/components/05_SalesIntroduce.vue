<template>
  <v-group :config="containerOptions" ref="container">
    <v-rect :config="rectOptions" ref="rect"> </v-rect>
    <Bullet v-if="this.designType == SELECT_DESIGN_TYPE_LIST[1].designType" />
    <v-text :config="txtFieldTitleOptions" ref="txtFieldTitle"></v-text>
    <v-text :config="txtFieldContentOptions" ref="txtFieldContent"> </v-text>
    <EditTxtGuideTitle
      :isShowEditTxtGuide="isShowEditTxtGuide"
      :designType="designType"
      :editTxtGuideOption="editTxtGuideOptionTitle"
      :defaultOption="txtFieldTitleOptions"
      :type="'title'"
      @setUserIntroduceText="setUserIntroduceTitle"
      @toggleShow="toggleShowTitle"
      ref="editTxtGuideTitle"
    />
    <EditTxtGuideContent
      :isShowEditTxtGuide="isShowEditTxtGuide"
      :designType="designType"
      :editTxtGuideOption="editTxtGuideOptionContent"
      :type="'contents'"
      :defaultOption="txtFieldContentOptions"
      @setUserIntroduceText="setUserIntroduceContent"
      @toggleShow="toggleShowContent"
      ref="editTxtGuideContent"
    />
  </v-group>
</template>
<script>
import Bullet from "@/components/09_Bullet.vue";
import EditTxtGuideTitle from "@/components/EditTxtGuide.vue";
import EditTxtGuideContent from "@/components/EditTxtGuide.vue";
import * as DesignElement from "@/constant/DesignElement.js";
import Constant from "@/constant/Constant.js";

export default {
  name: "SalesIntroduce",
  components: {
    Bullet,
    EditTxtGuideTitle,
    EditTxtGuideContent,
  },
  props: {
    designType: { type: String, default: "" },
    mode: { type: String, default: "" },
    userIntroduceTitle: { type: String, default: "" },
    userIntroduceContent: { type: String, default: "" },
    isShowProfile: { type: Boolean, default: false },
    isEditModePlay: { type: Boolean, default: true },
  },
  data() {
    return {
      containerHeight: 0,
      defaultX: 0,
      txtFieldTitleOptions: {
        x: 0,
        y: 0,
        width: 0,
        text: "",
        padding: 0,
        wrap: "word",
        fontFamily: "",
        fontSize: 0,
        fill: "",
        fontStyle: "",
        align: "",
        verticalAlign: 0,
        letterSpacing: 0,
        lineHeight: 0,
      },
      txtFieldContentOptions: {
        x: 0,
        y: 0,
        width: 0,
        text: "",
        padding: 0,
        wrap: "word",
        fontFamily: "",
        fontSize: 0,
        fill: "",
        fontStyle: "",
        align: "",
        verticalAlign: 0,
        letterSpacing: 0,
        lineHeight: 0,
      },
      rectOptions: { listening: false },
      containerOptions: {},
      isShowTitle: true,
      isShowContent: true,
      editOption: {
        x: 0,
        y: 0,
      },
      editTxtGuideOptionTitle: {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      },
      editTxtGuideOptionContent: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
    };
  },

  computed: {
    stage() {
      return this.container.parent.parent;
    },
    container() {
      return this.$refs.container.getNode();
    },
    rect() {
      return this.$refs.rect.getNode();
    },
    txtFieldTitle() {
      return this.$refs.txtFieldTitle.getNode();
    },
    txtFieldContent() {
      return this.$refs.txtFieldContent.getNode();
    },
    editTitleTxt() {
      return this.txtFieldTitle.getText();
    },
    isShowEditTxtGuide() {
      return this.mode == Constant.EDIT_PROFILE_VIEW_MODE.EDIT_MODE;
    },
    SELECT_DESIGN_TYPE_LIST() {
      return Constant.SELECT_DESIGN_TYPE_LIST;
    },
    editTxtGuideTitle() {
      return this.$refs.editTxtGuideTitle;
    },
    editTxtGuideContent() {
      return this.$refs.editTxtGuideContent;
    },
  },
  watch: {
    isShowTitle(isShow) {
      this.$set(this.txtFieldTitleOptions, "x", isShow ? this.defaultX : 10000);
    },
    isShowContent(isShow) {
      this.$set(
        this.txtFieldContentOptions,
        "x",
        isShow ? this.defaultX : 10000
      );
    },
    isShowProfile(value) {
      if (this.designType == Constant.SELECT_DESIGN_TYPE_LIST[3].designType) {
        if (!value) {
          this.containerOptions.y = 135;
        } else {
          this.containerOptions.y =
            DesignElement.SALES_INTRODUCE[`${this.designType}`].containerY;
        }
      }
    },

    userIntroduceTitle(text) {
      this.$set(this.txtFieldTitleOptions, "text", text);

      const that = this;
      this.$nextTick().then(function () {
        that.initEditTxtGuideOption();
      });
    },
    userIntroduceContent(text) {
      this.$set(this.txtFieldContentOptions, "text", text);

      const that = this;
      this.$nextTick().then(function () {
        that.initEditTxtGuideOption();
      });
    },
    containerHeight(value) {
      this.$emit("setAwardHistoryPostionY", value);
    },
    isShowEditTxtGuide(value) {
      console.log("isShowEditTxtGuide", value);
      const that = this;
      if (value) {
        that.$nextTick(function () {
          that.bindPopupEvent();
        });
      }
    },
  },
  created() {
    if (this.designType.length > 0) {
      this.init();
      this.initFontStyle();
    }
  },
  mounted() {
    this.initEditTxtGuideOption();
    if (this.isShowEditTxtGuide) {
      this.bindPopupEvent();
    }
  },
  methods: {
    init() {
      var storeTemplateData = this.$store.getters.findTemplateDate(
        this.designType
      );

      if (storeTemplateData.length > 0 && storeTemplateData[0]) {
        var templateInfo = storeTemplateData[0];
        // 그룹 디자인 > 네모 세팅
        this.rectOptions.width = templateInfo.salesIntroduceRectWidth;
        this.rectOptions.height = templateInfo.salesIntroduceRectHeight;
        this.rectOptions.fill = templateInfo.salesIntroduceRectBgcolor;
        this.rectOptions.cornerRadius = templateInfo.salesIntroduceRectRadious;
        // 그룹 디자인 > 1번째 폰트 세팅
        this.defaultX = templateInfo.salesIntroduceTitleX;
        this.txtFieldTitleOptions.x = templateInfo.salesIntroduceTitleX;
        this.txtFieldTitleOptions.y = templateInfo.salesIntroduceTitleY;
        this.txtFieldTitleOptions.width = templateInfo.salesIntroduceTitleWidth;
        this.txtFieldTitleOptions.text = this.userIntroduceTitle;
        this.txtFieldTitleOptions.padding = 0;
        this.txtFieldTitleOptions.wrap = "wrap";
        // 그룹 디자인 > 2번째 폰트 세팅
        this.txtFieldContentOptions.width =
          templateInfo.salesIntroduceContentWidth;
        this.txtFieldContentOptions.text = this.userIntroduceContent;
        this.txtFieldContentOptions.padding =
          templateInfo.salesIntroduceContentPadding;
        this.txtFieldContentOptions.wrap = "wrap";
        //그룹 세팅
        this.$set(
          this.containerOptions,
          "y",
          templateInfo.salesIntroduceContainerY
        );
        this.containerOptions.x = templateInfo.salesIntroduceContainerX;
        this.containerOptions.y = templateInfo.salesIntroduceContainerY;
      } else {
        console.error("05_SalesIntroduce.vue", "템플릿키에 대한 정보 없음");
      }
    },
    initFontStyle() {
      var defaultFontOptions = DesignElement.FONT_OPTION[`${this.designType}`];
      var fontOptionsTitle = defaultFontOptions.salesIntroduceTitle;
      var fontOptionsContent = defaultFontOptions.salesIntroduceContent;

      this.txtFieldTitleOptions.fontFamily =
        DesignElement.COMMON_LAYOUT.fontFamily;
      this.txtFieldTitleOptions.fontSize = fontOptionsTitle.fontSize;
      this.txtFieldTitleOptions.fill = fontOptionsTitle.fontColor;
      this.txtFieldTitleOptions.fontStyle = fontOptionsTitle.fontWeight;
      this.txtFieldTitleOptions.align = fontOptionsTitle.textAlign;
      this.txtFieldTitleOptions.verticalAlign =
        fontOptionsTitle.textVerticalAlign;
      this.txtFieldTitleOptions.letterSpacing =
        fontOptionsTitle.textLetterSpascing;
      this.txtFieldTitleOptions.lineHeight = fontOptionsTitle.textLineHeight;

      this.txtFieldContentOptions.fontFamily =
        DesignElement.COMMON_LAYOUT.fontFamily;
      this.txtFieldContentOptions.fontSize = fontOptionsContent.fontSize;
      this.txtFieldContentOptions.fill = fontOptionsContent.fontColor;
      this.txtFieldContentOptions.fontStyle = fontOptionsContent.fontWeight;
      this.txtFieldContentOptions.align = fontOptionsContent.textAlign;
      this.txtFieldContentOptions.verticalAlign =
        fontOptionsContent.textVerticalAlign;
      this.txtFieldContentOptions.letterSpacing =
        fontOptionsContent.textLetterSpascing;
      this.txtFieldContentOptions.lineHeight =
        fontOptionsContent.textLineHeight;
      this.txtFieldContentOptions.letterSpacing =
        defaultFontOptions.textLetterSpascing;

      this.txtFieldTitleOptions.wrap = "word";

      this.txtFieldContentOptions.wrap = "word";
    },
    initEditTxtGuideOption() {
      const that = this;
      var titleAndContentGap = 5;
      var tmpX = that.isShowContent ? that.defaultX : 10000;

      if (this.designType == "DESIGN_TYPE_A") {
        this.txtFieldContent.to({
          x: tmpX,
          y:
            that.txtFieldTitle.height() +
            that.txtFieldTitle.y() +
            titleAndContentGap,
          duration: 0,
          onFinish: function () {
            that.txtFieldTitle.textArr = that.txtFieldTitle.textArr.slice(0, 2);
            that.txtFieldContent.textArr = that.txtFieldContent.textArr.slice(
              0,
              2
            );

            that.rect.to({
              width: that.rectOptions.width,
              height:
                DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_A.introduceBox
                  .height,
              duration: 0,
              onFinish: function () {
                // 에티드 가이드 타이틀 영역 세팅

                that.containerHeight =
                  that.txtFieldTitle.height() + // txtFieldTitle 높이
                  that.txtFieldContent.height() + // txtFieldContent 높이
                  that.txtFieldTitle.y() + // 상단 여백
                  that.txtFieldTitle.y() + // 하단 여백
                  titleAndContentGap;
                that.editTxtGuideOptionTitle.width =
                  DesignElement.SALES_INTRODUCE[that.designType].titleWidth; // 타이틀 넓이
                that.editTxtGuideOptionTitle.height = that.txtFieldTitle.height(); // 타이틀 높이
                that.editTxtGuideOptionTitle.x =
                  DesignElement.SALES_INTRODUCE[that.designType].titleX; // 가이드 아이콘 x좌표
                that.editTxtGuideOptionTitle.y = that.txtFieldTitleOptions.y; // 가이드 아이콘 y좌표
                //에디트 가이드 컨텐츠 영역 세팅
                that.txtFieldContentOptions.x = tmpX;

                that.txtFieldContentOptions.y =
                  that.txtFieldTitle.height() +
                  that.txtFieldTitleOptions.y +
                  titleAndContentGap;

                that.editTxtGuideOptionContent.width =
                  DesignElement.SALES_INTRODUCE[that.designType].contentWidth;
                that.editTxtGuideOptionContent.height = that.txtFieldContent.height();
                that.editTxtGuideOptionContent.x =
                  DesignElement.SALES_INTRODUCE[that.designType].titleX; //contentsX값이 없어서 타이틀 값으로
                that.editTxtGuideOptionContent.y =
                  that.txtFieldTitle.height() +
                  titleAndContentGap +
                  that.txtFieldTitleOptions.y;
                that.stage.draw();
              },
            });
          },
        });
      } else {
        this.txtFieldContent.to({
          x: tmpX,
          y:
            that.txtFieldTitle.height() +
            that.txtFieldTitle.y() +
            titleAndContentGap,
          duration: 0,
          onFinish: function () {
            that.rect.to({
              height:
                that.txtFieldTitle.height() + // txtFieldTitle 높이
                that.txtFieldContent.height() + // txtFieldContent 높이
                that.txtFieldTitle.y() + // 상단 여백
                that.txtFieldTitle.y() + // 하단 여백
                titleAndContentGap, // title과 content의 사이 간격
              duration: 0,
              onFinish: function () {
                if (that.designType == "DESIGN_TYPE_D") {
                  that.txtFieldTitle.textArr = that.txtFieldTitle.textArr.slice(
                    0,
                    3
                  );
                  that.txtFieldContent.textArr = that.txtFieldContent.textArr.slice(
                    0,
                    6
                  );
                } else {
                  that.txtFieldTitle.textArr = that.txtFieldTitle.textArr.slice(
                    0,
                    2
                  );
                  that.txtFieldContent.textArr = that.txtFieldContent.textArr.slice(
                    0,
                    2
                  );
                }
                // 에티드 가이드 타이틀 영역 세팅
                that.containerHeight =
                  that.txtFieldTitle.height() + // txtFieldTitle 높이
                  that.txtFieldContent.height() + // txtFieldContent 높이
                  that.txtFieldTitle.y() + // 상단 여백
                  that.txtFieldTitle.y() + // 하단 여백
                  titleAndContentGap;
                that.editTxtGuideOptionTitle.width =
                  DesignElement.SALES_INTRODUCE[that.designType].titleWidth; // 타이틀 넓이
                that.editTxtGuideOptionTitle.height = that.txtFieldTitle.height(); // 타이틀 높이
                that.editTxtGuideOptionTitle.x =
                  DesignElement.SALES_INTRODUCE[that.designType].titleX; // 가이드 아이콘 x좌표
                that.editTxtGuideOptionTitle.y = that.txtFieldTitleOptions.y; // 가이드 아이콘 y좌표
                //에디트 가이드 컨텐츠 영역 세팅
                that.txtFieldContentOptions.x = tmpX;

                that.txtFieldContentOptions.y =
                  that.txtFieldTitle.height() +
                  that.txtFieldTitleOptions.y +
                  titleAndContentGap;

                that.editTxtGuideOptionContent.width =
                  DesignElement.SALES_INTRODUCE[that.designType].contentWidth;
                that.editTxtGuideOptionContent.height = that.txtFieldContent.height();
                that.editTxtGuideOptionContent.x =
                  DesignElement.SALES_INTRODUCE[that.designType].titleX; //contentsX값이 없어서 타이틀 값으로
                that.editTxtGuideOptionContent.y =
                  that.txtFieldTitle.height() +
                  titleAndContentGap +
                  that.txtFieldTitleOptions.y;
                that.stage.draw();
              },
            });
          },
        });
      }
    },

    setUserIntroduceTitle(text) {
      this.$emit("setUserIntroduceTitle", text);
    },
    setUserIntroduceContent(text) {
      this.$emit("setUserIntroduceContent", text);
    },
    toggleShowTitle(value) {
      this.isShowTitle = value;
    },
    toggleShowContent(value) {
      this.isShowContent = value;
    },

    bindPopupEvent() {
      const that = this;
      if (this.editTxtGuideTitle.rect.eventListeners.click == undefined) {
        this.editTxtGuideTitle.rect.on("click touchstart", function () {
          that.$emit("textInputPopupTitleOpen");
        });
        this.editTxtGuideContent.rect.on("click touchstart", function () {
          that.$emit("textInputPopupContentOpen");
        });
      }
    },
  },
};
</script>
<template>
  <div id="app" :style="`height:${height}px`">
    <transition name="fade">
      <div class="loading" v-if="$store.state.showLoading">Loading..</div>
    </transition>
    <router-view />
    <transition name="fade">
      <Confirm v-if="$store.state.showConfirm" class="extent-view" />
    </transition>
  </div>
</template>
<script>
import Confirm from "@/components/Confirm";
import * as DesignElement from "@/constant/DesignElement.js";
import Constant from "@/constant/Constant.js";
import DeviceUtils from '@/utils/device-utils'

const windowHeight = window.innerHeight;
export default {
  name: "app",
  components: {
    Confirm,
  },
  created () {
    window.getApp = this;
    this.$store.commit('setDeviceOS', DeviceUtils.getOS())

    /*******************
     * 템플릿 1 세팅 ****
     ******************/
    this.$store.commit(
      "addDefaultTemplateOptions",
      this.createDefaultTemplateOptions(
        /*************************
         ****백그라운드 세팅*******
         ************************/
        this.getBackgroundImageOptions(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.backgroundOrigin
        ),
        /*************************
        /** 상단 고객보장대상 심볼 세팅 
         ************************/
        this.getTopLogoOptions(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.symbol.path,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.symbol.x,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.symbol.y,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.symbol.width
        ),
        /*************************
         ****트로피 이미지 세팅****
         ************************/
        this.getTrophyOption(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.trophyOrigin.path,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.trophyOrigin.x,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.trophyOrigin.y,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.trophyOrigin.width,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.trophyOrigin.height
        ),
        /*************************
         ****프로필 이미지 세팅*******
         ************************/
        this.getSalesProfileOptions(
          DesignElement.PROFILE_OPTION.DESIGN_TYPE_A.x,
          DesignElement.PROFILE_OPTION.DESIGN_TYPE_A.y,
          DesignElement.PROFILE_OPTION.DESIGN_TYPE_A.size,
          DesignElement.PROFILE_OPTION.DESIGN_TYPE_A.size
        ),
        /*************************
         ****세일즈 이름 세팅*******
         ************************/
        this.getUserNameOptions(
          DesignElement.USER_NAME.DESIGN_TYPE_A.x,
          DesignElement.USER_NAME.DESIGN_TYPE_A.y
        ),
        /*************************
         ****세일즈 활동지역 세팅*******
         ************************/
        this.getSalesRegionGroupOption(
          DesignElement.ACTIVITY_RESION.DESIGN_TYPE_A.rectColor,
          DesignElement.ACTIVITY_RESION.DESIGN_TYPE_A.x,
          DesignElement.ACTIVITY_RESION.DESIGN_TYPE_A.y
        ),
        /*************************
         ****세일즈 소개 세팅*******
         ************************/
        this.getSalesIntroduce(
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_A.introduceBox.width,
          0,
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_A.introduceBox.rectColor,
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_A.introduceBox.rectRadius,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_A.titleX,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_A.titleY,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_A.titleWidth,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_A.contentWidth,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_A.contentPadding,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_A.containerX,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_A.containerY
        ),
        /*************************
         ****세일즈 히스토리 세팅***
         ************************/
        this.getSalesAwardHistory(
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_A.awardHistoryBox.width,
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_A.awardHistoryBox
            .rectColor,
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_A.awardHistoryBox
            .rectRadius,
          DesignElement.SALES_AWARD.DESIGN_TYPE_A.txtX,
          DesignElement.SALES_AWARD.DESIGN_TYPE_A.txtY,
          DesignElement.SALES_AWARD.DESIGN_TYPE_A.padding,
          DesignElement.SALES_AWARD.DESIGN_TYPE_A.txtWidth,
          DesignElement.SALES_AWARD.DESIGN_TYPE_A.txtAlign,
          DesignElement.SALES_AWARD.DESIGN_TYPE_A.containerX,
          DesignElement.SALES_AWARD.DESIGN_TYPE_A.containerY
        ),
        /***************************************
         ****썸네일 백그라운드 기본 이미지 2개 ***
         ***************************************/
        this.getThumbDefaultBackground(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.backgroundThumb[
          Constant.BACKGROUND_TYPE.TYPE_01
          ],
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.backgroundThumb[
          Constant.BACKGROUND_TYPE.TYPE_02
          ]
        ),
        this.getThumbDefaultTrophy(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.trophyThumb
        ),
        this.getKyoboLogoImage(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.kyoboLogo.path,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.kyoboLogo.x,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.kyoboLogo.y,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.kyoboLogo.width,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_A.kyoboLogo.height
        )
      )
    );

    /*******************
     * 템플릿 2 세팅 ****
     ******************/
    this.$store.commit(
      "addDefaultTemplateOptions",
      this.createDefaultTemplateOptions(
        /*************************
         ****백그라운드 세팅*******
         ************************/
        this.getBackgroundImageOptions(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.backgroundOrigin
        ),
        /*************************
        /** 상단 고객보장대상 심볼 세팅 
         ************************/
        this.getTopLogoOptions(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.symbol.path,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.symbol.x,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.symbol.y,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.symbol.width
        ),
        /*************************
         ****트로피 이미지 세팅****
         ************************/
        this.getTrophyOption(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.trophyOrigin.path,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.trophyOrigin.x,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.trophyOrigin.y,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.trophyOrigin.width,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.trophyOrigin.height
        ),
        /*************************
         ****프로필 이미지 세팅*******
         ************************/
        this.getSalesProfileOptions(
          DesignElement.PROFILE_OPTION.DESIGN_TYPE_B.x,
          DesignElement.PROFILE_OPTION.DESIGN_TYPE_B.y,
          DesignElement.PROFILE_OPTION.DESIGN_TYPE_B.size,
          DesignElement.PROFILE_OPTION.DESIGN_TYPE_B.size
        ),
        /*************************
         ****세일즈 이름 세팅*******
         ************************/
        this.getUserNameOptions(
          DesignElement.USER_NAME.DESIGN_TYPE_B.x,
          DesignElement.USER_NAME.DESIGN_TYPE_B.y
        ),
        /*************************
         ****세일즈 활동지역 세팅*******
         ************************/
        this.getSalesRegionGroupOption(
          DesignElement.ACTIVITY_RESION.DESIGN_TYPE_B.rectColor,
          DesignElement.ACTIVITY_RESION.DESIGN_TYPE_B.x,
          DesignElement.ACTIVITY_RESION.DESIGN_TYPE_B.y
        ),
        /*************************
         ****세일즈 소개 세팅*******
         ************************/
        this.getSalesIntroduce(
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_B.introduceBox.width,
          0,
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_B.introduceBox.rectColor,
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_B.introduceBox.rectRadius,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_B.titleX,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_B.titleY,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_B.titleWidth,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_B.contentWidth,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_B.contentPadding,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_B.containerX,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_B.containerY
        ),
        /*************************
         ****세일즈 히스토리 세팅***
         ************************/
        this.getSalesAwardHistory(
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_B.awardHistoryBox.width,
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_B.awardHistoryBox
            .rectColor,
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_B.awardHistoryBox
            .rectRadius,
          DesignElement.SALES_AWARD.DESIGN_TYPE_B.txtX,
          DesignElement.SALES_AWARD.DESIGN_TYPE_B.txtY,
          DesignElement.SALES_AWARD.DESIGN_TYPE_B.padding,
          DesignElement.SALES_AWARD.DESIGN_TYPE_B.txtWidth,
          DesignElement.SALES_AWARD.DESIGN_TYPE_B.txtAlign,
          DesignElement.SALES_AWARD.DESIGN_TYPE_B.containerX,
          DesignElement.SALES_AWARD.DESIGN_TYPE_B.containerY
        ),
        /***************************************
         ****썸네일 백그라운드 기본 이미지 2개 ***
         ***************************************/
        this.getThumbDefaultBackground(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.backgroundThumb[
          Constant.BACKGROUND_TYPE.TYPE_01
          ],
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.backgroundThumb[
          Constant.BACKGROUND_TYPE.TYPE_02
          ]
        ),
        this.getThumbDefaultTrophy(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.trophyThumb
        ),
        this.getKyoboLogoImage(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.kyoboLogo.path,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.kyoboLogo.x,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.kyoboLogo.y,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.kyoboLogo.width,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_B.kyoboLogo.height
        )
      )
    );
    /*******************
     * 템플릿 3 세팅 ****
     ******************/
    this.$store.commit(
      "addDefaultTemplateOptions",
      this.createDefaultTemplateOptions(
        /*************************
         ****백그라운드 세팅*******
         ************************/
        this.getBackgroundImageOptions(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.backgroundOrigin
        ),
        /*************************
        /** 상단 고객보장대상 심볼 세팅 
         ************************/
        this.getTopLogoOptions(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.symbol.path,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.symbol.x,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.symbol.y,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.symbol.width
        ),
        /*************************
         ****트로피 이미지 세팅****
         ************************/
        this.getTrophyOption(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.trophyOrigin.path,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.trophyOrigin.x,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.trophyOrigin.y,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.trophyOrigin.width,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.trophyOrigin.height
        ),
        /*************************
         ****프로필 이미지 세팅*******
         ************************/
        this.getSalesProfileOptions(
          DesignElement.PROFILE_OPTION.DESIGN_TYPE_C.x,
          DesignElement.PROFILE_OPTION.DESIGN_TYPE_C.y,
          DesignElement.PROFILE_OPTION.DESIGN_TYPE_C.size,
          DesignElement.PROFILE_OPTION.DESIGN_TYPE_C.size
        ),
        /*************************
         ****세일즈 이름 세팅*******
         ************************/
        this.getUserNameOptions(
          DesignElement.USER_NAME.DESIGN_TYPE_C.x,
          DesignElement.USER_NAME.DESIGN_TYPE_C.y
        ),
        /*************************
         ****세일즈 활동지역 세팅*******
         ************************/
        this.getSalesRegionGroupOption(
          DesignElement.ACTIVITY_RESION.DESIGN_TYPE_C.rectColor,
          DesignElement.ACTIVITY_RESION.DESIGN_TYPE_C.x,
          DesignElement.ACTIVITY_RESION.DESIGN_TYPE_C.y
        ),
        /*************************
         ****세일즈 소개 세팅*******
         ************************/
        this.getSalesIntroduce(
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_C.introduceBox.width,
          0,
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_C.introduceBox.rectColor,
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_C.introduceBox.rectRadius,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_C.titleX,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_C.titleY,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_C.titleWidth,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_C.contentWidth,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_C.contentPadding,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_C.containerX,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_C.containerY
        ),
        /*************************
         ****세일즈 히스토리 세팅***
         ************************/
        this.getSalesAwardHistory(
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_C.awardHistoryBox.width,
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_C.awardHistoryBox
            .rectColor,
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_C.awardHistoryBox
            .rectRadius,
          DesignElement.SALES_AWARD.DESIGN_TYPE_C.txtX,
          DesignElement.SALES_AWARD.DESIGN_TYPE_C.txtY,
          DesignElement.SALES_AWARD.DESIGN_TYPE_C.padding,
          DesignElement.SALES_AWARD.DESIGN_TYPE_C.txtWidth,
          DesignElement.SALES_AWARD.DESIGN_TYPE_C.txtAlign,
          DesignElement.SALES_AWARD.DESIGN_TYPE_C.containerX,
          DesignElement.SALES_AWARD.DESIGN_TYPE_C.containerY
        ),
        /***************************************
         ****썸네일 백그라운드 기본 이미지 2개 ***
         ***************************************/
        this.getThumbDefaultBackground(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.backgroundThumb[
          Constant.BACKGROUND_TYPE.TYPE_01
          ],
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.backgroundThumb[
          Constant.BACKGROUND_TYPE.TYPE_02
          ]
        ),
        this.getThumbDefaultTrophy(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.trophyThumb
        ),
        this.getKyoboLogoImage(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.kyoboLogo.path,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.kyoboLogo.x,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.kyoboLogo.y,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.kyoboLogo.width,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_C.kyoboLogo.height
        )
      )
    );
    /*******************
     * 템플릿 4 세팅 ****
     ******************/
    this.$store.commit(
      "addDefaultTemplateOptions",
      this.createDefaultTemplateOptions(
        /*************************
         ****백그라운드 세팅*******
         ************************/
        this.getBackgroundImageOptions(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.backgroundOrigin
        ),
        /*************************
        /** 상단 고객보장대상 심볼 세팅 
         ************************/
        this.getTopLogoOptions(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.symbol.path,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.symbol.x,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.symbol.y,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.symbol.width
        ),
        /*************************
         ****트로피 이미지 세팅****
         ************************/
        this.getTrophyOption(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.trophyOrigin.path,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.trophyOrigin.x,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.trophyOrigin.y,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.trophyOrigin.width,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.trophyOrigin.height
        ),
        /*************************
         ****프로필 이미지 세팅*******
         ************************/
        this.getSalesProfileOptions(
          DesignElement.PROFILE_OPTION.DESIGN_TYPE_D.x,
          DesignElement.PROFILE_OPTION.DESIGN_TYPE_D.y,
          DesignElement.PROFILE_OPTION.DESIGN_TYPE_D.size,
          DesignElement.PROFILE_OPTION.DESIGN_TYPE_D.size
        ),
        /*************************
         ****세일즈 이름 세팅*******
         ************************/
        this.getUserNameOptions(
          DesignElement.USER_NAME.DESIGN_TYPE_D.x,
          DesignElement.USER_NAME.DESIGN_TYPE_D.y
        ),
        /*************************
         ****세일즈 활동지역 세팅*******
         ************************/
        this.getSalesRegionGroupOption(
          DesignElement.ACTIVITY_RESION.DESIGN_TYPE_D.rectColor,
          DesignElement.ACTIVITY_RESION.DESIGN_TYPE_D.x,
          DesignElement.ACTIVITY_RESION.DESIGN_TYPE_D.y
        ),
        /*************************
         ****세일즈 소개 세팅*******
         ************************/
        this.getSalesIntroduce(
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_D.introduceBox.width,
          0,
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_D.introduceBox.rectColor,
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_D.introduceBox.rectRadius,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_D.titleX,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_D.titleY,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_D.titleWidth,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_D.contentWidth,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_D.contentPadding,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_D.containerX,
          DesignElement.SALES_INTRODUCE.DESIGN_TYPE_D.containerY
        ),
        /*************************
         ****세일즈 히스토리 세팅***
         ************************/
        this.getSalesAwardHistory(
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_D.awardHistoryBox.width,
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_D.awardHistoryBox
            .rectColor,
          DesignElement.RECTANGLE_OPTION.DESIGN_TYPE_D.awardHistoryBox
            .rectRadius,
          DesignElement.SALES_AWARD.DESIGN_TYPE_D.txtX,
          DesignElement.SALES_AWARD.DESIGN_TYPE_D.txtY,
          DesignElement.SALES_AWARD.DESIGN_TYPE_D.padding,
          DesignElement.SALES_AWARD.DESIGN_TYPE_D.txtWidth,
          DesignElement.SALES_AWARD.DESIGN_TYPE_D.txtAlign,
          DesignElement.SALES_AWARD.DESIGN_TYPE_D.containerX,
          DesignElement.SALES_AWARD.DESIGN_TYPE_D.containerY
        ),
        /***************************************
         ****썸네일 백그라운드 기본 이미지 2개 ***
         ***************************************/
        this.getThumbDefaultBackground(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.backgroundThumb[
          Constant.BACKGROUND_TYPE.TYPE_01
          ],
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.backgroundThumb[
          Constant.BACKGROUND_TYPE.TYPE_02
          ]
        ),
        this.getThumbDefaultTrophy(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.trophyThumb
        ),
        this.getKyoboLogoImage(
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.kyoboLogo.path,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.kyoboLogo.x,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.kyoboLogo.y,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.kyoboLogo.width,
          DesignElement.IMAGE_LIST.DESIGN_TYPE_D.kyoboLogo.height
        )
      )
    );
  },
  data () {
    return {
      height: 0,
    };
  },
  mounted () {
    this.height = windowHeight;
  },
  methods: {
    createDefaultTemplateOptions (
      backgroundImageOption,
      topLogoOption,
      trophyOption,
      salesProfileImage,
      salesNameOption,
      salesResionOption,
      salesIntroduce,
      salesAwardHistory,
      thumbDefaultBackgroundImage,
      thumbDefalutTrophy,
      kyoboLogo
    ) {
      var key =
        Constant.SELECT_DESIGN_TYPE_LIST[
          this.$store.state.defaultTemplateOptions.length
        ].designType;
      var result = { key: key };
      result = Object.assign(result, backgroundImageOption);
      result = Object.assign(result, topLogoOption);
      result = Object.assign(result, trophyOption);
      result = Object.assign(result, salesProfileImage);
      result = Object.assign(result, salesNameOption);
      result = Object.assign(result, salesResionOption);
      result = Object.assign(result, salesIntroduce);
      result = Object.assign(result, salesAwardHistory);
      result = Object.assign(result, thumbDefaultBackgroundImage);
      result = Object.assign(result, thumbDefalutTrophy);
      result = Object.assign(result, kyoboLogo);
      return result;
    },

    getBackgroundImageOptions (backgroundImageList) {
      return {
        backgroundImageList: backgroundImageList,
      };
    },
    getTopLogoOptions (path, x, y, width) {
      return {
        topLogo: path,
        topLogoX: x,
        topLogoY: y,
        topLogoWidth: width,
      };
    },
    getTrophyOption (path, x, y, width, height) {
      return {
        trophyPath: path,
        trophyX: x,
        trophyY: y,
        trophyWidth: width,
        trophyHeight: height,
      };
    },
    getSalesProfileOptions (x, y, width, height) {
      return {
        salesProfileImageX: x,
        salesProfileImageY: y,
        salesProfileImageWidth: width,
        salesProfileImageHeight: height,
      };
    },
    getUserNameOptions (x, y) {
      return {
        salesNameX: x,
        salesNameY: y,
      };
    },
    getSalesRegionGroupOption (rectBgColor, containerX, containerY) {
      return {
        salesRegionRectBgColor: rectBgColor,
        salesRegionContainerX: containerX,
        salesRegionContainerY: containerY,
      };
    },
    getSalesIntroduce (
      rectWidth,
      rectHeight,
      rectBgcolor,
      rectRadious,
      titleX,
      titleY,
      titleWidth,
      contentWidth,
      contentPadding,
      containerX,
      containerY
    ) {
      return {
        salesIntroduceRectWidth: rectWidth,
        salesIntroduceRectHeight: rectHeight,
        salesIntroduceRectBgcolor: rectBgcolor,
        salesIntroduceRectRadious: rectRadious,
        salesIntroduceTitleX: titleX,
        salesIntroduceTitleY: titleY,
        salesIntroduceTitleWidth: titleWidth,
        salesIntroduceContentWidth: contentWidth,
        salesIntroduceContentPadding: contentPadding,
        salesIntroduceContainerX: containerX,
        salesIntroduceContainerY: containerY,
      };
    },
    getSalesAwardHistory (
      rectWidth,
      rectBgcolor,
      rectRadious,
      txtX,
      txtY,
      padding,
      txtWidth,
      txtAlign,
      containerX,
      containerY
    ) {
      return {
        salesAwardHistoryRectWidth: rectWidth,
        salesAwardHistoryRectBgcolor: rectBgcolor,
        salesAwardHistoryRadious: rectRadious,
        salesAwardHistoryTxtX: txtX,
        salesAwardHistoryTxtY: txtY,
        salesAwardHistoryPadding: padding,
        salesAwardHistoryTxtWidth: txtWidth,
        salesAwardHistoryTxtAlign: txtAlign,
        salesAwardHistoryContainerX: containerX,
        salesAwardHistoryContainerY: containerY,
      };
    },
    getThumbDefaultBackground (
      defaultBackgroundImagePath01,
      defaultBackgroundImagePath02
    ) {
      return {
        thumbDefaultBg01: defaultBackgroundImagePath01,
        thumbDefaultBg02: defaultBackgroundImagePath02,
      };
    },
    getThumbDefaultTrophy (thumbDefalutTrophyImg) {
      return {
        thumbDefalutTrophy: thumbDefalutTrophyImg,
      };
    },
    getKyoboLogoImage (
      kyoboLogoPath,
      kyoboLogoPostionX,
      kyoboLogoPostionY,
      kyoboLogoImageWidth,
      kyoboLogoImageHeight
    ) {
      return {
        kyoboLogoPath: kyoboLogoPath,
        kyoboLogoPostionX: kyoboLogoPostionX,
        kyoboLogoPostionY: kyoboLogoPostionY,
        kyoboLogoImageWidth: kyoboLogoImageWidth,
        kyoboLogoImageHeight: kyoboLogoImageHeight,
      };
    },
  },
};
</script>
<style>
#app {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.loading {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  color: #fff;
  font-size: 12px !important;
  background-image: url("./assets/loading.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

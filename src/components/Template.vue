<template>
  <div class="cavas-wrap" style="text-align: center">
    <div class="layout">
      <div class="layout-wrap">
        <v-stage
          :config="stageInfo"
          ref="stage"
          class="stageCon"
          id="canvasContainer"
        >
          <v-layer>
            <BackgroundImage
              :designType="designType"
              :userImageBackgroundPath="userImageBackgroundPath"
              :defaultBackgroundType="defaultBackgroundType"
              :cropImageBackgroundInfo="cropImageBackgroundInfo"
              ref="backgroundImage"
            />

            <TopLogo :designType="designType" />
            <ProfileImage
              :designType="designType"
              :userImageProfilePath="userImageProfilePath"
              :isShowProfile="isShowProfile"
              ref="profileImage"
            />
            <UserName
              :designType="designType"
              :userName="userName"
              :isShowProfile="isShowProfile"
            />
            <SalesRegion
              :designType="designType"
              :userSalesRegion="userSalesRegion"
              :isShowProfile="isShowProfile"
            />
            <SalesIntroduce
              :designType="designType"
              :mode="mode"
              :userIntroduceTitle="userIntroduceTitle"
              :userIntroduceContent="userIntroduceContent"
              :isShowProfile="isShowProfile"
              :isEditModePlay="isEditModePlay"
              @setUserIntroduceTitle="setUserIntroduceTitle"
              @setUserIntroduceContent="setUserIntroduceContent"
              @setAwardHistoryPostionY="setAwardHistoryPostionY"
              @textInputPopupTitleOpen="$emit('textInputPopupTitleOpen')"
              @textInputPopupContentOpen="$emit('textInputPopupContentOpen')"
            />
            <AwardsHistory
              :designType="designType"
              :mode="mode"
              :userAwardsHistory="userAwardsHistory"
              :isShowTrophy="isShowTrophy"
              :isEditModePlay="isEditModePlay"
              :awardHistoryPositionY="awardHistoryPositionY"
              @setUserAwardHistory="setUserAwardHistory"
            />
            <KyoboLogo :designType="designType" />
            <Trophy
              :designType="designType"
              :isShowTrophy="isShowTrophy"
              :awardHistoryPositionY="awardHistoryPositionY"
            />
          </v-layer>
        </v-stage>
      </div>
    </div>
  </div>
</template>
<script>
import BackgroundImage from "@/components/00_BackgroundImage.vue";
import TopLogo from "./01_TopLogo.vue";
import ProfileImage from "./02_ProfileImage.vue";
import UserName from "./03_UserName.vue";
import SalesRegion from "./04_SalesRegion.vue";
import SalesIntroduce from "./05_SalesIntroduce.vue";
import AwardsHistory from "./06_AwardsHistory.vue";
import Trophy from "./07_Trophy.vue";
import KyoboLogo from "./10_KyoboLogo.vue";

import * as DesignElement from "@/constant/DesignElement.js";

const windowWidth = DesignElement.COMMON_LAYOUT.WINDOW_WIDTH;
const windowHeight = DesignElement.COMMON_LAYOUT.WINDOW_HEIGHT;

export default {
  components: {
    BackgroundImage,
    TopLogo,
    ProfileImage,
    UserName,
    SalesRegion,
    SalesIntroduce,
    AwardsHistory,
    Trophy,
    KyoboLogo,
  },
  props: {
    designType: { type: String, default: "" },
    mode: { type: String, default: "" },
    userName: { type: String, default: "" },
    userSalesRegion: { type: String, default: "" },
    userIntroduceTitle: { type: String, default: "" },
    userIntroduceContent: { type: String, default: "" },
    userAwardsHistory: { type: String, default: "" },
    defaultBackgroundType: { type: String, default: "" },
    userImageBackgroundPath: { type: String, default: "" },
    userImageBackgroundFile: { type: File },
    userImageBackgroundX: { type: Number, default: 0 },
    userImageBackgroundY: { type: Number, default: 0 },
    userImageBackgroundScale: { type: Number, default: 1 },
    userImageProfilePath: { type: String, default: "" },
    userImageProfileFile: { type: File },
    userImageProfileX: { type: Number, default: 0 },
    userImageProfileY: { type: Number, default: 0 },
    userImageProfileScale: { type: Number, default: 1 },
    isShowProfile: { type: Boolean, default: true },
    isShowTrophy: { type: Boolean, default: true },
    isEditModePlay: { type: Boolean, default: true },
    awardHistoryPositionY: { type: Number, default: 0 },
  },
  computed: {
    stage() {
      return this.$refs.stage.getNode();
    },
    groupBackground() {
      return this.$refs.groupBackground.getNode();
    },
    group() {
      return this.$refs.group.getNode();
    },
    componentBackgroundImage() {
      return this.$refs.backgroundImage;
    },
    componentProfileImage() {
      return this.$refs.profileImage;
    },
    cropImageProfileInfo() {
      return this.$store.state.pathCropImageProfile;
    },
    cropImageBackgroundInfo() {
      return this.$store.state.pathCropImageBackground;
    },
    userImagePathProfile() {
      return this.$store.state.pathCropImageProfile;
    },
  },
  data() {
    return {
      stageInfo: {
        width: windowWidth,
        height: windowHeight,
      },
    };
  },

  created() {},
  methods: {
    getSaveImageData(pixelRatio) {
      var base64Data = this.stage.toDataURL({ pixelRatio: pixelRatio });
      return base64Data;
    },
    setUserIntroduceTitle(text) {
      this.$emit("setUserIntroduceTitle", text);
    },
    setUserIntroduceContent(text) {
      this.$emit("setUserIntroduceContent", text);
    },
    setUserAwardHistory(text) {
      this.$emit("setUserAwardHistory", text);
    },
    setAwardHistoryPostionY(value) {
      this.$emit("setAwardHistoryPostionY", value);
    },
  },

  mounted() {},
};
</script>

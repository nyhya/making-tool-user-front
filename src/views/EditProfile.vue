<template>
  <div class="template-wrap">
    <div
      v-if="isAwardListLoadToggle"
      class="loadAwardBtn"
      @click="getAwardListInfo"
    >
      최근이력<br />불러오기
    </div>
    <TextInputPopup
      v-if="showTextInputPopupTitle"
      :designType="designType"
      :mode="`TITLE`"
      :textWidthLength="textLimitInfo.title.textWidthLength"
      :textEnterLength="textLimitInfo.title.textEnterLength"
      :textTotalLength="textLimitInfo.title.textTotalLength"
      :realText="userIntroduceTitle"
      :placeholder="'예시)고객의 성공이</br>곧 나의 성공입니다.'"
      @close="textInputPopupTitleClose"
      @save="textInputPopupTitleSave"
    />
    <TextInputPopup
      v-if="showTextInputPopupContent"
      :designType="designType"
      :mode="`CONTENT`"
      :textWidthLength="textLimitInfo.content.textWidthLength"
      :textEnterLength="textLimitInfo.content.textEnterLength"
      :textTotalLength="textLimitInfo.content.textTotalLength"
      :realText="userIntroduceContent"
      :placeholder="'예시)고객의 성공이</br>곧 나의 성공입니다.'"
      @close="textInputPopupContentClose"
      @save="textInputPopupContentSave"
    />

    <div
      class="container"
      v-if="designType.length > 0 || (seq.length > 0 && designType.length > 0)"
    >
      <EditProfileTopBar
        :mode="mode"
        :title="title"
        @onClickEditProfileCancle="onClickEditProfileCancle"
        @onClickEditProfileSave="onClickEditProfileSave"
      />
      <Template
        v-if="isProfileLoadingComplete"
        :designType="designType"
        :mode="mode"
        :userName="userName"
        :userSalesRegion="userSalesRegion"
        :userIntroduceTitle="userIntroduceTitle"
        :userIntroduceContent="userIntroduceContent"
        :userAwardsHistory="userAwardsHistory"
        :defaultBackgroundType="defaultBackgroundType"
        :userImageBackgroundPath="userImageBackgroundPath"
        :userImageBackgroundFile="userImageBackgroundFile"
        :userImageBackgroundX="userImageBackgroundX"
        :userImageBackgroundY="userImageBackgroundY"
        :userImageBackgroundScale="userImageBackgroundScale"
        :userImageProfilePath="userImageProfilePath"
        :userImageProfileFile="userImageProfileFile"
        :userImageProfileX="userImageProfileX"
        :userImageProfileY="userImageProfileY"
        :userImageProfileScale="userImageProfileScale"
        :isShowProfile="isShowProfile"
        :isShowTrophy="isShowTrophy"
        :isEditModePlay="isEditModePlay"
        :awardHistoryPositionY="awardHistoryPositionY"
        @getAwardListInfo="getAwardListInfo"
        @setUserAwardHistory="setUserAwardHistory"
        @setUserIntroduceTitle="setUserIntroduceTitle"
        @setUserIntroduceContent="setUserIntroduceContent"
        @setAwardHistoryPostionY="setAwardHistoryPostionY"
        @textInputPopupTitleOpen="textInputPopupTitleOpen"
        @textInputPopupContentOpen="textInputPopupContentOpen"
        ref="Template"
      />
      <CropImageBackground
        :designType="designType"
        :userImageBackgroundPath="userImageBackgroundPath"
        @initBackgroundImage="initBackgroundImage"
        v-if="isShowCropBackground"
        ref="cropImageBackground"
      />
      <CropImageProfile
        :userImageProfilePath="userImageProfilePath"
        @initProfileImage="initProfileImage"
        v-if="isShowCropProfile"
        ref="cropImageProfile"
      />
      <EditProfileBottomBarEditMode
        :designType="designType"
        :isShowProfile="isShowProfile"
        v-if="isShowEditProfileBottomBarEditMode"
        @setdefaultBackgroundType="setdefaultBackgroundType"
        @setUserImageBackgroundFile="setUserImageBackgroundFile"
        @setUserImageProfileFile="setUserImageProfileFile"
        @setProfileDefault="setProfileDefault"
        @setIsShowProfile="setIsShowProfile"
        @setIsShowTrophy="setIsShowTrophy"
        @editTxtMode="editTxtMode"
        @changeViewMode="changeViewMode"
      />
      <EditProfileBottomBarViewMode
        v-if="isShowEditProfileBottomBarViewMode"
        @onClickImageDownload="onClickImageDownload"
        @changeViewMode="changeViewMode"
      />
    </div>
  </div>
</template>
<script>
import * as UTIL from "@/utils/Util.js";
import Constant from "@/constant/Constant.js";
import Template from "@/components/Template.vue";
import EditProfileTopBar from "@/components/EditProfileTopBar.vue";
import EditProfileBottomBarEditMode from "@/components/EditProfileBottomBarEditMode.vue";
import EditProfileBottomBarViewMode from "@/components/EditProfileBottomBarViewMode.vue";
import CropImageBackground from "@/components/CropImageBackground.vue";
import CropImageProfile from "@/components/CropImageProfile.vue";
import TextInputPopup from "@/components/textInputPopup.vue";

export default {
  props: {
    selectedDesignType: {
      type: String,
      default: "",
    },
    seq: {
      type: String,
      default: "",
    },
  },
  created() {
    this.$store.commit("initPathCropImageProfile");
    this.$store.commit("initPathCropImageBackground");
    if (this.selectedDesignType.length > 0) {
      this.designType = this.selectedDesignType;
      this.getProfileCreateInfo();
    } else {
      this.getResponseProfile();
    }
    if (this.$route.name == "EditProfilePreViewMode") {
      this.mode = Constant.EDIT_PROFILE_VIEW_MODE.PREVIEW_MODE;
    }

    if (this.mode == Constant.EDIT_PROFILE_VIEW_MODE.PREVIEW_MODE) {
      this.profileSeq = parseInt(this.seq);
    } else if (this.mode == Constant.EDIT_PROFILE_VIEW_MODE.EDIT_MODE) {
      this.profileSeq = parseInt(this.seq);
    }
  },
  components: {
    EditProfileTopBar,
    Template,
    EditProfileBottomBarEditMode,
    EditProfileBottomBarViewMode,
    CropImageBackground,
    CropImageProfile,
    TextInputPopup,
  },
  data() {
    return {
      isProfileLoadingComplete: false,
      mode: "EDIT_MODE",
      title: "",
      userName: "",
      userSalesRegion: "",
      userIntroduceTitle: "",
      userIntroduceContent: "",
      userAwardsHistory: "",
      defaultBackgroundType: Constant.BACKGROUND_TYPE.TYPE_01,
      userImageBackgroundPath: "",
      userImageBackgroundFile: null,
      userImageBackgroundX: 0,
      userImageBackgroundY: 0,
      userImageBackgroundScale: 1,
      userImageProfilePath: "",
      userImageProfileFile: null,
      userImageProfileX: 0,
      userImageProfileY: 0,
      userImageProfileScale: 1,
      isShowProfile: true,
      isShowTrophy: true,
      isEditModePlay: true,
      designType: "",
      awardHistoryPositionY: 0,
      profileSeq: 0,
      showTextInputPopupTitle: false,
      showTextInputPopupContent: false,
    };
  },
  computed: {
    isShowCropBackground() {
      return (
        this.mode == Constant.EDIT_PROFILE_VIEW_MODE.CROP_MODE_BACKGROUND &&
        this.$store.state.pathCropImageBackground.state == "init"
      );
    },
    isShowCropProfile() {
      return (
        this.mode == Constant.EDIT_PROFILE_VIEW_MODE.CROP_MODE_PROFILE &&
        this.$store.state.pathCropImageProfile.state == "init"
      );
    },
    isAwardListLoadToggle() {
      return (
        this.mode == Constant.EDIT_PROFILE_VIEW_MODE.EDIT_MODE &&
        !isNaN(this.profileSeq)
      );
    },
    isShowEditProfileBottomBarEditMode() {
      return this.mode == Constant.EDIT_PROFILE_VIEW_MODE.EDIT_MODE;
    },
    isShowEditProfileBottomBarViewMode() {
      return this.mode == Constant.EDIT_PROFILE_VIEW_MODE.PREVIEW_MODE;
    },
    textLimitInfo() {
      var result = {};
      switch (this.designType) {
        case Constant.SELECT_DESIGN_TYPE_LIST[0].designType:
          result = {
            title: {
              textWidthLength: 0,
              textEnterLength: 2,
              textTotalLength: 18,
            },
            content: {
              textWidthLength: 0,
              textEnterLength: 2,
              textTotalLength: 66,
            },
          };
          break;
        case Constant.SELECT_DESIGN_TYPE_LIST[1].designType:
          result = {
            title: {
              textWidthLength: 0,
              textEnterLength: 2,
              textTotalLength: 18,
            },
            content: {
              textWidthLength: 0,
              textEnterLength: 2,
              textTotalLength: 66,
            },
          };
          break;
        case Constant.SELECT_DESIGN_TYPE_LIST[2].designType:
          result = {
            title: {
              textWidthLength: 0,
              textEnterLength: 2,
              textTotalLength: 18,
            },
            content: {
              textWidthLength: 0,
              textEnterLength: 2,
              textTotalLength: 66,
            },
          };
          break;
        case Constant.SELECT_DESIGN_TYPE_LIST[3].designType:
          result = {
            title: {
              textWidthLength: 0,
              textEnterLength: 3,
              textTotalLength: 18,
            },
            content: {
              textWidthLength: 0,
              textEnterLength: 6,
              textTotalLength: 66,
            },
          };
          break;
      }
      return result;
    },
  },
  mounted() {
    window.EditProfile = this;
  },
  methods: {
    /**
     * 어워드 히스토리 불러오기
     * @method getAwardListInfo
     */
    getAwardListInfo() {
      const that = this;
      this.$store.commit("setShowConfirm", {
        text:
          "불러온 수상이력으로 수정됩니다.<br/>수상이력을 불러오시겠습니까?",
        value: true,
        param: {
          btnTextOk: "예",
          btnTextClose: "아니요",
          callback: function () {
            this.$api
              .getProfileCreateInfo()
              .then((data) => {
                if (data.success) {
                  let userAwardsHistory = "";
                  that._.chain(data.awardList)
                    .map((o) => `- ${o.awardCareer}\n`)
                    .forEach((s) => (userAwardsHistory += s))
                    .value();
                  that.$set(that, "userAwardsHistory", userAwardsHistory);
                }
              })
              .catch((error) => {
                console.log(
                  "[오류]유저 어워드 리스트를 가져오는 중 오류가 발생하였습니다. ",
                  error
                );
              });
          },
        },
      });
    },
    /**
     * 프로필 카드 신규 생성시 사용자 정보 가져오기
     *
     * @method getProfileCreateInfo
     */
    getProfileCreateInfo() {
      const that = this;
      this.$api
        .getProfileCreateInfo()
        .then(function (data) {
          if (data.success) {
            let userAwardsHistory = "";
            that._.chain(data.awardList)
              .map((o) => `- ${o.awardCareer}\n`)
              .forEach((s) => (userAwardsHistory += s))
              .value();

            that.$set(that, "userName", data.userInfo.name);
            that.$set(that, "userSalesRegion", data.userInfo.pointName);
            that.$set(that, "userIntroduceTitle", data.userInfo.mottoTitle);
            that.$set(that, "userIntroduceContent", data.userInfo.mottoDesc);
            that.$set(that, "userAwardsHistory", userAwardsHistory);
            that.isProfileLoadingComplete = true;
          }
        })
        .catch(function (error) {
          console.log(
            "[오류] 프로필 카드 신규 생성시 사용자 정보 가져오는 중 오류가 발생하였습니다. ",
            error
          );
        });
    },
    onClickEditProfileCancle() {
      if (this.mode == Constant.EDIT_PROFILE_VIEW_MODE.PREVIEW_MODE) {
        this.$router.go(-1);
      } else if (this.mode == Constant.EDIT_PROFILE_VIEW_MODE.EDIT_MODE) {
        this.mode = Constant.EDIT_PROFILE_VIEW_MODE.PREVIEW_MODE;
        this.$router.go(-1);
      } else if (
        this.mode == Constant.EDIT_PROFILE_VIEW_MODE.CROP_MODE_BACKGROUND
      ) {
        this.mode = Constant.EDIT_PROFILE_VIEW_MODE.EDIT_MODE;

        this.userImageBackgroundPath = "";
        this.userImageBackgroundFile = null;
        this.$store.commit("initPathCropImageBackground");
      } else if (
        this.mode == Constant.EDIT_PROFILE_VIEW_MODE.CROP_MODE_PROFILE
      ) {
        this.mode = Constant.EDIT_PROFILE_VIEW_MODE.EDIT_MODE;

        this.userImageProfilePath = "";
        this.userImageProfileFile = null;
        this.$store.commit("initPathCropImageProfile");
      }
    },
    onClickEditProfileSave() {
      const that = this;

      if (this.mode == Constant.EDIT_PROFILE_VIEW_MODE.EDIT_MODE) {
        this.saveProfile();
      } else if (
        this.mode == Constant.EDIT_PROFILE_VIEW_MODE.CROP_MODE_BACKGROUND
      ) {
        this.$refs.cropImageBackground.saveInfo(function () {
          that.mode = Constant.EDIT_PROFILE_VIEW_MODE.EDIT_MODE;
        });
      } else if (
        this.mode == Constant.EDIT_PROFILE_VIEW_MODE.CROP_MODE_PROFILE
      ) {
        this.$refs.cropImageProfile.saveInfo(function () {
          that.mode = Constant.EDIT_PROFILE_VIEW_MODE.EDIT_MODE;
        });
      }
    },
    initBackgroundImage() {
      this.$refs.Template.$refs.backgroundImage.init();
    },
    initProfileImage() {
      this.$refs.Template.$refs.profileImage.init();
    },
    setUserIntroduceTitle(value) {
      this.userIntroduceTitle = value;
    },
    setUserIntroduceContent(value) {
      this.userIntroduceContent = value;
    },
    setUserAwardHistory(value) {
      this.userAwardsHistory = value;
    },
    setUserAwardsHistory(value) {
      this.userAwardsHistory = value;
    },
    setdefaultBackgroundType(value) {
      const that = this;
      this.defaultBackgroundType = value;
      this.userImageBackgroundPath = "";
      this.userImageBackgroundX = 0;
      this.userImageBackgroundY = 0;
      this.userImageBackgroundScale = 1;
      this.$store.commit("initPathCropImageBackground");
      setTimeout(function () {
        that.$refs.Template.$refs.backgroundImage.init();
      }, 250);
    },
    setUserImageBackgroundFile(file) {
      this.userImageBackgroundPath = URL.createObjectURL(file);
      this.userImageBackgroundFile = file;
    },
    setUserImageProfileFile(file) {
      console.log("setUserImageProfileFile");
      this.$refs.Template.$refs.profileImage.resetImageCustom();
      this.userImageProfilePath = URL.createObjectURL(file);
      this.userImageProfileFile = file;
    },
    setUserImageBackgroundPosition(data) {
      this.userImageBackgroundX = data.userImageBackgroundX;
      this.userImageBackgroundY = data.userImageBackgroundY;
      this.userImageBackgroundScale = data.userImageBackgroundScale;
    },
    setUserImageProfilePosition(data) {
      this.userImageProfileX = data.userImageProfileX;
      this.userImageProfileY = data.userImageProfileY;
      this.userImageProfileScale = data.userImageProfileScale;
    },
    setProfileDefault() {
      this.userImageProfilePath = "";
      this.userImageProfileFile = null;
      this.userImageProfileX = 0;
      this.userImageProfileY = 0;
      this.userImageProfileScale = 1;
      this.$refs.Template.$refs.profileImage.init();
    },
    setIsShowProfile(value) {
      this.isShowProfile = value;
    },
    setIsShowTrophy(value) {
      this.isShowTrophy = value;
    },
    editTxtMode(value) {
      this.isEditModePlay = value;
    },
    changeViewMode(value) {
      this.mode = value;
    },
    onClickImageDownload() {
      function getToday() {
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);

        return year + "_" + month + "_" + day;
      }
      console.log("profileSeq", this.profileSeq, getToday());
      const that = this;
      var tmpSaveFileName = getToday() + "_프로필"; //getToday() + "_프로필";
      that.$api
        .downloadProfileImage(this.profileSeq, tmpSaveFileName)
        .then(function (data) {
          console.log(data);
        })
        .catch(function (error) {
          console.log("error", error);
        });
      // this.mode = Constant.EDIT_PROFILE_VIEW_MODE.PREVIEW_MODE;
      // this.$store.commit("setShowLoading", true);
      // setTimeout(function () {
      //   that.$store.commit("setShowLoading", false);
      //   var saveName = "";
      //   if (that.title.length > 0) {
      //     saveName = that.title;
      //   } else {
      //     var now = new Date();
      //     saveName = `${now.getFullYear()}.${
      //       now.getMonth() + 1
      //     }.${now.getDate()} 제작된 페이지`;
      //   }
      //   UTIL.downloadURI(
      //     that.$refs.Template.getSaveImageData(3),
      //     `${saveName}.jpg`
      //   );
      // }, 500);
    },
    saveProfile() {
      const that = this;
      this.mode = Constant.EDIT_PROFILE_VIEW_MODE.PREVIEW_MODE;
      this.$store.commit("setShowLoading", true);

      setTimeout(function () {
        var file = UTIL.dataURLtoFile(
          that.$refs.Template.getSaveImageData(2),
          "profile.jpg"
        );

        let parameters = [
          that.userImageProfileFile, // userProfilePicImgFile
          that.userImageBackgroundFile, // skinImgFile
          file, // prImageFile
          that.userSalesRegion, // pointName
          that.designType, // designType
          that.defaultBackgroundType, // skinType
          that.userIntroduceTitle, // mottoTitle
          that.userIntroduceContent, // mottoDesc
          that.isShowProfile, // stateUserProfilePicImg
          that.userAwardsHistory, // awardCareer
          that.isShowTrophy, // stateAwardImg
          JSON.stringify(
            Object.assign(
              {},
              {
                pathCropImageProfile: that.$store.state.pathCropImageProfile,
                pathCropImageBackground:
                  that.$store.state.pathCropImageBackground,
              }
            )
          ), // canvasMeta
        ];

        if (!isNaN(that.profileSeq)) {
          parameters.unshift(that.profileSeq);
        }

        that.$api[isNaN(that.profileSeq) ? "createProfile" : "editProfile"]
          .apply(null, parameters)
          .then(function (data) {
            if (data.success) {
              that.profileSeq = parseInt(data.seq);
              alert("저장 되었습니다.");
            }
          })
          .catch(function (error) {
            console.log("error", error);
          });
      }, 1000);
    },
    getResponseProfile() {
      if (this.seq.length > 0) {
        const that = this;
        this.$api
          .getProfileEditInfo(this.seq)
          .then(function (data) {
            if (data.success) {
              that.$set(that, "userName", data.prCard.name);
              that.$set(that, "userSalesRegion", data.prCard.pointName);
              that.$set(that, "userIntroduceTitle", data.prCard.mottoTitle);
              that.$set(that, "userIntroduceContent", data.prCard.mottoDesc);
              that.$set(that, "userAwardsHistory", data.prCard.awardCareer);
              that.$set(
                that,
                "isShowProfile",
                data.prCard.stateUserProfilePicImg
              );
              that.$set(that, "isShowTrophy", data.prCard.stateAwardImg);
              that.$set(that, "defaultBackgroundType", data.prCard.skinType);
              that.$set(that, "designType", data.prCard.designType);

              that.$set(that, "title", `${data.prCard.updateDate} 제작프로필`);

              const metaData = JSON.parse(data.prCard.canvasMeta);
              if (data.prCard.skinImg && data.prCard.skinImg.length > 0) {
                that.$set(
                  that,
                  "userImageBackgroundPath",
                  `${that.$store.getters.cdnPath}${data.prCard.skinImg}`
                );
                that.$store.commit(
                  "addPathCropImageBackground",
                  metaData.pathCropImageBackground
                );
              }
              if (
                data.prCard.userProfilePicImg &&
                data.prCard.userProfilePicImg.length > 0
              ) {
                that.$set(
                  that,
                  "userImageProfilePath",
                  `${that.$store.getters.cdnPath}${data.prCard.userProfilePicImg}`
                );
                that.$store.commit(
                  "addPathCropImageProfile",
                  metaData.pathCropImageProfile
                );
              }

              that.isProfileLoadingComplete = true;
            }
          })
          .catch(function (error) {
            console.log("error", error);
          });
      } else {
        console.error("Seq 값이 없습니다.");
      }
    },
    setAwardHistoryPostionY(value) {
      this.awardHistoryPositionY = value;
    },

    textInputPopupTitleOpen() {
      this.showTextInputPopupTitle = true;
    },
    textInputPopupTitleClose() {
      this.showTextInputPopupTitle = false;
    },
    textInputPopupTitleSave(text) {
      this.userIntroduceTitle = text;
      this.textInputPopupTitleClose();
    },
    textInputPopupContentOpen() {
      this.showTextInputPopupContent = true;
    },
    textInputPopupContentClose() {
      this.showTextInputPopupContent = false;
    },
    textInputPopupContentSave(text) {
      this.userIntroduceContent = text;
      this.textInputPopupContentClose();
    },
  },
};
</script>

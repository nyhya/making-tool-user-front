<template>
  <div class="profile-edit-component-wrap">
    <div class="contain">
      <li
        class="btn btn01"
        :class="{ on: currentPageNum == 1 }"
        @click="openSelectBox(1)"
      >
        프로필 메인
      </li>
      <li
        class="btn btn02"
        :class="{ on: currentPageNum == 2 }"
        @click="openSelectBox(2)"
      >
        프로필 제작
      </li>
      <li
        class="btn btn03"
        :class="{ on: currentPageNum == 3 }"
        @click="openSelectBox(3)"
      >
        이력입력
      </li>

      <div class="select-box background" v-if="currentPageNum == 1">
        <button class="close" @click="offSelectBox">닫기</button>
        <p class="desc-txt" v-html="backgroundGuideText">
          배경 이미지를 선택하세요.
        </p>
        <div class="btn-area">
          <div
            class="default-img"
            :style="`background-image:url(${thumbBackground01})`"
            @click="onClickBackgroundType(BACKGROUND_TYPE.TYPE_01)"
          >
            <span>기본 배경 A</span>
          </div>
          <div
            class="empty-img"
            :style="`background-image:url(${thumbBackground02})`"
            @click="onClickBackgroundType(BACKGROUND_TYPE.TYPE_02)"
          >
            <span>기본 배경 B</span>
          </div>
          <div
            class="custom-img"
            v-if="designType != SELECT_DESIGN_TYPE_LIST[2].designType"
          >
            <label for="file_upload" @click="onClickChangeBackground"></label>
            <input
              type="file"
              id="file_upload"
              accept="image/gif, image/jpeg, image/png"
              @change="onChangeUserBackground"
            />
            <span>나의 사진 선택</span>
          </div>
        </div>
      </div>
      <div class="select-box profile" v-if="currentPageNum == 2">
        <button class="close" @click="offSelectBox">닫기</button>
        <p class="desc-txt">프로필 이미지를 선택하세요.</p>
        <div class="btn-area">
          <div class="default-img" @click="onClickProfileDefault">
            <span>기본 프로필</span>
          </div>
          <div class="empty-img" @click="onClickProfileDesable">
            <span>프로필사진 없음</span>
          </div>
          <div class="custom-img">
            <label
              :for="isShowProfile ? 'file_upload' : ''"
              @click="onClickChangeProfile"
            ></label>
            <input
              type="file"
              id="file_upload"
              accept="image/gif, image/jpeg, image/png"
              @change="onChangeUserProfile"
            />
            <span>나의 사진 선택</span>
          </div>
        </div>
      </div>
      <div class="select-box trophy" v-if="currentPageNum == 3">
        <button class="close" @click="offSelectBox">닫기</button>
        <p class="desc-txt">트로피 이미지 노출을 선택하세요.</p>
        <div class="btn-area">
          <div
            class="default-img"
            :style="`background-image:url(${thumbTrophy})`"
            @click="onClickTrophyDisplayEnable"
          >
            <span>트로피 이미지 노출</span>
          </div>
          <div class="custom-img" @click="onClickTrophyDisplayDesable">
            <span>트로피 이미지 삭제</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Constant from "@/constant/Constant.js";
export default {
  props: {
    designType: { type: String, default: "" },
    isShowProfile: { type: Boolean, default: false }
  },
  data () {
    return {
      currentPageNum: 0,
      templateData: [],
      thumbBgList: [],
      backgroundGuideText: "",
    };
  },
  created() {
    this.backgroundGuideText =
      this.designType !== Constant.SELECT_DESIGN_TYPE_LIST[2].designType
        ? "배경 이미지를 선택하세요."
        : "배경 이미지를 선택하세요.(사진첨부 불가타입)";
  },
  computed: {
    Constant () {
      return Constant;
    },
    findTemplate () {
      return this.$store.getters.findTemplateDate(this.designType);
    },
    thumbBackground01 () {
      return this.findTemplate[0].thumbDefaultBg01;
    },
    thumbBackground02 () {
      return this.findTemplate[0].thumbDefaultBg02;
    },
    thumbTrophy () {
      return this.findTemplate[0].thumbDefalutTrophy;
    },
    BACKGROUND_TYPE () {
      return Constant.BACKGROUND_TYPE;
    },
    SELECT_DESIGN_TYPE_LIST () {
      return Constant.SELECT_DESIGN_TYPE_LIST;
    },
  },

  methods: {
    offSelectBox () {
      this.currentPageNum = 4;
      this.$emit("editTxtMode", true);
    },
    openSelectBox (val) {
      this.currentPageNum = val;
      this.$emit("editTxtMode", false);
    },
    onClickBackgroundType (type) {
      this.$emit("setdefaultBackgroundType", type);
    },
    onChangeUserBackground (event) {
      const that = this;
      that.onClickBackgroundType(Constant.BACKGROUND_TYPE.USER_IMAGE);
      setTimeout(function () {
        that.$emit("setUserImageBackgroundFile", event.target.files[0]);
        that.$emit(
          "changeViewMode",
          Constant.EDIT_PROFILE_VIEW_MODE.CROP_MODE_BACKGROUND
        );
      }, 300);
    },
    onChangeUserProfile (event) {
      const that = this;
      setTimeout(function () {
        that.$emit("setUserImageProfileFile", event.target.files[0]);
        that.$emit(
          "changeViewMode",
          Constant.EDIT_PROFILE_VIEW_MODE.CROP_MODE_PROFILE
        );
      }, 300);
    },
    onClickProfileDefault () {
      this.$emit("setProfileDefault");
      this.$emit("setIsShowProfile", true);
    },
    onClickProfileDesable () {
      this.$emit("setIsShowProfile", false);
    },
    onClickTrophyDisplayEnable () {
      this.$emit("setIsShowTrophy", true);
    },
    onClickTrophyDisplayDesable () {
      this.$emit("setIsShowTrophy", false);
    },
    onClickChangeBackground () {
      console.log("onClickChangeBackground");
      var tmpData = this.$store.state.pathCropImageBackground;
      this.$store.commit(
        "addPathCropImageBackground",
        Object.assign(tmpData, { state: "init" })
      );
    },
    onClickChangeProfile () {
      if (!this.isShowProfile) {
        alert('기본 프로필을 먼저 선택 한 후 , 나의 사진을 등록해주세요.')
        return
      }
      var tmpData = this.$store.state.pathCropImageProfile;
      this.$store.commit(
        "addPathCropImageProfile",
        Object.assign(tmpData, { state: "init" })
      );
    },
  },
};
</script>
<template>
  <div class="profile-header-wrap create-profile">
    <button
      class="btn-back"
      v-if="isShowBack"
      @click="$emit('onClickEditProfileCancle')"
    >
      취소
    </button>
    <p v-html="showTitle">프로필 제작</p>
    <button
      class="btn-save"
      v-if="isShowSave"
      @click="$emit('onClickEditProfileSave')"
    >
      저장
    </button>
    <button
      v-if="isShowCancle"
      class="btn-close"
      @click="$emit('onClickEditProfileCancle')"
    ></button>
  </div>
</template>
<script>
import Constant from "@/constant/Constant.js";
export default {
  data() {
    return {
      topbarText: "프로필제작",
    };
  },
  props: {
    mode: { type: String, default: "" },
    title: { type: String, default: "" },
  },
  computed: {
    showTitle() {
      var result = "";

      if (
        this.mode == Constant.EDIT_PROFILE_VIEW_MODE.EDIT_MODE ||
        this.mode == Constant.EDIT_PROFILE_VIEW_MODE.PREVIEW_MODE
      ) {
        result = this.title.length > 0 ? this.title : this.topbarText;
      } else {
        result = this.topbarText;
      }
      return result;
    },
    isShowBack() {
      return (
        this.mode == Constant.EDIT_PROFILE_VIEW_MODE.EDIT_MODE ||
        this.mode == Constant.EDIT_PROFILE_VIEW_MODE.CROP_MODE_BACKGROUND ||
        this.mode == Constant.EDIT_PROFILE_VIEW_MODE.CROP_MODE_PROFILE
      );
    },
    isShowSave() {
      return (
        this.mode == Constant.EDIT_PROFILE_VIEW_MODE.EDIT_MODE ||
        this.mode == Constant.EDIT_PROFILE_VIEW_MODE.CROP_MODE_BACKGROUND ||
        this.mode == Constant.EDIT_PROFILE_VIEW_MODE.CROP_MODE_PROFILE
      );
    },
    isShowCancle() {
      return this.mode == Constant.EDIT_PROFILE_VIEW_MODE.PREVIEW_MODE;
    },
  },
  watch: {
    mode(value) {
      if (value == Constant.EDIT_PROFILE_VIEW_MODE.EDIT_MODE) {
        this.topbarText = "프로필 제작";
      } else if (value == Constant.EDIT_PROFILE_VIEW_MODE.PREVIEW_MODE) {
        this.topbarText = "제작 완료";
      } else if (
        value == Constant.EDIT_PROFILE_VIEW_MODE.CROP_MODE_BACKGROUND
      ) {
        this.topbarText = "배경 이미지";
      } else if (value == Constant.EDIT_PROFILE_VIEW_MODE.CROP_MODE_PROFILE) {
        this.topbarText = "프로필 이미지";
      }
    },
  },
};
</script>
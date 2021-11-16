<template>
  <div>
    <div
      class="header-wrap"
      v-if="
        mode == MAIN_MODE.MAIN ||
        mode == MAIN_MODE.PROFILE_LIST_VIEW ||
        mode == MAIN_MODE.DESIGN_LIST_VIEW ||
        mode == MAIN_MODE.MY_HISTORY_VIEW ||
        mode == MAIN_MODE.MY_HISTORY_EDIT
      "
    >
      <div class="top-logo"></div>
      <button class="btn-profile-edit" @click="gotoURL('MainManageProfile')">
        프로필 관리
      </button>
    </div>
    <div
      class="profile-header-wrap manager-profile"
      v-if="mode == MAIN_MODE.MANAGE_VIEW"
    >
      <button class="btn-back btn-back-arrow" @click="$router.go(-1)"></button>
      <p>프로필 관리</p>
      <button
        v-if="isShowBtnManagerEdit"
        class="btn-save"
        @click="$emit('changeViewMode', MAIN_MODE.MANAGE_EDIT)"
      >
        편집
      </button>
    </div>
    <div
      class="profile-header-wrap manager-profile"
      v-if="mode == MAIN_MODE.MANAGE_EDIT"
    >
      <button
        class="btn-back"
        @click="$emit('changeViewMode', MAIN_MODE.MANAGE_VIEW)"
      >
        취소
      </button>
      <p>프로필 관리</p>
    </div>
  </div>
</template>
<script>
import Constant from "@/constant/Constant.js";
export default {
  props: {
    mode: { type: String, default: "" },
    isShowBtnManagerEdit: { type: Boolean, default: false },
  },
  computed: {
    MAIN_MODE() {
      return Constant.MAIN_MODE;
    },
  },
  methods: {
    checkURL(name) {
      return this.$route.name != name;
    },
    gotoURL(name) {
      if (this.checkURL(name)) {
        this.$router.push({ name: name });
      }
    },
  },
};
</script>
<style scoped>
/* 프로필 에디트 페이지 헤더 */

.profile-header-wrap.crop-background {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 43px;
  padding: 0px;
}

.profile-header-wrap.crop-background p {
  font-size: 1.4rem;
  font-weight: 400;
  text-align: center;
  line-height: 43px;
}

.profile-header-wrap.crop-background .btn-back {
  position: absolute;
  left: 20px;
  top: 0px;
  height: 100%;
  background-color: transparent;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 600;
}

.profile-header-wrap.crop-background .btn-save {
  position: absolute;
  right: 20px;
  top: 0px;
  height: 100%;
  background-color: transparent;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 600;
}
.profile-header-wrap.crop-background p,
.profile-header-wrap.crop-background .btn-back,
.profile-header-wrap.crop-background .btn-save {
  color: #fff;
}
</style>
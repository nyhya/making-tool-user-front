<template>
  <div class="edit-component-wrap">
    <div class="container">
      <li
        class="btn btn01"
        :class="{
          on: mode == MAIN_MODE.MAIN || mode == MAIN_MODE.PROFILE_LIST_VIEW,
        }"
        @click="gotoURL('MainProfileList')"
      >
        프로필 메인
      </li>
      <li
        class="btn btn02"
        :class="{ on: mode == MAIN_MODE.DESIGN_LIST_VIEW }"
        @click="gotoURL('MainDesignTypeList')"
      >
        프로필 제작
      </li>
      <li
        class="btn btn03"
        :class="{
          on:
            mode == MAIN_MODE.MY_HISTORY_VIEW ||
            mode == MAIN_MODE.MY_HISTORY_EDIT,
        }"
        @click="gotoURL('MainMyHistory')"
      >
        이력입력
      </li>
    </div>
  </div>
</template>
<script>
import Constant from "@/constant/Constant.js";
export default {
  name: "MainEditComponent",
  props: {
    mode: { type: String, default: "" },
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
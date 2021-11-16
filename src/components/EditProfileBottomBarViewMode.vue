<template>
  <div class="complate-wrap">
    <div class="contain">
      <button class="edit" @click="onClickEdit">
        <p>수정</p>
      </button>
      <button class="download" @click="$emit('onClickImageDownload')">
        <p>다운로드</p>
      </button>
    </div>
  </div>
</template>
<script>
import Constant from "@/constant/Constant.js";
export default {
  methods: {
    onClickEdit() {
      this.$emit("changeViewMode", Constant.EDIT_PROFILE_VIEW_MODE.EDIT_MODE);
    },
  },
};
</script>
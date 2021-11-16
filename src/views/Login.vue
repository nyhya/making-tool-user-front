<template>
  <div class="wrap login-wrap">
    <div class="symbol"></div>
    <div class="contents">
      <div class="txt-con">
        <div class="layout-con"></div>
        <p class="sub-desc"></p>
        <p class="main-tit"></p>
      </div>
      <div class="image-trophy"></div>
      <div class="input-area">
        <div class="input-box">
          <input
            ref="login"
            type="tel"
            placeholder="사원번호"
            @input="onInputId"
            v-model="id"
          />
        </div>
        <div>
          <button class="login-btn btn" @click="onClickLogin">로그인</button>
        </div>
      </div>
    </div>
    <div class="image-symbom"></div>
  </div>
</template>
<script>
import StorageUtils from "@/utils/storage-utils";

export default {
  name: "Login",
  data () {
    return {
      id: "",
      maxLengthId: 8,
    };
  },
  methods: {
    onInputId (e) {
      let userId = e.target.value
      if (userId.length > this.maxLengthId) {
        userId = userId.substring(0, this.maxLengthId)
      }
      this.id = userId
    },
    focusOn () {
      this.$refs["login"].focus();
    },
    onClickLogin () {
      const that = this;
      this.$api
        .login(this.id)
        .then(function (data) {
          if (data.success) {
            StorageUtils.saveToken(data.token);
            that.$router.push("/Home");
          } else {
            alert(data.errorMsg);
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
  },
};
</script>

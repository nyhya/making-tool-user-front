<template>
  <div class="ess-view ess-view-confirm">
    <div>
      <div>
        <div v-html="$store.state.showConfirmText"></div>
        <div>
          <div @click="clickClose">{{ btnTextClose }}</div>
          <div @click="clickOk">{{ btnTextOk }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Confirm",
  components: {},
  data() {
    return {
      btnTextOk: "확인",
      btnTextClose: "닫기",
      callback: function () {
        console.log("확인");
      },
    };
  },
  created() {
    var param = this.$store.state.showConfirmParam;
    if (param.btnTextOk) {
      this.btnTextOk = param.btnTextOk;
    }
    if (param.btnTextClose) {
      this.btnTextClose = param.btnTextClose;
    }
    if (param.callback) {
      this.callback = param.callback;
    }
  },
  methods: {
    closeConfirm() {
      this.$store.commit("setShowConfirm", {
        text: "",
        value: false,
        param: null,
      });
    },
    clickOk() {
      this.callback();
      this.closeConfirm();
    },
    clickClose() {
      this.closeConfirm();
    },
  },
};
</script>
<style scoped>
.ess-view {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 50000;
}
.ess-view-confirm {
  background: rgba(0, 0, 0, 0.5);
  display: table;
}
.ess-view-confirm > div {
  display: table-cell;
  vertical-align: middle;
}
.ess-view-confirm > div > div {
  font-size: 16px;
  width: 300px;
  margin: auto;
  background: rgba(255, 255, 255, 0.95);
  text-align: center;
  border-radius: 10px;
}
.ess-view-confirm > div > div > div:first-child {
  padding: 30px 0px;
}
.ess-view-confirm > div > div > div:last-child {
  box-shadow: inset 0px 1px 0px 0px #ccc;
  background-color: rgba(0, 0, 0, 0.03);
  height: 50px;
  display: table;
  width: 100%;
}
.ess-view-confirm > div > div > div:last-child > div {
  display: table-cell;
  vertical-align: middle;
  width: 50%;
}
.ess-view-confirm > div > div > div:last-child > div:last-child {
  box-shadow: inset 1px 0px 0px 0px #ccc;
}
</style>


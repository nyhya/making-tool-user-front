<template>
  <div class="home-wrap" v-if="mode.length > 0">
    <MainTopBar
      :mode="mode"
      @changeViewMode="changeViewMode"
      :isShowBtnManagerEdit="isShowBtnManagerEdit"
    />
    <MainProfileList
      v-if="
        mode == MAIN_MODE.MAIN ||
        mode == MAIN_MODE.PROFILE_LIST_VIEW ||
        mode == PREVIEW_MODE
      "
      @changeViewMode="changeViewMode"
    />
    <MainProfileTypeList v-if="mode == MAIN_MODE.DESIGN_LIST_VIEW" />
    <MainMyHistory
      v-if="mode == MAIN_MODE.MY_HISTORY_VIEW"
      @changeViewMode="changeViewMode"
    />
    <MainMyHistoryEdit
      v-if="mode == MAIN_MODE.MY_HISTORY_EDIT"
      @changeViewMode="changeViewMode"
    />
    <ManageProfileList
      :mode="mode"
      v-if="mode == MAIN_MODE.MANAGE_VIEW || mode == MAIN_MODE.MANAGE_EDIT"
      @changeViewMode="changeViewMode"
      @setIsShowBtnManagerEdit="setIsShowBtnManagerEdit"
      ref="ManageProfileList"
    />
    <MainBottomBar
      :mode="mode"
      @changeViewMode="changeViewMode"
      v-if="mode != MAIN_MODE.MANAGE_VIEW && mode != MAIN_MODE.MANAGE_EDIT"
    />
    <IntroGuide
      @introGuidePopupOff="introGuidePopupOff"
      @onClickTodayOff="onClickTodayOff"
      v-if="this.$store.getters.getIntroGuidePopupShow"
    />
  </div>
</template>

<script>
import MainTopBar from "@/components/MainTopBar.vue";
import MainProfileList from "@/components/MainProfileList.vue";
import MainProfileTypeList from "@/components/MainProfileTypeList.vue";
import MainMyHistory from "@/components/MainMyHistory.vue";
import MainMyHistoryEdit from "@/components/MainMyHistoryEdit.vue";
import ManageProfileList from "../components/ManageProfileList.vue";
import MainBottomBar from "@/components/MainBottomBar.vue";
import Constant from "@/constant/Constant.js";
import IntroGuide from "@/components/IntroGuide.vue";

export default {
  name: "Home",
  components: {
    MainTopBar,
    MainProfileList,
    MainProfileTypeList,
    MainMyHistory,
    MainMyHistoryEdit,
    ManageProfileList,
    MainBottomBar,
    IntroGuide,
  },
  props: {
    mainMode: {
      type: String,
      default: "",
    },
  },
  created () {
    this.init();
    this.todayCheck();
  },
  mounted () {
    if (
      localStorage.getItem("setIntroGuidePopupShow") !== null ||
      localStorage.getItem("setIntroGuidePopupShow") == false
    ) {
      this.$store.commit("setIntroGuidePopupShow", false);
    }
  },
  watch: {
    mainMode () {
      this.init();
    },
  },
  data () {
    return {
      mode: "",
      isShowBtnManagerEdit: false,
      introGuidePopupToggle: true,
    };
  },
  /*beforeRouteLeave (to, from, next) {
    console.log(to, from, this.mode)
    if (
      from.name === "MainMyHistory" &&
      this.mode === this.MAIN_MODE.MY_HISTORY_EDIT
    ) {
      this.changeViewMode(this.MAIN_MODE.MY_HISTORY_VIEW);
      next(false);
    } else {
      next();
    }
  },*/
  computed: {
    MAIN_MODE () {
      return Constant.MAIN_MODE;
    },
    PREVIEW_MODE () {
      return Constant.EDIT_PROFILE_VIEW_MODE.PREVIEW_MODE;
    },
  },
  methods: {
    init () {
      if (this._.indexOf(Object.keys(Constant.MAIN_MODE), this.mainMode) >= 0) {
        this.changeViewMode(this.mainMode);
      }
    },
    changeViewMode (mode) {
      this.mode = mode;
    },
    setIsShowBtnManagerEdit (value) {
      this.isShowBtnManagerEdit = value;
    },
    introGuidePopupOff () {
      this.$store.commit("setIntroGuidePopupShow", false);
    },
    onClickTodayOff () {
      var now = new Date();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var today = month + "/" + date;
      localStorage.setItem("todayDate", today);
      this.$store.commit("setIntroGuidePopupShow", false);
      localStorage.setItem("setIntroGuidePopupShow", false);
    },
    todayCheck () {
      var currentIntroGuidePopupShow = localStorage.getItem(
        "setIntroGuidePopupShow"
      );

      if (
        currentIntroGuidePopupShow == "false" &&
        currentIntroGuidePopupShow !== null
      ) {
        var now = new Date();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var today = month + "/" + date;

        if (today !== localStorage.getItem("todayDate")) {
          this.$store.commit("setIntroGuidePopupShow", true);
        }
      }
    },
  },
};
</script>

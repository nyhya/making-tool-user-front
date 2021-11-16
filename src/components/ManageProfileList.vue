<template>
  <div
    class="contents"
    :style="
      mode == MAIN_MODE.MANAGE_VIEW
        ? 'height:calc(100% - 43px);'
        : 'height:calc(100% - 43px);padding-bottom:67px'
    "
  >
    <!-- <div class="deco-img"></div> -->
    <div class="user-sales-name">
      <span class="name">현재 저장된 모바일 프로필</span>
    </div>
    <p class="desc">{{ profileList.length }}/10</p>
    <div class="nofile-box" v-if="profileList.length == 0">
      <div class="no-file"></div>
      <div
        class="btns"
        @click="$emit('changeViewMode', MAIN_MODE.DESIGN_LIST_VIEW)"
      >
        <button class="make-profile-btn">프로필 제작하기</button>
      </div>
    </div>
    <div class="profile-list-con" v-if="profileList.length > 0">
      <div
        class="profile-item"
        :class="{ on: profile.isSelected, off: !profile.isSelected }"
        v-for="profile in _.orderBy(profileList, ['seq'], ['desc'])"
        :key="`profileList-item-${profile.seq}`"
        @click="onClickProfile(profile)"
      >
        <button v-if="mode == MAIN_MODE.MANAGE_EDIT"></button>
        <div
          class="image-container"
          :class="{ edit: mode == MAIN_MODE.MANAGE_EDIT }"
        >
          <div>
            <img v-lazy="`${$store.getters.cdnPath}${profile.prImage}`" />
          </div>
        </div>
        <div
          class="date"
          :class="{
            on: mode == MAIN_MODE.MANAGE_EDIT && profile.isSelected,
            off: mode == MAIN_MODE.MANAGE_EDIT && !profile.isSelected,
          }"
        >
          {{ profile.updateDate | getYYYYMMDD }}
        </div>
      </div>
    </div>
    <div
      class="bottom-btns"
      v-if="mode == MAIN_MODE.MANAGE_EDIT"
      style="background-color: #132f56"
    >
      <button @click="onClickSelectAll">
        <span>{{ isSelectedAll ? "전체해제" : "전체선택" }}</span>
      </button>
      <button @click="onClickDelete">
        <span>삭제</span>
      </button>
    </div>
  </div>
</template>
<script>
import Constant from "@/constant/Constant.js";
export default {
  props: {
    mode: { type: String, default: "" },
  },
  data() {
    return {
      profileList: [],
    };
  },
  filters: {
    getYYYYMMDD(value) {
      return value.split(" ")[0];
    },
  },
  computed: {
    MAIN_MODE() {
      return Constant.MAIN_MODE;
    },
    isSelectedAll() {
      return (
        this.profileList.length > 1 &&
        this.profileList.length ==
          this._.filter(this.profileList, { isSelected: true }).length
      );
    },
  },
  watch: {
    mode(value) {
      if (value == Constant.MAIN_MODE.MANAGE_VIEW) {
        this.profileList.forEach(function (d) {
          d.isSelected = false;
        });
      }
    },
  },
  mounted() {
    this.getProfileList();
  },
  methods: {
    getProfileList() {
      const that = this;
      this.$api
        .getProfileList()
        .then(function (data) {
          if (data.success) {
            that.$set(
              that,
              "profileList",
              data.prCardList.map(function (d) {
                d.isSelected = false;
                return d;
              })
            );
            console.log(123123123, data.prCardList.length);
            that.$emit("setIsShowBtnManagerEdit", data.prCardList.length > 0);
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    onClickProfile(profile) {
      if (this.mode == Constant.MAIN_MODE.MANAGE_VIEW) {
        this.$router.push(`/EditProfile/View/${profile.seq}`);
      } else {
        profile.isSelected = !profile.isSelected;
      }
    },
    onClickSelectAll() {
      console.log(
        this.profileList.length,
        this._.filter(this.profileList, { isSelected: true }).length
      );
      if (
        this.profileList.length ==
        this._.filter(this.profileList, { isSelected: true }).length
      ) {
        this.changeSelectAllDisable();
      } else {
        this.changeSelectAllEnable();
      }
    },
    changeSelectAllEnable() {
      this.profileList.forEach(function (d) {
        d.isSelected = true;
      });
    },
    changeSelectAllDisable() {
      this.profileList.forEach(function (d) {
        d.isSelected = false;
      });
    },
    onClickDelete() {
      const that = this;
      if (this._.filter(this.profileList, { isSelected: true }).length > 0) {
        this.$store.commit("setShowConfirm", {
          text: "선택한 모바일 프로필을<br/> 삭제 하시겠습니까?",
          value: true,
          param: {
            btnTextOk: "예",
            btnTextClose: "아니요",
            callback: function () {
              that.$api
                .deleteProfile(
                  that._.chain(that.profileList)
                    .filter({ isSelected: true })
                    .map(function (d) {
                      return d.seq;
                    })
                    .value()
                )
                .then(function (data) {
                  if (data.success) {
                    that.$emit(
                      "changeViewMode",
                      Constant.MAIN_MODE.MANAGE_VIEW
                    );
                    alert("삭제 되었습니다.");
                    that.getProfileList();
                  }
                })
                .catch(function (error) {
                  console.log("error", error);
                });
            },
          },
        });
      } else {
        alert("삭제할 프로필을 먼저 선택해 주세요.");
      }
    },
  },
};
</script>
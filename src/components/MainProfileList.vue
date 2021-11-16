<template>
  <div class="contents">
    <div class="layout-box">
      <!-- <div class="deco-img"></div> -->
      <div class="user-sales-name">
        <span class="name">{{ userName }}&nbsp;님</span
        ><span class="extra">의</span>
      </div>
      <p class="desc">
        {{
          profileList.length == 0
            ? "모바일 프로필"
            : `완성 프로필 ${profileList.length}/10`
        }}
      </p>
      <!-- 만들 프로필이 없을때 : s -->
      <div class="empty-profile-info" v-if="profileList.length == 0">
        <div class="layout-box">
          <button
            class="make-profile-btn"
            @click="gotoURL('MainDesignTypeList')"
          >
            제작하기
          </button>
        </div>
      </div>
      <!-- 만들 프로필이 없을때 : e -->
      <!-- 만든 프로필 로드하여 표시 : s -->
      <div class="myprofile-list-con" v-if="profileList.length > 0">
        <swiper
          ref="mySwiper"
          :class="{ 'single-swiper': profileList.length == 1 }"
          :options="swiperOpt"
          @slideChange="onChangeSwiper"
          class="custom-swiper-con"
        >
          <swiper-slide
            v-for="profile in _.orderBy(profileList, ['updateDate'], ['desc'])"
            :key="`profileList-item-${profile.seq}`"
          >
            <div class="layout">
              <div>
                <img
                  v-lazy="`${$store.getters.cdnPath}${profile.prImage}`"
                  @click="onClickPreView(profile.seq)"
                />
                <button
                  class="mypofile-edit-icon"
                  @click="onClickEditProfile(profile.seq)"
                ></button>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide
            key="profileList-item-blank"
            v-if="profileList.length <= 9"
          >
            <div class="empty-profile-info main">
              <div class="layout-box">
                <button
                  class="make-profile-btn"
                  @click="gotoURL('MainDesignTypeList')"
                >
                  제작하기
                </button>
              </div>
            </div>
          </swiper-slide>
          <div
            class="swiper-button-prev custom-prev"
            @click="slideToFirst"
            slot="button-prev"
          ></div>
          <div
            class="swiper-button-next custom-next"
            @click="slideToLast"
            slot="button-next"
          ></div>
        </swiper>
      </div>
      <!-- 만든 프로필 로드하여 표시 : e -->
    </div>
  </div>
</template>
<script>
import Constant from "@/constant/Constant.js";
import StorageUtils from "@/utils/storage-utils";
import jwtDecode from "jwt-decode";

export default {
  data() {
    return {
      userName: "",
      profileList: [],
      swiperOpt: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        slidesPerView: "auto",
        spaceBetween: 30,
        freeMode: true,
      },
    };
  },
  computed: {
    mySwiper() {
      return this.$refs.mySwiper.$swiper;
    },
    MAIN_MODE() {
      return Constant.MAIN_MODE;
    },
  },
  created() {
    try {
      this.userName = jwtDecode(StorageUtils.getToken()).name;
    } catch (error) {
      console.error(
        "[오류] 사용자 이름 디코딩 중 오류가 발생하였습니다. ",
        error
      );
    }
  },
  mounted() {
    this.getProfileList();
  },
  methods: {
    slideToFirst() {
      this.mySwiper.slideTo(0, 500, function () {});
    },
    slideToLast() {
      this.mySwiper.slideTo(this.mySwiper.imagesLoaded, 500, function () {});
    },

    onChangeSwiper() {
      if (this.$refs.mySwiper.swiperInstance.activeIndex > 0) {
        this.swiperToggle = true;
      }
    },
    getProfileList() {
      const that = this;
      this.$api
        .getProfileList()
        .then(function (data) {
          if (data.success) {
            that.$set(that, "profileList", data.prCardList);
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    onClickPreView(seq) {
      this.$router.push(`/EditProfile/View/${seq}`);
    },
    onClickEditProfile(seq) {
      this.$router.push(`/EditProfile/Edit/${seq}`);
    },
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
<style>
/* .single-swiper .swiper-wrapper {
  display: flex;
  justify-content: center;
} */
.swiper-slide .empty-profile-info {
  margin-top: 0px !important;
  width: 100% !important;
  padding-bottom: 150% !important;
}
.empty-profile-info.main {
  background-image: url(../assets/images/home-border-box-main.png) !important;
}
.custom-swiper-con .mypofile-edit-icon {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 60px;
  height: 60px;
  background-image: url(../assets/images/icon-myprofile-edit.png) !important;
  background-size: 30px;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
}
</style>
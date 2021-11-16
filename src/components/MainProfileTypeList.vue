<template>
  <div class="contents">
    <div class="layout-box">
      <!-- <div class="deco-img"></div> -->
      <div class="user-sales-name">
        <span class="name">프로필 제작하기</span>
      </div>
      <p class="desc">레이아웃을 선택해주세요.</p>
      <div class="profile-type-con">
        <swiper
          ref="mySwiper"
          :options="swiperOptions"
          @slideChange="onChangeSwiper"
        >
          <swiper-slide>
            <div class="design-type" @click="onClickMakeProfile">
              <div>
                <img v-lazy="`./images/design-sample-type01.png`" />
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="design-type" @click="onClickMakeProfile">
              <div>
                <img v-lazy="`./images/design-sample-type02.png`" />
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="design-type" @click="onClickMakeProfile">
              <div>
                <img v-lazy="`./images/design-sample-type03.png`" />
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="design-type" @click="onClickMakeProfile">
              <div>
                <img v-lazy="`./images/design-sample-type04.png`" />
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div
            class="swiper-button-prev btn-type-prev"
            slot="button-prev"
          ></div>
          <div
            class="swiper-button-next btn-type-next"
            slot="button-next"
          ></div>
        </swiper>
      </div>
      <button class="select-btn" @click="onClickMakeProfile">
        {{ selectBtnText }}
      </button>
    </div>
  </div>
</template>
<script>
import Constant from "@/constant/Constant.js";
export default {
  created() {
    this.getProfileCount();
  },
  computed: {
    mySwiper() {
      return this.$refs.mySwiper;
    },
  },
  mounted() {
    this.updateSelectBtnText();
  },
  data() {
    return {
      selectBtnText: "",
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      profileCount: 0,
      checkMotto: false,
    };
  },
  methods: {
    onChangeSwiper() {
      this.updateSelectBtnText();
    },
    updateSelectBtnText() {
      this.selectBtnText =
        Constant.SELECT_DESIGN_TYPE_LIST[
          this.$refs.mySwiper.swiperInstance.activeIndex
        ].btnTitle;
    },
    onClickMakeProfile() {
      const that = this;

      if (!this.checkMotto) {
        this.$store.commit("setShowConfirm", {
          text: "입력된 이력정보가 없습니다.<br/>이력을 먼저 입력해주세요",
          value: true,
          param: {
            btnTextOk: "이력 입력하기",
            btnTextClose: "닫기",
            callback: function () {
              that.$router.push({ name: "MainMyHistory" });
            },
          },
        });
        return;
      }
      if (this.profileCount >= 10) {
        alert("프로필은 최대 10개 까지만 만들 수 있습니다.");
      } else {
        var designType =
          Constant.SELECT_DESIGN_TYPE_LIST[
            this.$refs.mySwiper.swiperInstance.activeIndex
          ].designType;
        this.$router.push("/EditProfile/" + designType);
      }
    },
    getProfileCount() {
      const that = this;
      this.$api
        .getProfileCount()
        .then(function (data) {
          if (data.success) {
            that.$set(that, "profileCount", data.createdPrCardCount);
            that.$set(that, "checkMotto", data.checkMotto);
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
  },
};
</script>

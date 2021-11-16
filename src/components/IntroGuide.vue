<template>
  <div class="intro-guide-wrap">
    <div class="intro-contain">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide class="page cover">
          <div class="contents"></div>
        </swiper-slide>
        <swiper-slide class="page page01">
          <div class="contents"></div>
        </swiper-slide>
        <swiper-slide class="page page02">
          <div class="contents"></div>
        </swiper-slide>
        <swiper-slide class="page page03">
          <div class="contents"></div>
        </swiper-slide>
        <swiper-slide class="page page04">
          <div class="contents"></div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="intro-bottom-bar">
        <div class="today-off" @click="onClickTodayOff">
          <p>오늘은 보지 않기</p>
        </div>
        <div class="off" @click="onClickIntroGuidePopupOff">
          <p>닫기</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "introGuide",
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        // Some Swiper option/callback...
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  methods: {
    onClickIntroGuidePopupOff() {
      this.$emit("introGuidePopupOff");
    },
    onClickTodayOff() {
      this.$emit("onClickTodayOff");
    },
  },
};
</script>
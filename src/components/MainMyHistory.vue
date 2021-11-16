<template>
  <div class="contents">
    <!-- <div class="deco-img"></div> -->
    <div class="user-sales-name">
      <span class="name">나의 이력 입력하기</span>
    </div>
    <div class="history-list-area">
      <!-- 지점명 : s -->
      <dl class="resion-area">
        <dt class="question">지점명</dt>
        <dd class="answer region">
          <p
            class="list-txt"
            :class="{ on: $store.state.userInfo.pointName.length > 0 }"
          >
            {{ $store.state.userInfo.pointName }}
          </p>
        </dd>
      </dl>
      <!-- 지점명 : e -->
      <!-- 남기고 싶은 말 : s -->
      <dl class="memo-area">
        <dt class="question ico2">남기고 싶은 말</dt>
        <dd class="answer memo" style="padding-top: 10px">
          <p class="guide-txt desc">
            프로필 레이아웃에 따라 글자수, 위치 등 틀려질 수 있으니 프로필 제작
            페이지에서 알맞게 조정하시면 됩니다.
          </p>
          <!-- 제목 : s  -->
          <dl class="inner-input">
            <dt class="title-txt">제목</dt>
            <p
              class="empty-txt"
              :class="{ on: $store.state.userInfo.mottoTitle.length > 0 }"
            >
              {{
                $store.state.userInfo.mottoTitle.length
                  ? $store.state.userInfo.mottoTitle
                  : "입력된 내용이 없습니다."
              }}
            </p>
          </dl>
          <!-- 제목 : e  -->
          <!-- 내용 : s  -->
          <dl class="inner-input">
            <dt class="title-txt">내용</dt>
            <p
              class="empty-txt"
              :class="{ on: $store.state.userInfo.mottoDesc.length > 0 }"
            >
              {{
                $store.state.userInfo.mottoDesc.length
                  ? $store.state.userInfo.mottoDesc
                  : "입력된 내용이 없습니다."
              }}
            </p>
          </dl>
          <!-- 내용 : e  -->
        </dd>
      </dl>
      <!-- 남기고 싶은 말 : e -->
      <!-- 이력 사항 : s -->
      <dl class="sales-history-area">
        <dt class="question ico3">이력 사항</dt>
        <dd class="answer region" style="padding-top: 15px">
          <div class="guide-con" style="margin-bottom: 18px">
            <p class="guide-txt desc" style="text-align: left">
              프로필에 반영할 이력 사항을 선택하세요. (최대 4개)
            </p>
            <p class="guide-txt desc" style="text-align: left">
              기존 이력 사항도 수정이 가능합니다.
            </p>
            <p class="guide-txt desc" style="text-align: left">
              이력사항은 선택하는 순서대로 프로필에 표시됩니다.
            </p>
          </div>
          <p
            :class="{ txtOn: award.stateUse, txtOff: !award.stateUse }"
            v-for="(award, awardIdx) in $store.state.awardList"
            :key="`award-${awardIdx}`"
          >
            - {{ award.awardCareer }}
          </p>
        </dd>
      </dl>
    </div>
    <!-- 이력 사항 : s -->
    <div class="edit-btn-container">
      <button
        class="edit-history"
        @click="$router.push({ name: 'MainMyHistoryEdit' })"
      >
        <span>
          이력 <br />
          수정
        </span>
      </button>
    </div>
  </div>
</template>
<script>
import Constant from "@/constant/Constant.js";
export default {
  mounted () {
    this.getMyHistory();
  },
  computed: {
    MAIN_MODE () {
      return Constant.MAIN_MODE;
    },
  },
  methods: {
    getMyHistory () {
      const that = this;
      this.$api
        .getHistory()
        .then(function (data) {
          that.$store.commit("setUserInfo", data.userInfo);
          that.$store.commit(
            "setAwardList",
            that._.orderBy(
              data.awardList,
              ["stateUse", "sortIndex"],
              ["desc", "asc"]
            )
          );
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
  },
};
</script>
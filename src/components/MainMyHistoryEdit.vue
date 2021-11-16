<template>
  <div class="contents">
    <!-- <div class="deco-img"></div> -->
    <div class="user-sales-name">
      <span class="name">나의 이력 입력하기</span>
    </div>
    <div class="input-area">
      <!-- 지점명 : s -->
      <dl class="resion-area" style="">
        <dt class="question">지점명</dt>
        <dd class="answer region">
          <input
            type="text"
            name=""
            placeholder="지점명"
            v-model="salesRegion"
            maxlength="15"
            @focus="toggleInputDeleteBtn('isShowDeleteBtnSalesRegion', true)"
            @blur="toggleInputDeleteBtn('isShowDeleteBtnSalesRegion', false)"
          />
          <div
            class="text-delete"
            v-if="isShowDeleteBtnSalesRegion"
            @click="salesRegion = ''"
          ></div>
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
          <dl class="inner-input" style="padding-top: 10px">
            <dt class="title-txt">제목</dt>
            <dd class="answer-txt">
              <textarea
                name=""
                placeholder="좌우명 한 마디를 입력하세요. (18자 이내)"
                v-model="tmpSalesIntroduceTitle"
                rows="2"
                :maxlength="maxLengthTitleTextarea"
                v-on:input="onInputTitleTextarea"
                @keyup.enter="onKeyupEnterTitleTextarea"
                @blur="blurSalesIntroduceTitle"
                ref="salesIntroduceTitle"
                @focus="
                  toggleInputDeleteBtn(
                    'isShowDeleteBtnSalesIntroduceTitle',
                    true
                  )
                "
              ></textarea>
              <p class="extra-txt">
                {{ inputTitleTextareaLength }}/{{
                  introduceTitleOption.maxLength
                }}
              </p>
              <div
                class="text-delete"
                style="right: 0; top: 0px"
                v-if="isShowDeleteBtnSalesIntroduceTitle"
                @click="tmpSalesIntroduceTitle = ''"
              ></div>
            </dd>
          </dl>
          <!-- 제목 : e  -->
          <!-- 내용 : s  -->
          <dl class="inner-input">
            <dt class="title-txt">내용</dt>
            <dd class="answer-txt contents">
              <textarea
                name=""
                placeholder="추가로 남기고 싶은 말을 입력하세요. (66자 이내)"
                v-model="tmpSalesIntroduceContent"
                rows="2"
                v-on:input="onInputContentTextarea"
                :maxlength="maxLengthContentTextarea"
                @focus="
                  toggleInputDeleteBtn(
                    'isShowDeleteBtnSalesIntroduceContent',
                    true
                  )
                "
                @blur="
                  toggleInputDeleteBtn(
                    'isShowDeleteBtnSalesIntroduceContent',
                    false
                  )
                "
              ></textarea>
              <p class="extra-txt">
                {{ inputContentTextareaLength }}/{{
                  introduceContentOption.maxLength
                }}
              </p>
              <div
                class="text-delete"
                style="right: 0; top: 0px"
                v-if="isShowDeleteBtnSalesIntroduceContent"
                @click="tmpSalesIntroduceContent = ''"
              ></div>
            </dd>
          </dl>
          <!-- 내용 : e  -->
        </dd>
      </dl>
      <!-- 남기고 싶은 말 : e -->
      <!-- 이력 사항 : s -->
      <dl class="history-area">
        <dt class="question ico3" @click="onClickAwardReset">
          이력 사항 <button>수상 이력 초기화</button>
        </dt>
        <dd class="answer" style="padding-top: 15px">
          <div class="guide-con" style="margin-bottom: 10px">
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
          <div
            class="historylist"
            :class="{
              on: _.findIndex(awardSelectedList, { key: award.key }) >= 0,
              off: _.findIndex(awardSelectedList, { key: award.key }) == -1,
              /*noTitle: award.awardCareer.length == 0*/
            }"
            :data-index="_.findIndex(awardSelectedList, { key: award.key }) + 1"
            v-for="(award, awardIdx) in awardList"
            :key="`historylist-${award.key}`"
          >
            <div class="item">
              <div class="checkArea" @click="onClickAward(award)"></div>
              <input
                :class="{ on: award.awardCareer.length > 0 }"
                type="text"
                v-model="award.awardCareer"
                placeholder="최대 22자 입력 가능"
                maxlength="22"
                :data-idx="awardIdx"
                @keyup="inputCheckAward"
                @focus="toggleInputListDeleteBtn(award, true)"
                @blur="toggleInputListDeleteBtn(award, false)"
              />
              <div
                class="text-delete"
                style="right: 0; top: 0px; height: 100%"
                v-if="award.isFocus"
                @click="award.awardCareer = ''"
              ></div>
            </div>
            <button class="delete" @click="deleteAward(award.key)"></button>
          </div>
          <button class="write-history" @click="onClickAddAward">
            <span> 직접 입력 </span>
          </button>
        </dd>
      </dl>
      <!-- 이력 사항 : s -->
    </div>
    <div class="btn-bottom">
      <button class="btn cancle" @click="onClickCancel">취소</button>
      <button class="btn save" @click="onClickSave">이력 저장하기</button>
    </div>
  </div>
</template>
<script>
import Constant from "@/constant/Constant.js";
export default {
  name: "MainMyHistoryEdit",
  data () {
    return {
      awardList: [],
      awardSelectedList: [],
      awardTitle: "",

      tmpSalesIntroduceTitle: "",
      tmpSalesIntroduceContent: "",

      isShowDeleteBtnSalesRegion: false,
      isShowDeleteBtnSalesIntroduceTitle: false,
      isShowDeleteBtnSalesIntroduceContent: false,

      deviceOS: '',
      regxNewline: /(\r\n\t|\n|\r\t|\r\n|\n\r)/gm,

      introduceTitleOption: {
        maxLength: 18
      },

      introduceContentOption: {
        maxLength: 66
      }
    };
  },
  created () {
    this.init();
    this.tmpSalesIntroduceTitle = this.$store.state.userInfo.mottoTitle;
    this.tmpSalesIntroduceContent = this.$store.state.userInfo.mottoDesc;
    this.deviceOS = this.$store.state.deviceOS
    this.introduceTitleOption.isExistEnter = this.tmpSalesIntroduceTitle.indexOf('\n') === -1 ? false : true
  },
  computed: {
    MAIN_MODE () {
      return Constant.MAIN_MODE;
    },
    salesRegion: {
      get () {
        return this.$store.state.userInfo.pointName;
      },
      set (value) {
        this.$store.commit("setUserInfo", { pointName: value });
      },
    },
    saveAwardSelectedList () {
      const that = this;
      return this._.reduce(
        this.awardList,
        function (result, data, idx) {
          var findIdx = that._.findIndex(that.awardSelectedList, {
            key: data.key,
          });
          result.push(
            Object.assign(data, {
              title: data.awardCareer,
              isSelected: findIdx >= 0,
              idxKey: idx,
              orderIdx: findIdx,
            })
          );
          return result;
        },
        []
      );
    },
    maxLengthTitleTextarea () {
      // 안드로이드는 개행문자가 \n 으로 들어가는데 IOS는 \n\r 으로 들어가서 2자리가 되서 수정하였습니다.
      const maxLength = this.introduceTitleOption.maxLength

      return this.tmpSalesIntroduceTitle.length === this.inputTitleTextareaLength ? maxLength :
        (this.deviceOS === 'ios' ? maxLength + 2 : maxLength + 1)
    },
    inputTitleTextareaLength () {
      return this.tmpSalesIntroduceTitle.replace(this.regxNewline, '').length
    },
    maxLengthContentTextarea () {
      // 안드로이드는 개행문자가 \n 으로 들어가는데 IOS는 \n\r 으로 들어가서 2자리가 되서 수정하였습니다.
      var newlineLength = this.tmpSalesIntroduceContent.split('\n').length;
      const maxLength = this.introduceContentOption.maxLength

      console.log(newlineLength, (this.tmpSalesIntroduceContent.length === this.inputContentTextareaLength ? maxLength :
        (this.deviceOS === 'ios' ? maxLength + (2 * newlineLength) : maxLength + (1 * newlineLength))))

      if (this.inputContentTextareaLength === maxLength) {
        return maxLength
      } else {
        return this.tmpSalesIntroduceContent.length === this.inputContentTextareaLength ? maxLength :
          (this.deviceOS === 'ios' ? maxLength + (2 * newlineLength) : maxLength + (1 * newlineLength))
      }
    },
    inputContentTextareaLength () {
      return this.tmpSalesIntroduceContent.replace(this.regxNewline, '').length
    }
  },
  watch: {
    awardSelectedList (value) {
      console.log("awardSelectedList", value);
    },
  },
  methods: {
    inputCheckAward (e) {
      this.awardList[parseInt(e.target.dataset.idx)].awardCareer = String(
        e.target.value
      ).slice(0, e.target.maxLength);

      if (
        this.awardList[parseInt(e.target.dataset.idx)].awardCareer.length ==
        0 ||
        this.awardList[parseInt(e.target.dataset.idx)].awardCareer.is
      ) {
        this.onClickAward(this.awardList[parseInt(e.target.dataset.idx)]);
      }
    },
    init () {
      const that = this;
      this.awardList = this._.reduce(
        this.$store.state.awardList,
        function (result, data) {
          var tmpTitle = data.awardCareer;
          data.key = that.uuidv4();
          data.awardCareer = tmpTitle ? data.awardCareer : "";
          that.$set(data, "isFocus", false);
          result.push(data);
          return result;
        },
        []
      );
      this.$set(
        this,
        "awardSelectedList",
        this._.chain(this.awardList)
          .orderBy(["sortIndex"], ["asc"])
          .filter(["stateUse", true])
          .value()
      );
    },
    uuidv4 () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    onClickAwardReset () {
      const that = this;

      this.$api
        .getHistoryAwardToExcel()
        .then(function (data) {
          that.$store.commit("setAwardList", data.awardList);
          that.init();
          setTimeout(() => {
            that.awardList.forEach((award) => {
              that.onClickAward(award);
            });
            that.$set(
              that,
              "awardSelectedList",
              that._.chain(that.awardList)
                .orderBy(["sortIndex"], ["asc"])
                .filter(["stateUse", true])
                .value()
            );
          }, 300);
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    onClickSave () {
      console.log(
        "asdasd",
        this.saveAwardSelectedList.map(function (data) {
          return String(data.isSelected);
        })
      );
      if (
        this.salesRegion.length == 0 ||
        this.tmpSalesIntroduceTitle.length == 0 ||
        this.tmpSalesIntroduceContent.length == 0
      ) {
        alert("이력 저장이 불가합니다.\n내용을 입력해주세요.");
        return;
      }
      if (
        this._.filter(this.saveAwardSelectedList, { isSelected: true })
          .length == 0
      ) {
        alert(
          "이력 사항을 1개 이상\n필수로 선택해주세요.\n(최대 4개 선택 가능)"
        );
        return;
      }

      const that = this;
      this.$api
        .updateHistory(
          this.salesRegion,
          this.tmpSalesIntroduceTitle,
          this.tmpSalesIntroduceContent,
          this.saveAwardSelectedList.map(function (data) {
            return data.title;
          }),
          this.saveAwardSelectedList.map(function (data) {
            return String(data.isSelected);
          }),
          this._.chain(this.saveAwardSelectedList)
            .map("orderIdx")
            .map(function (data) {
              return String(data);
            })
            .value()
        )
        .then(function (data) {
          if (data.success) {
            alert("수정 되었습니다.");
            that.$router.push({ name: "MainMyHistory" })
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    deleteAward (key) {
      var findIdx01 = this._.findIndex(this.awardList, { key: key });
      if (findIdx01 >= 0) {
        this.awardList.splice(findIdx01, 1);
      }

      var findIdx02 = this._.findIndex(this.awardSelectedList, { key: key });
      if (findIdx02 >= 0) {
        this.awardSelectedList.splice(findIdx02, 1);
      }
    },
    onClickAward (award) {
      if (award.awardCareer.length == 0) {
        alert("입력된 내용이 없습니다.\n내용 입력 후 순서를\n선택해주세요.");
        return;
      }
      var findIdx = this._.findIndex(this.awardSelectedList, {
        key: award.key,
      });
      if (findIdx < 0) {
        if (this.awardSelectedList.length > 3) {
          alert("최대 4개까지 선택 할 수 있습니다.");

          return;
        }
        this.awardSelectedList.push(award);
      } else {
        this.awardSelectedList.splice(findIdx, 1);
      }
    },
    onClickAddAward () {
      if (this.awardList.length > 9) {
        alert("기존 이력 포함 10개 까지만 생성 할 수 있습니다.");
        return;
      }
      this.awardList.push({
        key: this.uuidv4(),
        isFocus: false,
        awardCareer: "",
        sortIndex: -1,
        stateUse: false,
      });
    },
    blurSalesIntroduceTitle () {
      var textArr = this.tmpSalesIntroduceTitle.split("\n");
      if (textArr.length >= 3) {
        textArr = textArr.slice(0, 2);
        alert("2줄 이상 입력 하실수 없습니다.");
        this.$refs.salesIntroduceTitle.focus();
      }
      this.tmpSalesIntroduceTitle = textArr.join("\n");
      this.toggleInputDeleteBtn("isShowDeleteBtnSalesIntroduceTitle", false);
    },
    toggleInputDeleteBtn (thisKey, toggleValue) {
      const that = this;
      setTimeout(function () {
        that[thisKey] = toggleValue;
      }, 50);
    },
    toggleInputListDeleteBtn (award, toggleValue) {
      setTimeout(function () {
        award.isFocus = toggleValue;
      }, 50);
    },
    onInputTitleTextarea (e) {
      this.tmpSalesIntroduceTitle = e.target.value;
    },
    onInputContentTextarea (e) {
      this.tmpSalesIntroduceContent = e.target.value;
    },
    onKeyupEnterTitleTextarea () {
      var textArr = this.tmpSalesIntroduceTitle.split("\n");

      if (textArr.length >= 3) {
        textArr = textArr.slice(0, 2);
      }

      this.tmpSalesIntroduceTitle = textArr.join("\n");
    },
    onClickCancel () {
      this.$router.push({ name: "MainMyHistory" })
    }
  },
};
</script>
<style scoped>
.checkArea {
  position: absolute;
  width: 35px;
  height: 100%;
  left: 0;
  top: 0;
}
.noTitle .item {
  box-shadow: inset 0px 0px 0px 1px #00c2ff;
  /* 957C56 */
}
.text-delete {
  position: absolute;
  right: 30px;
  top: 20px;
  width: 30px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-image: url(../assets/images/btn_x.png);
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
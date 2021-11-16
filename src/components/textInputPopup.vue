<template>
  <div class="text-wrap" :class="`${mode}`">
    <div class="text-contain">
      <div class="topbar">
        <p class="back" @click="onClickCancle">취소</p>
        <p class="confirm" @click="onClickSave">완료</p>
      </div>
      <div
        class="text-box"
        :class="{
          'design-type-d-title':
            designType == 'DESIGN_TYPE_D' && mode == 'TITLE',
          'title-a': designType == 'DESIGN_TYPE_A' && mode == 'TITLE',
          'title-b': designType == 'DESIGN_TYPE_B' && mode == 'TITLE',
          'title-c': designType == 'DESIGN_TYPE_C' && mode == 'TITLE',
          'title-d': designType == 'DESIGN_TYPE_D' && mode == 'TITLE',
          'contents-a': designType == 'DESIGN_TYPE_A' && mode == 'CONTENT',
          'contents-b': designType == 'DESIGN_TYPE_B' && mode == 'CONTENT',
          'contents-c': designType == 'DESIGN_TYPE_C' && mode == 'CONTENT',
          'contents-d': designType == 'DESIGN_TYPE_D' && mode == 'CONTENT',
          'design-type-d-content':
            designType == 'DESIGN_TYPE_D' && mode == 'CONTENT',
        }"
      >
        <button @click="resetText">내용 지우기</button>
        <div
          class="placeholder"
          :class="{
            placeholdertitle: mode == 'TITLE',
            placeholdercontents: mode == 'CONTENT',
          }"
          v-if="placeholderToggle"
          v-html="PlaceholderText"
        >
          예시)고객의 성공이<br />
          곧 나의 성공입니다.
        </div>
        <textarea
          ref="textarea"
          id="textarea"
          v-on:input="onInputTextarea"
          v-model="text"
          :rows="textEnterLength"
          :maxlength="maxLengthTextarea"
          @keyup.enter="onKeyupEnter"
        >
        </textarea>
        <p class="textlength">
          {{ inputTextareaLength }}<span>/{{ textTotalLength }}</span>
        </p>
        <p class="desc">
          *최대 {{ textTotalLength }}자 {{ textEnterLength }}줄까지 가능합니다.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    mode: { type: String, default: "" },
    //가로 글자 수
    textWidthLength: { type: Number, default: 9 },
    //줄 수
    textEnterLength: { type: Number, default: 2 },
    //총 글자 수
    textTotalLength: { type: Number, default: 18 },

    realText: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    designType: { type: String, default: "" },
  },
  data() {
    return {
      text: "행복하자!!",
      placeholderImage: "",
      PlaceholderText: "",
      textLength: 0,
      regxNewline: /(\r\n\t|\n|\r\t|\r\n|\n\r)/gm,
      deviceOS: "",
      maxNewline: 2,
    };
  },
  created() {
    this.deviceOS = this.$store.state.deviceOS;
    this.text = this.realText;
    this.textLength = this.text.length;
    this.maxNewline =
      this.designType === "DESIGN_TYPE_D" ? (this.mode === "TITLE" ? 3 : 6) : 2;

    if (this.designType == "DESIGN_TYPE_D") {
      this.PlaceholderText =
        this.mode == "TITLE"
          ? "예시)고객의<br>성공이 곧 나의<br>성공입니다."
          : "예시) 7번째 대상 수상을<br>받게되어 어느 해보다<br>감회가 새롭습니다.<br>평생 든든 서비스를<br>바탕으로 세대를 이어<br>계속 나가겠습니다";
    } else {
      this.PlaceholderText =
        this.mode == "TITLE"
          ? "예시)고객의 성공이<br> 곧 나의 성공입니다."
          : "예시) 7번째 대상 수상을 받게되어 어느 해보다 감회가 새롭습니다. <br> 평생 든든 서비스를 바탕으로 세대를 이어 나가겠습니다";
    }

    console.log(this.designType, this.mode);
  },
  computed: {
    textArea() {
      return this.$refs.textarea;
    },
    placeholderToggle() {
      return this.text.length == 0;
    },
    maxLengthTextarea() {
      // 안드로이드는 개행문자가 \n 으로 들어가는데 IOS는 \n\r 으로 들어가서 2자리가 되서 수정하였습니다.
      return this.text.length === this.inputTextareaLength
        ? this.textTotalLength
        : this.deviceOS === "ios"
        ? this.textTotalLength + 2
        : this.textTotalLength + 1;
    },
    inputTextareaLength() {
      return this.text.replace(this.regxNewline, "").length;
    },
  },
  mounted() {},
  methods: {
    onInputTextarea: function (e) {
      this.text = e.target.value;
    },
    onClickCancle() {
      this.$emit("close");
    },
    onClickSave() {
      this.$emit("save", this.text);
    },
    resetText() {
      this.text = "";
    },
    onKeyupEnter() {
      var textArr = this.text.split("\n");

      if (textArr.length >= this.maxNewline + 1) {
        textArr = textArr.slice(0, this.maxNewline);
      }

      this.text = textArr.join("\n");
    },
  },
};
</script>
<style scoped>
</style>
<template>
  <v-group>
    <v-rect :config="rectOptions" ref="rect"></v-rect>
    <v-image :config="iconOption"></v-image>
  </v-group>
</template>
<script>
export default {
  data() {
    return {
      iconOption: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      iconSize: 12,
      correctPositionGap: 5,
    };
  },
  props: {
    isShowEditTxtGuide: { type: Boolean, default: false },
    editTxtGuideOption: { type: Object },
    defaultOption: { type: Object },
    designType: { type: String },
  },
  computed: {
    rect() {
      return this.$refs.rect.getNode();
    },
    rectOptions() {
      return {
        width:
          this.editTxtGuideOption && this.editTxtGuideOption.width
            ? this.editTxtGuideOption.width +
              this.iconSize +
              this.correctPositionGap +
              3
            : 0,
        height:
          this.editTxtGuideOption && this.editTxtGuideOption.height
            ? this.editTxtGuideOption.height
            : 0,
        x:
          this.editTxtGuideOption &&
          this.editTxtGuideOption.x !== null &&
          this.isShowEditTxtGuide
            ? this.editTxtGuideOption.x - this.correctPositionGap
            : 99999,
        y:
          this.editTxtGuideOption && this.editTxtGuideOption.y
            ? this.editTxtGuideOption.y
            : 0,
        fill: "rgba(0,0,0,0)",
        stroke: "#00C2FF",
        strokeWidth: 1,
        cornerRadius: 5,
      };
    },
  },
  watch: {
    rectOptions() {
      this.initIconImage();
    },
  },
  created() {
    if (this.designType == "DESIGN_TYPE_D") {
      this.titlelineMaxLength = 9;
    }
  },
  mounted() {
    const that = this;
    setTimeout(function () {
      that.initIconImage();
    }, 500);
  },
  methods: {
    initIconImage() {
      const that = this;
      var icoEditImage = new window.Image();
      icoEditImage.src = "./images/ico-edit.png";
      icoEditImage.onload = function () {
        that.iconOption.image = icoEditImage;
        that.iconOption.x =
          that.rectOptions.x + that.rectOptions.width - that.iconSize - 3;
        that.iconOption.y =
          that.rectOptions.y + that.rectOptions.height - that.iconSize - 3;
        that.iconOption.width = that.iconSize;
        that.iconOption.height = that.iconSize;
      };
    },
  },
};
</script>
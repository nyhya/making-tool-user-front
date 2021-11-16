<template>
  <div class="crop-image-background" :class="{ testMode: testMode }">
    <div class="cavas-wrap">
      <div class="layout">
        <div class="layout-wrap">
          <v-stage :config="stageInfo" ref="stage">
            <v-layer ref="layer">
              <v-rect :config="rectOptions" />
              <v-group :config="groupOptions" ref="group">
                <v-image :config="imageOptions" ref="cropImage" />
              </v-group>
              <DesignGuide02
                v-if="designType == SELECT_DESIGN_TYPE_LIST[1].designType"
              />
              <DesignGuide03
                v-if="designType == SELECT_DESIGN_TYPE_LIST[2].designType"
              />
              <DesignGuide04
                v-if="designType == SELECT_DESIGN_TYPE_LIST[3].designType"
              />
            </v-layer>
          </v-stage>
        </div>
      </div>
    </div>
    <div class="rotation-btn-area">
      <div class="rotationbtn" @click="onClickRotationLeft">
        <button class="rotationLeftImage"></button>
      </div>
      <div class="rotationbtn" @click="onClickRotationRight">
        <button class="rotationRightImage"></button>
      </div>
    </div>
    <div v-if="testMode" class="testLogText">{{ testLogText }}</div>
    <div v-if="guideImageShow" class="guide-alert-area">
      <div class="alert">
        <div class="image-guide"></div>
        <div class="btn-off" @click="onClickOff">닫기</div>
      </div>
    </div>
  </div>
</template>
<script>
import Konva from "konva";
import * as Hammer from "@/jsLib/hammer-konva.js";
import * as TouchEmulator from "hammer-touchemulator";
import DesignGuide02 from "./DesignGuide02.vue";
import DesignGuide03 from "./DesignGuide03.vue";
import DesignGuide04 from "./DesignGuide04.vue";
import * as DesignElement from "@/constant/DesignElement.js";
import Constant from "@/constant/Constant.js";

const windowWidth = DesignElement.COMMON_LAYOUT.WINDOW_WIDTH;
const windowHeight = DesignElement.COMMON_LAYOUT.WINDOW_HEIGHT;

export default {
  name: "CropImageBackground",
  components: {
    DesignGuide02,
    DesignGuide03,
    DesignGuide04,
  },
  props: {
    designType: { type: String, default: "" },
    userImageBackgroundPath: { type: String, default: "" },
  },
  created() {
    TouchEmulator();
    // 중복된 이벤트를 실행 하기 위한 설정
    Konva.hitOnDragEnabled = true;
    Konva.captureTouchEventsEnabled = true;

    this.init();
  },
  computed: {
    stage() {
      return this.$refs.stage.getNode();
    },
    layer() {
      return this.$refs.layer.getNode();
    },
    group() {
      return this.$refs.group.getNode();
    },
    cropImage() {
      return this.$refs.cropImage.getNode();
    },
    SELECT_DESIGN_TYPE_LIST() {
      return Constant.SELECT_DESIGN_TYPE_LIST;
    },
  },
  mounted() {
    var hammertime = new Hammer(this.group, { domEvents: true });
    // add rotate gesture
    hammertime.get("rotate").set({ enable: true });
    hammertime.get("tap").set({ enable: true });

    this.group.on("touchmove", this.touchmove);
    this.group.on("touchend", this.touchend);
    this.updateInfo();
  },
  data() {
    return {
      stageInfo: {
        width: windowWidth,
        height: windowHeight,
      },
      groupOptions: {
        x: windowWidth / 2,
        y: windowHeight / 2,
        width: windowWidth,
        height: windowHeight,
        draggable: true,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
      },
      imageOptions: {
        name: "BackgroundCropImage",
        image: null,
        width: windowWidth,
        height: windowHeight,
        offsetX: windowWidth / 2,
        offsetY: windowHeight / 2,
        crop: null,
      },
      rectOptions: {
        x: 0,
        y: 0,
        width: windowWidth,
        height: windowHeight,
        fill: "#000",
      },
      profileMode: false,
      testLogText: "",
      lastCenter: null,
      lastDist: 0,
      oldEventRotation: 0,
      oldRotation: 0,
      startScale: 0,
      cropImageBackground: {},
      testMode: false,
      guideImageShow: true,
    };
  },
  methods: {
    init() {
      if (
        process.env.NODE_ENV === "development" ||
        process.env.NODE_ENV === "local"
      ) {
        // 좌표값 안맞을시 사용하기 위한 테스트 모드
        // this.testMode = true;
      }
      if (this.userImageBackgroundPath.length > 0) {
        const that = this;
        const backgroundImg = new window.Image();
        backgroundImg.crossOrigin = "Anonymous";
        backgroundImg.src = this.userImageBackgroundPath;
        backgroundImg.onload = function () {
          that.imageOptions.image = backgroundImg;

          that.imageOptions.width = backgroundImg.width;
          that.imageOptions.height = backgroundImg.height;
          that.imageOptions.offsetX = backgroundImg.width / 2;
          that.imageOptions.offsetY = backgroundImg.height / 2;
        };
      }
    },
    onClickOff() {
      this.guideImageShow = false;
    },
    updateInfo() {
      var attrs = this.group.attrs;

      this.$set(
        this,
        "testLogText",
        [
          "x: " + parseInt(attrs.x - attrs.width / 2),
          "y: " + parseInt(attrs.y - attrs.height / 2),
          "groupOptions.rotation: " + this.groupOptions.rotation,
          "rotation: " + attrs.rotation,
          "originWidth: " + attrs.width,
          "originHeight: " + attrs.height,
          "scaleWidth: " + attrs.width * attrs.scaleX,
          "scaleHeight: " + attrs.height * attrs.scaleY,
          "scaleX: " + attrs.scaleX,
          "scaleY: " + attrs.scaleY,
        ].join("\n")
      );
      this.$set(this, "cropImageBackground", {
        state: this.testMode ? "init" : "crop",
        x: attrs.x - attrs.width / 2,
        y: attrs.y - attrs.height / 2,
        rotation: this.groupOptions.rotation,
        originWidth: attrs.width,
        originHeight: attrs.height,
        scaleWidth: attrs.width * attrs.scaleX,
        scaleHeight: attrs.height * attrs.scaleY,
        scaleX: attrs.scaleX,
        scaleY: attrs.scaleY,
      });
    },

    saveInfo(callback) {
      this.updateInfo();
      const that = this;
      setTimeout(function () {
        that.$store.commit(
          "addPathCropImageBackground",
          that.cropImageBackground
        );
        that.$emit("initBackgroundImage");
        callback();
      }, 250);
    },
    touchmove(e) {
      var touch1 = e.evt.touches[0];
      var touch2 = e.evt.touches[1];

      // 멀티 터치인 경우
      if (touch1 && touch2) {
        if (this.group.isDragging()) {
          this.group.stopDrag();
        }

        var p1 = {
          x: touch1.clientX,
          y: touch1.clientY,
        };
        var p2 = {
          x: touch2.clientX,
          y: touch2.clientY,
        };

        if (!this.lastCenter) {
          this.lastCenter = this.getCenter(p1, p2);
          return;
        }
        var newCenter = this.getCenter(p1, p2);

        var dist = this.getDistance(p1, p2);

        if (!this.lastDist) {
          this.lastDist = dist;
        }

        var scale = this.group.scaleX() * (dist / this.lastDist);

        var dx = newCenter.x - this.lastCenter.x;
        var dy = newCenter.y - this.lastCenter.y;
        var pointTo = {
          x: (newCenter.x - this.group.x()) / this.group.scaleX(),
          y: (newCenter.y - this.group.y()) / this.group.scaleX(),
        };
        var newPos = {
          x: newCenter.x - pointTo.x * scale + dx,
          y: newCenter.y - pointTo.y * scale + dy,
        };

        this.group.scaleX(scale);
        this.group.scaleY(scale);
        this.group.position(newPos);
        this.layer.batchDraw();

        this.lastDist = dist;
        this.lastCenter = newCenter;
      }
    },
    touchend() {
      this.lastDist = 0;
      this.lastCenter = null;
      this.updateInfo();
      if (this.testMode) {
        this.saveInfo();
      }
    },
    getDistance(p1, p2) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    },
    getCenter(p1, p2) {
      return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
      };
    },
    onClickRotationLeft() {
      this.$set(this.groupOptions, "rotation", this.groupOptions.rotation + 90);
      this.updateInfo();
    },
    onClickRotationRight() {
      this.$set(this.groupOptions, "rotation", this.groupOptions.rotation - 90);
      this.updateInfo();
    },
  },
};
</script>

<style scoped>
.crop-image-background {
  position: absolute;
  top: 43px;
  left: 0px;
  width: 100%;
  height: calc(100% - 43px);
}
.cavas-wrap {
  left: 0;
  top: 0;
  height: calc(100% - 70px);
  /* 이미지 경로를 도대체 왜???? => background-image: url(/img/profileEdit-background.76a8510d.png);*/
  background-image: url(../assets/images/profileEdit-background.png);
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transform: translate(0%, 0%);
  z-index: 2000;
}
.testLogText {
  position: absolute;
  width: 50%;
  height: 30%;
  left: 25%;
  bottom: 0px;
  background-color: rgba(255, 0, 0, 0.5);
  color: #fff;
  white-space: pre;
  z-index: 3000;
}
.testMode .cavas-wrap {
  background: none;
  height: auto;
  position: absolute;
  top: 50%;
}
.testMode .rotation-btn-area {
  z-index: 4000;
}
</style>
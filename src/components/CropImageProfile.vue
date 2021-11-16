<template>
  <div class="crop-image-profile" :class="{ testMode: testMode }">
    <div class="cavas-wrap">
      <div class="layout">
        <div class="layout-wrap">
          <v-stage :config="configKonva" ref="stage">
            <v-layer ref="layer">
              <v-group :config="groupOptions" ref="group">
                <v-image :config="imageOptions" ref="cropImage" />
              </v-group>
              <ProfileGuide />
            </v-layer>
          </v-stage>
          <div class="text-guide"></div>
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
  </div>
</template>
<script>
import Konva from "konva";
import * as Hammer from "@/jsLib/hammer-konva.js";
import * as TouchEmulator from "hammer-touchemulator";
import * as DesignElement from "@/constant/DesignElement.js";
import ProfileGuide from "../components/ProfileGuide.vue";

const windowWidth = DesignElement.COMMON_LAYOUT.WINDOW_WIDTH;
const windowHeight = DesignElement.COMMON_LAYOUT.WINDOW_HEIGHT;

export default {
  name: "CropImageProfile",
  components: {
    ProfileGuide,
  },
  props: {
    userImageProfilePath: { type: String, default: "" },
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
      configKonva: {
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
        name: "CropImage",
        image: null,
        width: windowWidth,
        height: windowHeight,
        offsetX: windowWidth / 2,
        offsetY: windowHeight / 2,
        crop: null,
      },
      profileMode: false,
      testLogText: "",
      lastCenter: null,
      lastDist: 0,
      oldEventRotation: 0,
      oldRotation: 0,
      startScale: 0,
      cropImageProfile: {},
      testMode: false,
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
      if (this.userImageProfilePath.length > 0) {
        const that = this;
        const profileImage = new window.Image();
        profileImage.crossOrigin = "Anonymous";
        profileImage.src = this.userImageProfilePath;
        profileImage.onload = function () {
          that.imageOptions.image = profileImage;

          that.imageOptions.width = profileImage.width;
          that.imageOptions.height = profileImage.height;
          that.imageOptions.offsetX = profileImage.width / 2;
          that.imageOptions.offsetY = profileImage.height / 2;
        };
      }
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
      this.$set(this, "cropImageProfile", {
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
        that.$store.commit("addPathCropImageProfile", that.cropImageProfile);
        that.$emit("initProfileImage");
        if (callback) {
          callback();
        }
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
.crop-image-profile {
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
<template>
  <v-circle v-if="isShowProfile" :config="options" />
</template>

<script>
import * as UTIL from "@/utils/Util.js";
import * as DesignElement from "@/constant/DesignElement.js";
import LoadImage from "blueimp-load-image";

const windowWidth = DesignElement.COMMON_LAYOUT.WINDOW_WIDTH;
export default {
  name: "ProfileImage",
  props: {
    designType: { type: String, default: "" },
    userImageProfilePath: { type: String, default: "" },
    isShowProfile: { type: Boolean, default: true },
  },
  created() {
    this.init();
  },
  mounted() {},
  watch: {
    userImageProfilePath() {
      this.initImageDefault();
    },
  },
  data() {
    return {
      options: {
        width: 75,
        height: 75,
        x: 0,
        y: 0,
        fillPatternImage: null,
        fillPatternScale: {
          x: 0,
          y: 0,
        },
        fillPatternOffset: {
          x: 0,
          y: 0,
        },
        fillPatternRepeat: "no-repeat",
        rotation: 0,
        stroke: "#FFFFFF",
        strokeWidth: 0,
      },
      newImageCustom: null,
    };
  },
  methods: {
    resetImageCustom() {
      this.newImageCustom = null;
    },
    init() {
      var storeTemplateData = this.$store.getters.findTemplateDate(
        this.designType
      );

      if (storeTemplateData.length > 0 && storeTemplateData[0]) {
        var templateInfo = storeTemplateData[0];
        this.options.x = templateInfo.salesProfileImageX;
        this.options.y = templateInfo.salesProfileImageY;
        this.options.width = templateInfo.salesProfileImageWidth;
        this.options.height = templateInfo.salesProfileImageHeight;
        this.designType == "DESIGN_TYPE_A"
          ? (this.options.strokeWidth = 1)
          : (this.options.strokeWidth = 0);
      }
      this.userImageProfilePath.length == 0
        ? this.initImageDefault()
        : this.initImageCustom();
    },

    initImageDefault() {
      const that = this;

      const defaultImage = new window.Image();
      defaultImage.crossOrigin = "Anonymous";
      defaultImage.src = DesignElement.PROFILE_OPTION.DEFAULT_IMAGE.path;

      defaultImage.onload = function () {
        var cropInfo = UTIL.getCrop(
          defaultImage,
          {
            width: that.options.width,
            height: that.options.height,
          },
          "center-middle"
        );

        var scale = that.options.width / cropInfo.width;
        that.options.fillPatternImage = defaultImage;
        that.options.fillPatternScale = {
          x: scale,
          y: scale,
        };
        that.options.fillPatternOffset = {
          x: that.options.width / 2 + cropInfo.x * scale,
          y: that.options.height / 2 + cropInfo.y * scale,
        };
      };
    },

    initImageCustom() {
      console.log("initImageCustom", this.newImageCustom == null);
      if (this.newImageCustom == null) {
        LoadImage(this.userImageProfilePath, this.loadImageCustom, {
          canvas: true,
          meta: true,
          orientation: 0,
        });
      } else {
        this.updateImageCustomPosition("initImageCustom");
      }
    },
    loadImageCustom(image, data) {
      console.log("loadImageCustom", data);
      const that = this;
      if (data.imageHead) {
        if (data.exif) {
          LoadImage.writeExifData(data.imageHead, data, "Orientation", 1);
        }
        image.toBlob(function (blob) {
          console.log("!!!!", blob);
          if (!blob) {
            return;
          }
          var type = blob.type;
          var rotateFile = new File([blob], "blobName", { type: type });
          var reader = new FileReader();
          reader.onload = function (e) {
            that.newImageCustom = new window.Image();
            that.newImageCustom.crossOrigin = "Anonymous";
            that.newImageCustom.src = e.target.result;

            that.newImageCustom.onload = function () {
              that.updateImageCustomPosition("loadImageCustom onload OK");
            };
          };
          reader.readAsDataURL(rotateFile);
        }, "image/jpeg");
      } else {
        that.newImageCustom = new window.Image();
        that.newImageCustom.crossOrigin = "Anonymous";
        that.newImageCustom.src = this.userImageProfilePath;
        that.newImageCustom.onload = function () {
          that.updateImageCustomPosition("loadImageCustom onload ELSE");
        };
      }
    },
    updateImageCustomPosition(testCode) {
      console.log("updateImageCustomPosition", testCode);
      if (this.newImageCustom != null) {
        var cropProfileInfo = this.$store.state.pathCropImageProfile;
        var circleWidthScale = this.options.width / windowWidth;
        var positionXScale = cropProfileInfo.scaleX * circleWidthScale;
        var profileGuideScale = 0.8;
        var offsetPosition = { x: 0, y: 0 };

        this.options.fillPatternImage = this.newImageCustom;
        this.options.rotation = cropProfileInfo.rotation;
        this.options.fillPatternScale = {
          x: (cropProfileInfo.scaleX * circleWidthScale) / profileGuideScale,
          y: (cropProfileInfo.scaleX * circleWidthScale) / profileGuideScale,
        };

        switch (
          parseFloat(
            parseFloat((cropProfileInfo.rotation / 360) % 1).toFixed(3)
          ) * 360
        ) {
          case -90:
          case 270:
          case -270:
            console.log(-cropProfileInfo.x);
            offsetPosition = {
              x:
                (cropProfileInfo.y * circleWidthScale) / profileGuideScale +
                (this.newImageCustom.width * positionXScale) /
                  2 /
                  profileGuideScale,
              y:
                (-cropProfileInfo.x * circleWidthScale) / profileGuideScale +
                (this.newImageCustom.height * positionXScale) /
                  2 /
                  profileGuideScale,
            };
            break;
          case -180:
          case 180:
            offsetPosition = {
              x:
                (cropProfileInfo.x * circleWidthScale) / profileGuideScale +
                (this.newImageCustom.width * positionXScale) /
                  2 /
                  profileGuideScale,
              y:
                (cropProfileInfo.y * circleWidthScale) / profileGuideScale +
                (this.newImageCustom.height * positionXScale) /
                  2 /
                  profileGuideScale,
            };
            break;
          case 90:
            offsetPosition = {
              x:
                (-cropProfileInfo.y * circleWidthScale) / profileGuideScale +
                (this.newImageCustom.width * positionXScale) /
                  2 /
                  profileGuideScale,
              y:
                (cropProfileInfo.x * circleWidthScale) / profileGuideScale +
                (this.newImageCustom.height * positionXScale) /
                  2 /
                  profileGuideScale,
            };
            break;
          default:
            offsetPosition = {
              x:
                (-cropProfileInfo.x * circleWidthScale) / profileGuideScale +
                (this.newImageCustom.width * positionXScale) /
                  2 /
                  profileGuideScale,
              y:
                (-cropProfileInfo.y * circleWidthScale) / profileGuideScale +
                (this.newImageCustom.height * positionXScale) /
                  2 /
                  profileGuideScale,
            };
            break;
        }
        console.log(
          "offsetPosition",
          cropProfileInfo.rotation,
          String(offsetPosition.x),
          String(offsetPosition.y)
        );
        this.options.fillPatternOffset = offsetPosition;
      } else {
        console.log("newImageCustom 없음", testCode);
      }
    },
  },
};
</script>
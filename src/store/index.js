import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deviceOS: '',
    showLoading: false,
    // 디자인 타입의 UI 대한(크기, 좌표, 색상...) 기본 옵션 값만 셋팅 되어있는 변수(데이타는 없음~~~!!!!!)
    defaultTemplateOptions: [],
    // editMode: false,
    pathCropImageProfile: {
      state: "init",
      x: 0,
      y: 0,
      rotation: 0,
      originWidth: 0,
      originHeight: 0,
      scaleWidth: 0,
      scaleHeight: 0,
      scaleX: 1,
      scaleY: 1,
    },
    pathCropImageBackground: {
      state: "init",
      x: 0,
      y: 0,
      rotation: 0,
      originWidth: 0,
      originHeight: 0,
      scaleWidth: 0,
      scaleHeight: 0,
      scaleX: 1,
      scaleY: 1,
    },
    currentMainPageNum: 1,

    userInfo: {
      pointName: "강북",
      mottoTitle: "",
      mottoDesc: ""
    },
    awardList: [],
    showConfirm: false,
    showConfirmParam: {},
    showConfirmText: "",
    showIntroGuidePopup: true,
  },
  mutations: {
    setShowLoading (state, value) {
      state.showLoading = value;
    },
    initPathCropImageProfile (state) {
      state.pathCropImageProfile = {
        state: "init",
        x: 0,
        y: 0,
        rotation: 0,
        originWidth: 0,
        originHeight: 0,
        scaleWidth: 0,
        scaleHeight: 0,
        scaleX: 1,
        scaleY: 1,
      }
    },
    initPathCropImageBackground (state) {
      state.pathCropImageBackground = {
        state: "init",
        x: 0,
        y: 0,
        rotation: 0,
        originWidth: 0,
        originHeight: 0,
        scaleWidth: 0,
        scaleHeight: 0,
        scaleX: 1,
        scaleY: 1,
      }
    },
    /** 
     * addDefaultTemplateOptions
     * @description 데이타 세팅
     */
    addDefaultTemplateOptions (state, value) {
      state.defaultTemplateOptions.push(value);
    },

    addPathCropImageProfile (state, value) {
      state.pathCropImageProfile = value;
    },
    addPathCropImageBackground (state, value) {
      state.pathCropImageBackground = value;
    },
    /**
     * @function setUserInfo
     * @description 사용자 이력 정보(남기고싶은말의 제목, 내용) 저장
     */
    setUserInfo (state, data) {
      state.userInfo = Object.assign(state.userInfo, data)
    },
    /**
     * @function setUserInfo
     * @description 사용자 이력 정보(수상내역) 저장
     */
    setAwardList (state, data) {
      state.awardList = data;
    },
    setShowConfirm (state, data) {
      console.log(data)
      state.showConfirmText = data.text;
      state.showConfirm = data.value;
      state.showConfirmParam = data.param;
    },
    setIntroGuidePopupShow (state, value) {
      state.showIntroGuidePopup = value;
    },
    setDeviceOS (state, value) {
      state.deviceOS = value
    }
  },
  getters: {
    /** 
    * findTemplateDate
    * @description 템플릿 키를 받아서 같은 값의 테이타를 반환
    * @param {Number} 페이지 번호
    */
    findTemplateDate (state) {
      return function (key) {
        return state.defaultTemplateOptions.filter(
          function (d) {
            return d.key == key;
          });
      }
    },

    cdnPath () {
      return process.env.VUE_APP_CDN;
    },
    getIntroGuidePopupShow (state) {
      return state.showIntroGuidePopup;
    }
  },
  actions: {
  },
  modules: {
  }
})

import router from '../router/index'
import store from '../store/index'
import axios from 'axios'
import StorageUtils from '@/utils/storage-utils'

/**
 * Eda Http 플러그인
 * 
 * @method install
 */
const EdaHttp = {
    install(Vue) {
        let customAxios = axios.create({
            timeout: 90 * 1000
        })

        /**
         * 전달받은 Response의 Head, Body를 검사하는 함수
         * 
         * @method response
         * @param {Object} res Response 객체
         * @return {Object} result Promise 정보
         */
        let response = function (res) {
            return new Promise(function (resolve, reject) {
                if (process.env.NODE_ENV === 'local') {
                    console.log('Response Data: ', res)
                }

                let responseData = res.data

                if (!responseData.success) {
                    alert(responseData.errMsg)
                    reject(new Error(responseData.errMsg))
                } else {
                    // Vue.notify({
                    //     type: 'success',
                    //     title: '확인',
                    //     text: '서버와 통신에 성공 하였습니다.'
                    // })
                    resolve(responseData)
                }
            })
        }

        /**
         * AXIOS로 통신하는 함수
         * 
         * @param {String} paramUrl 전송 할 URL
         * @param {String} paramMethod 전송 할 메소드 타입(GET, POST, PUT, DELETE)
         * @param {Object} params 전송 할 파라미터
         * @param {Object} headers 헤더 정보
         * @return {Object} result Promise 정보
         */
        // return EdaConnect('/login', 'POST', formData);
        let EdaConnect = function (paramUrl, paramMethod, params = {}, headers = {}) {
            return new Promise(function (resolve, reject) {
                store.commit('setShowLoading', true)

                headers['token'] = StorageUtils.getToken()

                if (headers['token'] === null) delete headers['token']

                customAxios({
                    method: paramMethod,
                    url: `${process.env.VUE_APP_API_URL}${paramUrl}`,
                    data: params,
                    headers: headers
                })
                    .then(res => response(res))
                    .then(bodyData => {
                        store.commit('setShowLoading', false)
                        resolve(bodyData)
                    })
                    .catch(error => {
                        reject(new Error(error))

                        store.commit('setShowLoading', false)

                        let errorMsg = error

                        if (error.response !== undefined && error.response.status === 400) {
                            errorMsg = error.response.data.errMsg
                        } else if (error.response !== undefined && error.response.status === 401) {
                            errorMsg = '사용자 토큰이 만료되었거나 접근 권한이 존재하지 않습니다. 로그인 후 다시 시도해 주시기 바랍니다.'
                            router.push({ path: '/' })
                        }
                        console.error("EdaHttp", errorMsg)
                    })
            })
        }

        /**
         * AXIOS로 통신하는 함수
         * 
         * @param {String} paramUrl 전송 할 URL
         * @param {String} paramMethod 전송 할 메소드 타입(GET, POST, PUT, DELETE)
         * @param {Object} params 전송 할 파라미터
         * @param {Object} headers 헤더 정보
         * @param {String} fileName 파일명
         * @return {Object} result Promise 정보
         */
        let EdaFileDownload = function (paramUrl, paramMethod, params = {}, headers = {}, fileName) {
            return new Promise(function (resolve, reject) {
                store.commit('setShowLoading', true)

                headers['token'] = StorageUtils.getToken()

                if (headers['token'] === null) delete headers['token']

                customAxios({
                    method: paramMethod,
                    url: `${process.env.VUE_APP_API_URL}${paramUrl}`,
                    data: params,
                    headers: headers,
                    responseType: 'blob'
                })
                    .then(res => {
                        store.commit('setShowLoading', false)
                        const url = window.URL.createObjectURL(new Blob([res.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `${fileName}`); //or any other extension
                        document.body.appendChild(link);
                        link.click();
                        resolve({})
                    })
                    .catch(error => {
                        reject(new Error(error))

                        store.commit('setShowLoading', false)

                        let errorMsg = error

                        if (error.response !== undefined && error.response.status === 400) {
                            errorMsg = error.response.data.errMsg
                        } else if (error.response !== undefined && error.response.status === 401) {
                            errorMsg = '사용자 토큰이 만료되었거나 접근 권한이 존재하지 않습니다. 로그인 후 다시 시도해 주시기 바랍니다.'
                            router.push({ path: '/' })
                        }
                        console.error("EdaHttp", errorMsg)
                    })
            })
        }
        //전역으로 axios를 사용하기 위해서 Vue.prototype.$axios
        Vue.prototype.$api = {
            login: function (id) {
                const formData = new FormData();
                formData.append('id', id);

                return EdaConnect('/login', 'POST', formData);
            },
            getHistory: function () {
                const formData = new FormData();

                return EdaConnect('/history', 'GET', formData);
            },
            getHistoryAwardToExcel: function () {
                const formData = new FormData();

                return EdaConnect('/history/award-to-excel', 'GET', formData);
            },
            updateHistory: function (pointName = '', mottoTitle = '', mottoDesc = '', awardCareer = [], stateUse = [], sortIndex = []) {
                const formData = new FormData();
                formData.append('pointName', pointName);
                formData.append('mottoTitle', mottoTitle);
                formData.append('mottoDesc', mottoDesc);
                formData.append('awardCareer', awardCareer);
                formData.append('stateUse', stateUse);
                formData.append('sortIndex', sortIndex);

                return EdaConnect('/history', 'PUT', formData);
            },
            getProfileList: function () {
                const formData = new FormData();

                return EdaConnect('/prcard', 'GET', formData);
            },
            getProfileCount: function () {
                const formData = new FormData();

                return EdaConnect('/prcard/getPRCardCount', 'GET', formData);
            },
            getProfileCreateInfo: function () {
                const formData = new FormData();

                return EdaConnect('/prcard/create', 'GET', formData);
            },
            getProfileEditInfo: function (seq) {
                const formData = new FormData();

                return EdaConnect('/prcard/modify/' + seq, 'GET', formData);
            },

            deleteProfile: function (seqList = []) {
                const formData = new FormData();
                formData.append('seq', seqList);

                return EdaConnect('/prcard', 'PUT', formData);
            },
            createProfile: function (userProfilePicImgFile, skinImgFile, prImageFile, pointName, designType, skinType, mottoTitle, mottoDesc, stateUserProfilePicImg, awardCareer, stateAwardImg, canvasMeta) {
                const formData = new FormData();

                if (userProfilePicImgFile != null) {
                    formData.append('userProfilePicImgFile', userProfilePicImgFile);
                }
                if (skinImgFile != null) {
                    formData.append('skinImgFile', skinImgFile);
                }
                if (prImageFile != null) {
                    formData.append('prImageFile', prImageFile);
                }
                formData.append('pointName', pointName);
                formData.append('designType', String(designType));
                formData.append('skinType', String(skinType));
                formData.append('mottoTitle', mottoTitle);
                formData.append('mottoDesc', mottoDesc);
                formData.append('stateUserProfilePicImg', stateUserProfilePicImg);
                formData.append('awardCareer', awardCareer);
                formData.append('stateAwardImg', stateAwardImg);
                formData.append('canvasMeta', canvasMeta);
                return EdaConnect('/prcard/create', 'POST', formData);
            },
            editProfile: function (seq, userProfilePicImgFile, skinImgFile, prImageFile, pointName, designType, skinType, mottoTitle, mottoDesc, stateUserProfilePicImg, awardCareer, stateAwardImg, canvasMeta) {
                const formData = new FormData();

                if (userProfilePicImgFile != null) {
                    formData.append('userProfilePicImgFile', userProfilePicImgFile);
                }
                if (skinImgFile != null) {
                    formData.append('skinImgFile', skinImgFile);
                }
                if (prImageFile != null) {
                    formData.append('prImageFile', prImageFile);
                }
                formData.append('pointName', pointName);
                formData.append('designType', String(designType));
                formData.append('skinType', String(skinType));
                formData.append('mottoTitle', mottoTitle);
                formData.append('mottoDesc', mottoDesc);
                formData.append('stateUserProfilePicImg', stateUserProfilePicImg);
                formData.append('awardCareer', awardCareer);
                formData.append('stateAwardImg', stateAwardImg);
                formData.append('canvasMeta', canvasMeta);
                return EdaConnect('/prcard/modify/' + seq, 'POST', formData);
            },
            downloadProfileImage: function (seq, saveFileName, fileExt = 'jpg') {
                const formData = new FormData();
                return EdaFileDownload('/prcard/download-pr-image/' + parseInt(seq) + '/' + String(saveFileName).replace(/ /gi, "_"), 'GET', formData, {}, `${saveFileName}.${fileExt}`);
            },
        }
    }
}

export default EdaHttp


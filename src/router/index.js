import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import EditProfile from '../views/EditProfile.vue';
import Constant from "@/constant/Constant.js";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    redirect: { name: 'MainProfileList' }
  },
  {
    path: '/EditProfile/:selectedDesignType',
    name: 'EditProfile',
    component: EditProfile,
    props: true
  },
  {
    path: '/EditProfile/Edit/:seq',
    name: 'EditProfileEditMode',
    component: EditProfile,
    props: true
  },
  {
    path: '/EditProfile/View/:seq',
    name: 'EditProfilePreViewMode',
    component: EditProfile,
    props: true
  },

  /*
    MAIN: 'MAIN',
    PROFILE_LIST_VIEW: 'PROFILE_LIST_VIEW',
    DESIGN_LIST_VIEW: 'DESIGN_LIST_VIEW',
    MY_HISTORY_VIEW: 'MY_HISTORY_VIEW',
    MY_HISTORY_EDIT: 'MY_HISTORY_EDIT',
    MANAGE_VIEW: 'MANAGE_VIEW',
    MANAGE_EDIT: 'MANAGE_EDIT',
  */
  {
    path: '/MainProfileList',
    name: 'MainProfileList',
    component: Home,
    props: { mainMode: Constant.MAIN_MODE.PROFILE_LIST_VIEW }
  },
  {
    path: '/MainDesignTypeList',
    name: 'MainDesignTypeList',
    component: Home,
    props: { mainMode: Constant.MAIN_MODE.DESIGN_LIST_VIEW }
  },
  {
    path: '/MainMyHistory',
    name: 'MainMyHistory',
    component: Home,
    props: { mainMode: Constant.MAIN_MODE.MY_HISTORY_VIEW }
  },
  {
    path: '/MainMyHistoryEdit',
    name: 'MainMyHistoryEdit',
    component: Home,
    props: { mainMode: Constant.MAIN_MODE.MY_HISTORY_EDIT }
  },
  {
    path: '/MainManageProfile',
    name: 'MainManageProfile',
    component: Home,
    props: { mainMode: Constant.MAIN_MODE.MANAGE_VIEW }
  },

]

const router = new VueRouter({
  routes
})

export default router


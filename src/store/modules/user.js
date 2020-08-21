import { login, loginCard, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { getSystemConfigData } from '@/api/systemSet'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

// const systemSet = {
//   factoryId: '',
//   factoryCode: '',
//   factoryName: '',
//   ftpIp: '',
//   ftpName: '',
//   ftpPass: '',
//   machineCodeMes: Boolean,
//   operationCodeMes: Boolean,
//   operatorCodeMes: Boolean,
//   productCodeMes: Boolean,
//   workUnitCodeMes: Boolean,
//   machineWasteNoJudge: Boolean,
//   productCartNumFirstId: Boolean,
//   productCartNumFirstDate: Boolean,
//   productCartNumFirstCount: Boolean,
//   productSheetWasterNum: Boolean,
//   productQaCodeName: Boolean,
//   productLocalProductName: Boolean

// }

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        resetRouter()
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  loginCard({ commit }, cardId) {
    return new Promise((resolve, reject) => {
      loginCard(cardId.trim()).then(response => {
        resetRouter()
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // const systemSet = {
  //   factoryId: '',
  //   factoryCode: '',
  //   factoryName: '',
  //   ftpIp: '',
  //   ftpName: '',
  //   ftpPass: '',
  //   machineCodeMes: Boolean,
  //   operationCodeMes: Boolean,
  //   operatorCodeMes: Boolean,
  //   productCodeMes: Boolean,
  //   workUnitCodeMes: Boolean,
  //   machineWasteNoJudge: Boolean,
  //   productCartNumFirstId: Boolean,
  //   productCartNumFirstDate: Boolean,
  //   productCartNumFirstCount: Boolean,
  //   productSheetWasterNum: Boolean,
  //   productQaCodeName: Boolean,
  //   productLocalProductName: Boolean

  // }

  // get system config
  getSystemConfig() {
    return new Promise((resolve, reject) => {
      getSystemConfigData().then(response => {
        localStorage.setItem('factoryName', response.systemSet.factoryName)
        localStorage.setItem('machineCodeMes', response.systemSet.machineCodeMes)
        localStorage.setItem('operationCodeMes', response.systemSet.operationCodeMes)
        localStorage.setItem('operatorCodeMes', response.systemSet.operatorCodeMes)
        localStorage.setItem('productCodeMes', response.systemSet.productCodeMes)
        localStorage.setItem('workUnitCodeMes', response.systemSet.workUnitCodeMes)
        localStorage.setItem('machineWasteNoJudge', response.systemSet.machineWasteNoJudge)
        localStorage.setItem('productCartNumFirstId', response.systemSet.productCartNumFirstId)
        localStorage.setItem('productCartNumFirstDate', response.systemSet.productCartNumFirstDate)
        localStorage.setItem('productCartNumFirstCount', response.systemSet.productCartNumFirstCount)
        localStorage.setItem('productSheetWasterNum', response.systemSet.productSheetWasterNum)
        localStorage.setItem('productQaCodeName', response.systemSet.productQaCodeName)
        localStorage.setItem('productLocalProductName', response.systemSet.productLocalProductName)
        return true
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

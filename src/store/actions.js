
//给action注册一个事件处理函数
export function setUserInfo({commit},user) {
  return commit('setUserInfo',user)
}

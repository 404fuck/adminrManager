const getters = {
  language: state => state.app.language,
  token: state => state.app.adminManagerToken,
  user: state => state.app.user,
  curentTab: state => state.app.curentTab,
  docActiveName: state => state.app.docActiveName,
  isSystem: state => state.app.isSystem,
  isUser: state => state.app.isUser,
}
export default getters
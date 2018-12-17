/*
 * action 类型
 */

export const type = {
  SWITCH_MENU: 'SWITCH_MENU'
}

// 菜单点击切换，修改面包屑名称
export function switchMenu(menuName, loginFlag) {
  return {
    //变量
    type: type.SWITCH_MENU,
    //名称
    menuName,
    loginFlag
  }
}
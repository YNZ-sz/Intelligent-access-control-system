// src/config/menu.js'
export interface MenuItem {
  index: string // 菜单唯一标识（路由路径）
  title: string // 菜单文字
  icon?: string // 图标名称（如 "HomeFilled"）
  roles?: string[] // 可访问角色
  children?: MenuItem[] // 子菜单（可选属性，用 ? 表示）
}

export const menuList = [
  {
    index: '/main/home',
    title: '首页',
    icon: 'HomeFilled',
    roles: ['EMPLOYEE', 'admin', 'manager'], // 所有角色都可访问
  },

  {
    index: '/main/Attendance',
    title: '考勤调整',
    icon: 'Finished',
    roles: ['EMPLOYEE', 'admin', 'manager'], // 仅管理员、经理可看
  },
  {
    index: '/main/UserInfo',
    title: '打卡情况',
    icon: 'FolderChecked',
    roles: ['EMPLOYEE', 'admin', 'manager'], // 仅管理员、经理可看
  },
  {
    index: '/main/employee',
    title: '员工管理',
    icon: 'Avatar',
    roles: ['EMPLOYEE', 'admin', 'manager'], // 仅管理员、经理可看
  },
  {
    index: '/main/department',
    title: '部门管理',
    icon: 'Grid',
    roles: ['EMPLOYEE', 'admin', 'manager'], // 仅管理员可看
  },
  {
    index: '/mainsystem',
    title: '系统设置',
    icon: 'Setting',
    children: [
      {
        index: '/main/system/profile',
        title: '个人资料',
        roles: ['EMPLOYEE', 'admin', 'manager'],
      },
      {
        index: '/main/system/security',
        title: '安全设置',
        roles: ['EMPLOYEE', 'manager'],
      },
      { index: '/mainsystem/notice', title: '通知设置', roles: ['EMPLOYEE', 'admin', 'manager'] }, // 仅管理员可看
    ],
  },
]

interface User {
  id: number | String,
  username: String,
  password: String,
  role: String,
  changePswFlag: boolean

}

// 用户数组类型（等价于 User[]）
type Users = User[];  // 使用 type 定义数组类型

// 导出这两个类型
export type { User, Users };


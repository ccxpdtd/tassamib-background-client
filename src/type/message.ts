interface Message {
  id: number | String,
  username: String,
  content: String,
  created_at: String,
  comment_count: number,
  replies: []

}

// 用户数组类型（等价于 User[]）
type Messages = Message[];  // 使用 type 定义数组类型

// 导出这两个类型
export type { Message, Messages };


export interface Course {
  id: string;
  title: string;
  description: string;
  subject: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessons: number;
  progress: number;
  thumbnail: string;
  tags: string[];
  rating: number;
  students: number;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  subject: string;
  x: number;
  y: number;
  size: number;
  mastery: number; // 0-100
}

export interface KnowledgeEdge {
  from: string;
  to: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface LearningStats {
  totalMinutes: number;
  coursesCompleted: number;
  streakDays: number;
  pointsEarned: number;
  weeklyMinutes: number[];
  subjectProgress: { subject: string; progress: number; color: string }[];
}

export const courses: Course[] = [
  {
    id: '1',
    title: '高中数学：微积分入门',
    description: '从极限到导数，带你轻松掌握微积分基础概念，配合AI实时答疑。',
    subject: '数学',
    level: 'intermediate',
    duration: '12小时',
    lessons: 24,
    progress: 65,
    thumbnail: '📐',
    tags: ['微积分', '导数', '极限'],
    rating: 4.8,
    students: 3240,
  },
  {
    id: '2',
    title: '物理：牛顿力学与运动学',
    description: '深入理解经典力学定律，通过互动模拟实验加深理解。',
    subject: '物理',
    level: 'beginner',
    duration: '8小时',
    lessons: 16,
    progress: 30,
    thumbnail: '⚛️',
    tags: ['力学', '运动', '牛顿定律'],
    rating: 4.6,
    students: 2150,
  },
  {
    id: '3',
    title: 'Python编程：从零到实战',
    description: '结合AI辅助练习，系统学习Python语言，掌握数据处理与自动化。',
    subject: '编程',
    level: 'beginner',
    duration: '20小时',
    lessons: 40,
    progress: 80,
    thumbnail: '🐍',
    tags: ['Python', '编程基础', '数据处理'],
    rating: 4.9,
    students: 8900,
  },
  {
    id: '4',
    title: '中国历史：近现代史精讲',
    description: 'AI辅助知识图谱梳理，帮助学生构建完整的历史认知体系。',
    subject: '历史',
    level: 'intermediate',
    duration: '10小时',
    lessons: 20,
    progress: 0,
    thumbnail: '📜',
    tags: ['近代史', '历史事件', '知识梳理'],
    rating: 4.7,
    students: 1850,
  },
  {
    id: '5',
    title: '英语写作：学术论文技巧',
    description: 'AI语法纠错与写作建议，快速提升英语写作能力。',
    subject: '英语',
    level: 'advanced',
    duration: '15小时',
    lessons: 30,
    progress: 45,
    thumbnail: '✍️',
    tags: ['写作', '语法', '学术英语'],
    rating: 4.5,
    students: 4200,
  },
  {
    id: '6',
    title: '化学：有机化合物基础',
    description: '通过3D分子可视化与AI智能问答，轻松掌握有机化学知识。',
    subject: '化学',
    level: 'intermediate',
    duration: '14小时',
    lessons: 28,
    progress: 20,
    thumbnail: '🧪',
    tags: ['有机化学', '分子结构', '化学反应'],
    rating: 4.4,
    students: 1620,
  },
];

export const knowledgeNodes: KnowledgeNode[] = [
  { id: 'math', label: '数学', subject: '数学', x: 50, y: 50, size: 60, mastery: 72 },
  { id: 'calc', label: '微积分', subject: '数学', x: 20, y: 30, size: 40, mastery: 65 },
  { id: 'algebra', label: '代数', subject: '数学', x: 30, y: 70, size: 45, mastery: 80 },
  { id: 'geom', label: '几何', subject: '数学', x: 70, y: 25, size: 38, mastery: 55 },
  { id: 'stats', label: '统计学', subject: '数学', x: 75, y: 70, size: 42, mastery: 40 },
  { id: 'physics', label: '物理', subject: '物理', x: 15, y: 55, size: 55, mastery: 60 },
  { id: 'mechanics', label: '力学', subject: '物理', x: 8, y: 78, size: 35, mastery: 70 },
  { id: 'thermo', label: '热力学', subject: '物理', x: 25, y: 88, size: 30, mastery: 30 },
  { id: 'prog', label: '编程', subject: '编程', x: 85, y: 45, size: 58, mastery: 85 },
  { id: 'python', label: 'Python', subject: '编程', x: 92, y: 25, size: 40, mastery: 88 },
  { id: 'algo', label: '算法', subject: '编程', x: 90, y: 68, size: 38, mastery: 60 },
  { id: 'data', label: '数据结构', subject: '编程', x: 78, y: 85, size: 35, mastery: 55 },
];

export const knowledgeEdges: KnowledgeEdge[] = [
  { from: 'math', to: 'calc' },
  { from: 'math', to: 'algebra' },
  { from: 'math', to: 'geom' },
  { from: 'math', to: 'stats' },
  { from: 'physics', to: 'mechanics' },
  { from: 'physics', to: 'thermo' },
  { from: 'math', to: 'physics' },
  { from: 'prog', to: 'python' },
  { from: 'prog', to: 'algo' },
  { from: 'prog', to: 'data' },
  { from: 'algo', to: 'data' },
  { from: 'stats', to: 'prog' },
];

export const learningStats: LearningStats = {
  totalMinutes: 4320,
  coursesCompleted: 8,
  streakDays: 14,
  pointsEarned: 2850,
  weeklyMinutes: [45, 90, 60, 120, 75, 150, 80],
  subjectProgress: [
    { subject: '数学', progress: 72, color: '#6366f1' },
    { subject: '物理', progress: 60, color: '#f59e0b' },
    { subject: '编程', progress: 85, color: '#10b981' },
    { subject: '英语', progress: 50, color: '#3b82f6' },
    { subject: '化学', progress: 35, color: '#ef4444' },
    { subject: '历史', progress: 20, color: '#8b5cf6' },
  ],
};

export const aiResponses: Record<string, string> = {
  default: '您好！我是AI学习助手小智。我可以帮您解答学科疑问、推荐学习资源或制定个性化学习计划。请问有什么我可以帮助您的吗？',
  greeting: '您好！很高兴见到您！今天想学习什么呢？我可以帮您规划学习路径、解答难题，或者推荐适合您水平的课程。',
  math: '关于数学问题，我来为您详细解释：\n\n**微积分核心概念**\n导数表示函数在某点的变化率。对于函数 f(x)，其导数定义为：\n\nf\'(x) = lim(h→0) [f(x+h) - f(x)] / h\n\n**实用技巧**\n• 记住常见函数的导数公式\n• 链式法则：(f∘g)\'= f\'(g(x))·g\'(x)\n• 乘积法则：(fg)\'= f\'g + fg\'\n\n需要我进一步解释某个具体概念吗？',
  python: '关于Python编程，这里是一些核心要点：\n\n**Python基础语法**\n```python\n# 变量与数据类型\nname = "学习助手"\nage = 18\nscores = [95, 87, 92]\n\n# 函数定义\ndef calculate_average(scores):\n    return sum(scores) / len(scores)\n\nprint(f"平均分: {calculate_average(scores)}")\n```\n\n建议从基础数据结构开始，逐步掌握函数和面向对象编程。您目前在学Python的哪个部分？',
  study: '根据您的学习记录，我为您制定了个性化学习建议：\n\n📊 **当前学习状态**\n• 数学掌握度：72% ✅\n• 编程能力：85% 🌟\n• 物理理解：60% 📈\n\n🎯 **本周重点建议**\n1. 加强化学有机化合物（仅35%掌握）\n2. 继续巩固数学微积分\n3. 尝试Python进阶项目\n\n💡 每天保持60-90分钟的学习时间最为有效！',
  help: '我可以帮助您：\n\n🤖 **AI学习功能**\n• **解题辅导** - 输入您的数学/物理/化学题目\n• **知识讲解** - 任何学科的概念解释\n• **学习规划** - 个性化学习路径推荐\n• **错题分析** - 找出薄弱知识点\n• **考试备考** - 重点知识梳理\n\n请直接告诉我您想学什么！',
};

export function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('你好') || lower.includes('hello') || lower.includes('hi')) {
    return aiResponses.greeting;
  }
  if (lower.includes('数学') || lower.includes('微积分') || lower.includes('导数') || lower.includes('方程')) {
    return aiResponses.math;
  }
  if (lower.includes('python') || lower.includes('编程') || lower.includes('代码') || lower.includes('程序')) {
    return aiResponses.python;
  }
  if (lower.includes('学习计划') || lower.includes('怎么学') || lower.includes('建议') || lower.includes('安排')) {
    return aiResponses.study;
  }
  if (lower.includes('帮助') || lower.includes('功能') || lower.includes('能做什么') || lower.includes('可以')) {
    return aiResponses.help;
  }
  return `感谢您的提问！关于"${input}"这个问题，让我来为您解析：\n\n这是一个很好的学习问题。根据您的当前学习进度，我建议您：\n\n1. **系统学习** - 先掌握基础概念再深入细节\n2. **实践练习** - 通过做题巩固理解\n3. **定期复习** - 利用间隔记忆法加深印象\n\n您可以在知识图谱中查看相关知识点的关联，或者在课程库中找到对应的学习资源。需要更具体的指导吗？`;
}

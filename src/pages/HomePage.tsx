import { Link } from 'react-router-dom';
import { Brain, Zap, BookOpen, GitBranch, BarChart2, MessageCircle, ArrowRight, Star, Users, Clock } from 'lucide-react';
import { courses } from '../data/mockData';

const features = [
  {
    icon: MessageCircle,
    title: 'AI 智能助教',
    description: '7×24小时在线，秒速解答疑问，提供个性化学习指导',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    link: '/assistant',
  },
  {
    icon: BookOpen,
    title: '个性化学习路径',
    description: '基于AI分析您的学习水平，智能推荐最适合的课程序列',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    link: '/courses',
  },
  {
    icon: GitBranch,
    title: '知识图谱',
    description: '可视化展示知识关联，帮助构建系统性知识体系',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    link: '/knowledge',
  },
  {
    icon: BarChart2,
    title: '数据反馈报告',
    description: '实时追踪学习进度，用数据洞察学习效果与薄弱点',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    link: '/dashboard',
  },
];

const stats = [
  { value: '50,000+', label: '在校学生' },
  { value: '200+', label: '精品课程' },
  { value: '98%', label: '满意度' },
  { value: '24/7', label: 'AI在线' },
];

export default function HomePage() {
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 -z-10" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-indigo-200/40 to-purple-200/40 rounded-full blur-3xl -z-10"
        />

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 border border-indigo-100 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-700 mb-6 shadow-sm">
            <Zap className="w-3.5 h-3.5" />
            AI驱动的下一代智慧教育平台
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            让学习更智慧，
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              让成长更高效
            </span>
          </h1>

          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            融合先进 AI 技术，打造个性化学习体验。智能答疑、知识图谱、数据追踪，助您轻松掌握每一个知识点。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all"
            >
              开始学习
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/assistant"
              className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-50 hover:-translate-y-0.5 transition-all shadow-sm"
            >
              <Brain className="w-4 h-4 text-indigo-500" />
              体验AI助教
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 -mt-4 mb-16">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
          {stats.map(({ value, label }) => (
            <div key={label} className="py-6 px-4 text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">核心 AI 功能</h2>
          <p className="text-gray-500 text-lg">四大智能模块，全方位赋能您的学习之旅</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, description, bg, iconColor, link }) => (
            <Link
              key={title}
              to={link}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              <div className="mt-4 flex items-center gap-1 text-indigo-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                了解更多 <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">热门课程</h2>
            <p className="text-gray-500 mt-1">AI精选，适合您的学习内容</p>
          </div>
          <Link
            to="/courses"
            className="text-indigo-600 font-medium text-sm hover:text-indigo-700 flex items-center gap-1"
          >
            查看全部 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <Link
              key={course.id}
              to="/courses"
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden group"
            >
              <div className="h-32 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-5xl">
                {course.thumbnail}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                    {course.subject}
                  </span>
                  <span className="text-xs text-gray-400">
                    {course.level === 'beginner' ? '入门' : course.level === 'intermediate' ? '进阶' : '高级'}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors text-sm leading-snug">
                  {course.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {course.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {course.students.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </div>
                </div>
                {course.progress > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>学习进度</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
          <Brain className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-3">立即开启智慧学习之旅</h2>
          <p className="text-indigo-100 mb-6 text-lg">AI陪伴，让每一分钟的学习都更有价值</p>
          <Link
            to="/assistant"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
          >
            与AI助教对话
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-gray-400 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain className="w-4 h-4 text-indigo-500" />
          <span className="font-semibold text-gray-600">智学AI</span>
        </div>
        <p>© 2026 智学AI平台 · AI驱动的智慧教育解决方案</p>
      </footer>
    </div>
  );
}

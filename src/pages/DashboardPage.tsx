import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';
import { Flame, Trophy, Clock, Star, TrendingUp, Brain, Zap } from 'lucide-react';
import { learningStats } from '../data/mockData';

const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const weeklyData = learningStats.weeklyMinutes.map((min, i) => ({
  day: weekDays[i],
  minutes: min,
}));

const monthlyTrend = [
  { week: '第1周', score: 62 },
  { week: '第2周', score: 68 },
  { week: '第3周', score: 74 },
  { week: '第4周', score: 79 },
];

const radarData = learningStats.subjectProgress.map(({ subject, progress }) => ({
  subject,
  A: progress,
}));

const statCards = [
  {
    icon: Clock,
    label: '累计学习时长',
    value: `${Math.floor(learningStats.totalMinutes / 60)}h ${learningStats.totalMinutes % 60}m`,
    sub: '总时长',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    icon: Trophy,
    label: '完成课程数',
    value: learningStats.coursesCompleted,
    sub: '门课程',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: Flame,
    label: '连续打卡',
    value: learningStats.streakDays,
    sub: '天',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    icon: Star,
    label: '获得积分',
    value: learningStats.pointsEarned.toLocaleString(),
    sub: '积分',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
];

const insights = [
  {
    icon: TrendingUp,
    text: '本周学习时间较上周增长 23%，学习习惯在持续改善！',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Brain,
    text: '数学和编程掌握度提升显著，建议加强化学与历史学科。',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    icon: Zap,
    text: '连续打卡14天，保持这个节奏，月底将解锁黄金学习勋章！',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
];

export default function DashboardPage() {
  const todayMinutes = learningStats.weeklyMinutes[6];
  const weekTotal = learningStats.weeklyMinutes.reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-1">学习报告</h1>
          <p className="text-emerald-200">数据驱动，洞察您的学习成效与成长轨迹</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map(({ icon: Icon, label, value, sub, color, bg }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {value}
                <span className="text-sm font-normal text-gray-400 ml-1">{sub}</span>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-xl">🤖</span> AI 学习洞察
          </h2>
          <div className="grid md:grid-cols-3 gap-3">
            {insights.map(({ icon: Icon, text, color, bg }, i) => (
              <div key={i} className={`${bg} rounded-xl p-3`}>
                <Icon className={`w-4 h-4 ${color} mb-2`} />
                <p className="text-xs text-gray-700 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Weekly Bar Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">本周学习时长</h2>
              <span className="text-sm font-medium text-indigo-600">{weekTotal} 分钟</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(v) => [`${v} 分钟`, '学习时长']}
                  contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                />
                <Bar
                  dataKey="minutes"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>今日学习 <strong className="text-gray-800">{todayMinutes} 分钟</strong></span>
              <span>日均 <strong className="text-gray-800">{Math.round(weekTotal / 7)} 分钟</strong></span>
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">月度综合成绩趋势</h2>
              <span className="text-sm font-medium text-emerald-600">↑ 持续提升</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(v) => [`${v} 分`, '综合分数']}
                  contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Subject Progress Bars */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-bold text-gray-900 mb-4">各学科掌握度</h2>
            <div className="space-y-4">
              {learningStats.subjectProgress.map(({ subject, progress, color }) => (
                <div key={subject}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700">{subject}</span>
                    <span className="font-semibold" style={{ color }}>{progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${progress}%`, background: color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Radar Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-bold text-gray-900 mb-4">学科能力雷达图</h2>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6b7280' }} />
                <Radar
                  name="掌握度"
                  dataKey="A"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Tooltip
                  formatter={(v) => [`${v}%`, '掌握度']}
                  contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

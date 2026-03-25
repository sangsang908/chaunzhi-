import { useState } from 'react';
import { Search, Star, Users, Clock, BookOpen, ChevronDown, Sparkles } from 'lucide-react';
import { courses } from '../data/mockData';
import type { Course } from '../data/mockData';

const subjects = ['全部', '数学', '物理', '编程', '英语', '化学', '历史'];
const levels = ['全部', '入门', '进阶', '高级'];
const levelMap: Record<string, Course['level'] | 'all'> = {
  全部: 'all',
  入门: 'beginner',
  进阶: 'intermediate',
  高级: 'advanced',
};
const levelLabel: Record<Course['level'], string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
};

const aiRecommendations = [
  { label: '根据您的数学进度，推荐强化微积分练习', subject: '数学' },
  { label: '您的编程能力强，可尝试算法进阶课程', subject: '编程' },
  { label: '化学薄弱，建议优先完成有机化学基础', subject: '化学' },
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('全部');
  const [selectedLevel, setSelectedLevel] = useState('全部');

  const filtered = courses.filter((c) => {
    const matchSubject = selectedSubject === '全部' || c.subject === selectedSubject;
    const matchLevel =
      selectedLevel === '全部' || c.level === levelMap[selectedLevel];
    const matchSearch =
      !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some((t) => t.includes(searchQuery));
    return matchSubject && matchLevel && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">课程中心</h1>
          <p className="text-indigo-200 mb-6">AI根据您的学习情况智能推荐，找到最适合您的课程</p>

          {/* Search */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索课程、知识点..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/95 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* AI Recommendations */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-4 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-amber-700 text-sm">AI个性化推荐</span>
          </div>
          <div className="space-y-2">
            {aiRecommendations.map((rec, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-amber-800">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                {rec.label}
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-600">学科：</span>
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedSubject === s
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-600">难度：</span>
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLevel(l)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedLevel === l
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-600'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-5">共找到 <span className="font-semibold text-gray-800">{filtered.length}</span> 门课程</p>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>未找到匹配的课程</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
      <div className="h-28 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center text-5xl">
        {course.thumbnail}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
            {course.subject}
          </span>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            {levelLabel[course.level]}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 text-sm mb-1.5 leading-snug">{course.title}</h3>

        {expanded && (
          <p className="text-xs text-gray-500 mb-2 leading-relaxed">{course.description}</p>
        )}

        <div className="flex flex-wrap gap-1 mb-3">
          {course.tags.map((tag) => (
            <span key={tag} className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="font-medium">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {course.students.toLocaleString()}人
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {course.duration}
            </div>
          </div>

          {course.progress > 0 && (
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>学习进度</span>
                <span>{course.progress}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              {course.progress > 0 ? '继续学习' : '开始学习'}
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

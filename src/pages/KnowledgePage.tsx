import { useState } from 'react';
import { knowledgeNodes, knowledgeEdges } from '../data/mockData';

const subjectColors: Record<string, { fill: string; stroke: string; text: string }> = {
  数学: { fill: '#eef2ff', stroke: '#6366f1', text: '#4338ca' },
  物理: { fill: '#fef3c7', stroke: '#f59e0b', text: '#92400e' },
  编程: { fill: '#d1fae5', stroke: '#10b981', text: '#065f46' },
  历史: { fill: '#fce7f3', stroke: '#ec4899', text: '#9d174d' },
};

const masteryColor = (m: number) => {
  if (m >= 80) return '#10b981';
  if (m >= 60) return '#6366f1';
  if (m >= 40) return '#f59e0b';
  return '#ef4444';
};

export default function KnowledgePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filterSubject, setFilterSubject] = useState<string>('全部');

  const subjects = ['全部', ...Array.from(new Set(knowledgeNodes.map((n) => n.subject)))];

  const visibleNodes = knowledgeNodes.filter(
    (n) => filterSubject === '全部' || n.subject === filterSubject
  );
  const visibleIds = new Set(visibleNodes.map((n) => n.id));
  const visibleEdges = knowledgeEdges.filter(
    (e) => visibleIds.has(e.from) && visibleIds.has(e.to)
  );

  const selectedNode = knowledgeNodes.find((n) => n.id === selected);
  const connectedIds = selected
    ? new Set(
        knowledgeEdges
          .filter((e) => e.from === selected || e.to === selected)
          .flatMap((e) => [e.from, e.to])
          .filter((id) => id !== selected)
      )
    : new Set<string>();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">知识图谱</h1>
          <p className="text-violet-200">可视化您的知识体系，发现知识间的关联与薄弱点</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Subject Filter */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm font-medium text-gray-600">学科筛选：</span>
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setFilterSubject(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filterSubject === s
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-violet-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Mastery Legend */}
        <div className="flex items-center gap-4 mb-6 flex-wrap text-xs text-gray-500">
          <span className="font-medium">掌握程度：</span>
          {[
            { color: '#ef4444', label: '待提升 <40%' },
            { color: '#f59e0b', label: '学习中 40-60%' },
            { color: '#6366f1', label: '良好 60-80%' },
            { color: '#10b981', label: '优秀 >80%' },
          ].map(({ color, label }) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: color }} />
              {label}
            </span>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* SVG Graph */}
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <svg
              viewBox="0 0 100 100"
              className="w-full"
              style={{ aspectRatio: '4/3' }}
            >
              <defs>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 z" fill="#d1d5db" />
                </marker>
              </defs>

              {/* Edges */}
              {visibleEdges.map((edge) => {
                const from = knowledgeNodes.find((n) => n.id === edge.from)!;
                const to = knowledgeNodes.find((n) => n.id === edge.to)!;
                const isHighlighted =
                  selected &&
                  (edge.from === selected || edge.to === selected);
                return (
                  <line
                    key={`${edge.from}-${edge.to}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={isHighlighted ? '#6366f1' : '#e5e7eb'}
                    strokeWidth={isHighlighted ? '0.6' : '0.4'}
                    strokeDasharray={isHighlighted ? '0' : '1,1'}
                    opacity={selected && !isHighlighted ? 0.3 : 1}
                  />
                );
              })}

              {/* Nodes */}
              {visibleNodes.map((node) => {
                const colors = subjectColors[node.subject] ?? subjectColors['数学'];
                const isSelected = selected === node.id;
                const isConnected = connectedIds.has(node.id);
                const isActive = !selected || isSelected || isConnected;
                const r = node.size / 10;

                return (
                  <g
                    key={node.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelected(selected === node.id ? null : node.id)}
                    opacity={isActive ? 1 : 0.3}
                  >
                    {/* Mastery ring */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={r + 1.2}
                      fill="none"
                      stroke={masteryColor(node.mastery)}
                      strokeWidth="0.8"
                      opacity={0.6}
                    />
                    {/* Main circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={r}
                      fill={colors.fill}
                      stroke={isSelected ? colors.stroke : '#e5e7eb'}
                      strokeWidth={isSelected ? '1.2' : '0.5'}
                    />
                    {/* Label */}
                    <text
                      x={node.x}
                      y={node.y + r + 2.5}
                      textAnchor="middle"
                      fontSize="2.8"
                      fill={colors.text}
                      fontWeight={isSelected ? '700' : '500'}
                    >
                      {node.label}
                    </text>
                    {/* Mastery % */}
                    <text
                      x={node.x}
                      y={node.y + 1}
                      textAnchor="middle"
                      fontSize="2.5"
                      fill={colors.text}
                      fontWeight="600"
                    >
                      {node.mastery}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Side Panel */}
          <div className="w-full lg:w-72 space-y-4">
            {selectedNode ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">{selectedNode.label}</h3>
                  <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                    {selectedNode.subject}
                  </span>
                </div>

                {/* Mastery */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">掌握程度</span>
                    <span className="font-semibold" style={{ color: masteryColor(selectedNode.mastery) }}>
                      {selectedNode.mastery}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${selectedNode.mastery}%`,
                        background: masteryColor(selectedNode.mastery),
                      }}
                    />
                  </div>
                </div>

                {/* Connected Nodes */}
                {connectedIds.size > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2">关联知识点</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.from(connectedIds).map((id) => {
                        const n = knowledgeNodes.find((x) => x.id === id)!;
                        return (
                          <button
                            key={id}
                            onClick={() => setSelected(id)}
                            className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                          >
                            {n.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setSelected(null)}
                  className="mt-4 w-full text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  取消选择
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-700 mb-3">学科掌握概览</h3>
                {['数学', '物理', '编程'].map((sub) => {
                  const nodes = knowledgeNodes.filter((n) => n.subject === sub);
                  const avg = Math.round(nodes.reduce((s, n) => s + n.mastery, 0) / nodes.length);
                  return (
                    <div key={sub} className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{sub}</span>
                        <span className="font-semibold text-gray-800">{avg}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${avg}%`,
                            background: masteryColor(avg),
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
                <p className="text-xs text-gray-400 mt-3">点击节点查看详情与关联</p>
              </div>
            )}

            {/* AI Insight */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🤖</span>
                <span className="text-sm font-semibold text-violet-700">AI 学习洞察</span>
              </div>
              <p className="text-xs text-violet-600 leading-relaxed">
                您在<strong>编程</strong>方面表现优秀（85%），建议将此优势迁移到数学统计学习。
                <strong>化学</strong>知识较薄弱，建议本周安排2-3次专项练习。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

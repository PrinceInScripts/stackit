// src/features/questions/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchQuestions } from './questions.slice';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LoaderSpinner } from '../../components/LoadingSpinner';

export default function HomePage() {
  const dispatch = useDispatch();
  const { list: questions, loading, error } = useSelector(state => state.questions);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'unanswered'
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  // Filter, sort and paginate
  const filtered = questions
    .filter(q =>
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(q => (sortBy === 'unanswered' ? !q.isAnswered : true))
    .sort((a, b) =>
      sortBy === 'newest'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : 0
    );

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6 w-full">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Link
          to="/ask"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Ask New Question
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <select
            className="border rounded-lg px-3 py-1"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="unanswered">Unanswered</option>
          </select>

          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="border rounded-lg px-3 py-1 pl-8"
            />
      
      
          </div>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <LoaderSpinner />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-4">
          {paginated.map(q => (
            <li
              key={q._id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                <Link
                  to={`/questions/${q._id}`}
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {q.title}
                </Link>
                <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">
                  {q.answersCount || 0} ans
                </span>
              </div>

              <p className="mt-2 text-gray-700 line-clamp-3">
                {q.description.replace(/<[^>]+>/g, '')}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {q.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-2 text-sm text-gray-500">
                Asked by {q.author?.username || 'Anonymous'}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronLeft size={20} />
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

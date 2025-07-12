import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../features/user/user.slice';
import { fetchQuestions } from '../features/questions/questions.slice';
import { LoaderSpinner } from '../components/LoadingSpinner';
import { ChevronDown, ChevronUp, User } from 'lucide-react';

export default function AdminPanel() {
  const dispatch = useDispatch();

  const { users, loading: usersLoading, error: usersError } = useSelector(state => state.user);
  const { list: questions, loading: qLoading, error: qError } = useSelector(state => state.questions);

  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchQuestions());
  }, [dispatch]);

  const toggleExpand = userId => {
    setExpandedUser(prev => (prev === userId ? null : userId));
  };

  if (usersLoading || qLoading) return <LoaderSpinner />;
  if (usersError) return <p className="text-red-500">{usersError}</p>;
  if (qError) return <p className="text-red-500">{qError}</p>;

  return (
    <div className="max-w-screen-lg mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="bg-white shadow rounded-2xl divide-y">
        {users.map(user => {
          const userQuestions = questions.filter(q =>
  q.authorId?._id === user._id || q.authorId?.id === user._id
);
          const isExpanded = expandedUser === user._id;
          return (
            <div key={user._id} className="px-4 py-3 hover:bg-gray-50">
              <button
                className="w-full flex items-center justify-between"
                onClick={() => toggleExpand(user._id)}
              >
                <div className="flex items-center space-x-2">
                  <User size={20} />
                  <span className="font-medium">{user.username} ({user.email})</span>
                </div>
                {isExpanded ? <ChevronUp /> : <ChevronDown />}
              </button>
              {isExpanded && (
                <ul className="mt-2 ml-8 space-y-2">
                  {userQuestions.length > 0 ? (
                    userQuestions.map(q => (
                      <li key={q._id} className="flex justify-between items-center">
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          {q.title}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(q.createdAt).toLocaleDateString()}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-500">No questions submitted</li>
                  )}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

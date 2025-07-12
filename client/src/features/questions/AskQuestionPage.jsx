import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RichEditor from './RichEditor';
import { createQuestion } from './questions.slice';
import { toast } from 'react-toastify';
import { LoaderSpinner } from '../../components/LoadingSpinner';

export default function AskQuestionPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.questions);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createQuestion({
        title,
        description,
        tags: tags.split(',').map((t) => t.trim()),
      })).unwrap();
      toast.success('Question posted successfully!');
      navigate('/');
    } catch {}
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4">Ask a New Question</h2>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300"
              placeholder="E.g. How to integrate TipTap editor?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <RichEditor
              value={description}
              onChange={setDescription}
              placeholder="Add detailed description..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300"
              placeholder="react, tiptap, redux"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Submit Question
          </button>
        </form>
      )}
    </div>
  );
}

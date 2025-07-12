// src/features/answers/AnswerListPage.jsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAnswersByQuestion, voteAnswer } from './answer.slice'
import { LoaderSpinner } from '../../components/LoadingSpinner'
import { ThumbsUp, ThumbsDown, User } from 'lucide-react'
import { toast } from 'react-toastify'

/**
 * Enhanced AnswerListPage: displays each answer in a styled card
 * with author, timestamp, and thumb icons for voting.
 */
export default function AnswerListPage({ questionId }) {
  const dispatch = useDispatch()
  const { list: answers, loading, error } = useSelector(state => state.answers)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getAnswersByQuestion(questionId))
  }, [dispatch, questionId])

  const handleVote = async (id, value) => {
    if (!user) {
      return toast.info('Please login to vote')
    }
    try {
      await dispatch(voteAnswer({ id, value })).unwrap()
    } catch (err) {
      toast.error(err.message || 'Failed to vote')
    }
  }

  if (loading) return <LoaderSpinner />
  if (error) return <p className="text-red-500 text-center">{error}</p>

  return (
    <div className="space-y-6">
      {answers.map(ans => {
        const votes = Array.isArray(ans.votes) ? ans.votes : []
        const upCount = votes.filter(v => v.value === 1).length
        const downCount = votes.filter(v => v.value === -1).length
        const key = ans._id

        return (
          <div
            key={key}
            className="bg-white p-6 shadow-lg rounded-2xl flex flex-col space-y-4"
          >
            {/* Voting + Score */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleVote(ans._id, 1)}
                className="flex items-center space-x-1 hover:text-green-600"
                aria-label="Upvote"
              >
                <ThumbsUp size={20} />
                <span className="text-sm font-medium">{upCount}</span>
              </button>

              <button
                onClick={() => handleVote(ans._id, -1)}
                className="flex items-center space-x-1 hover:text-red-600"
                aria-label="Downvote"
              >
                <ThumbsDown size={20} />
                <span className="text-sm font-medium">{downCount}</span>
              </button>
            </div>

            {/* Answer Content */}
            <div
              className="prose max-w-full"
              dangerouslySetInnerHTML={{ __html: ans.text }}
            />

            {/* Author & Timestamp */}
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <User size={16} />
              <span>{ans.author?.username || 'Anonymous'}</span>
              <span>&middot;</span>
              <span>{new Date(ans.createdAt).toLocaleString()}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

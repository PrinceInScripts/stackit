// -----------------------------------
// src/features/answers/AnswerForm.jsx
// -----------------------------------
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAnswer } from './answer.slice'
import RichEditor from '../questions/RichEditor'
import { toast } from 'react-toastify'
import { LoaderSpinner } from '../../components/LoadingSpinner'

/**
 * AnswerForm: submit new answers under a question
 * Props:
 *  - questionId: string
 *  - onAnswerSubmitted: callback(newAnswer)
 */
export default function AnswerForm({ questionId, onAnswerSubmitted }) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { loading } = useSelector(state => state.answers)
  const [text, setText] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    if (!user) {
      toast.info('Please login to submit an answer')
      return
    }
    if (!text.trim()) {
      toast.error('Answer cannot be empty')
      return
    }
    try {
      const newAns = await dispatch(createAnswer({ questionId, text })).unwrap()
      toast.success('Answer submitted successfully')
      setText('')
      onAnswerSubmitted?.(newAns)
    } catch (err) {
      toast.error(err.message || 'Failed to submit answer')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Your Answer</label>
      <RichEditor
        value={text}
        onChange={setText}
        placeholder="Write your answer..."
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition"
      >
        {loading ? <LoaderSpinner size="sm" /> : 'Submit Answer'}
      </button>
    </form>
  )
}


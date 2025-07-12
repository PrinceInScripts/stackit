
// -----------------------------------
// src/features/questions/QuestionDetailPage.jsx
// -----------------------------------
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleQuestion } from './questions.thunk'
import { LoaderSpinner } from '../../components/LoadingSpinner'
import { toast } from 'react-toastify'
import AnswerListPage from '../answers/AnswerListPage'
import AnswerForm from '../answers/AnswerForm'

export default function QuestionDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [question, setQuestion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    dispatch(getSingleQuestion(id))
      .unwrap()
      .then(q => {
        setQuestion(q)
        setError(null)
      })
      .catch(err => {
        console.error(err)
        setError(err.message || 'Could not load question')
      })
      .finally(() => setLoading(false))
  }, [dispatch, id])

  if (loading) return <LoaderSpinner />
  if (error)   return <p className="text-red-500 text-center">{error}</p>
  if (!question) return <p className="text-center">Question not found.</p>

  // After a new answer, you may want to refresh list
  const handleNewAnswer = () => {
    /* Optionally re-fetch or update answer list */
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white p-6 shadow rounded-2xl">
        <h1 className="text-2xl font-semibold">{question.title}</h1>
        <div
          className="mt-4 prose"
          dangerouslySetInnerHTML={{ __html: question.description }}
        />
      </div>

      <div className="bg-white p-6 shadow rounded-2xl space-y-6">
        <h2 className="text-xl font-semibold">Answers ({question.answerCount || '0'})</h2>
        <AnswerListPage questionId={question._id} />
        <AnswerForm questionId={question._id} onAnswerSubmitted={handleNewAnswer} />
      </div>
    </div>
  )
}

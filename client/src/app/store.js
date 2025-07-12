import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/auth.slice';
import userReducer from './store/user.slice';
import questionReducer from './store/questions.slice';
import answerReducer from './store/answer.slice';
import notificationReducer from './store/notification.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    questions: questionReducer,
    answers: answerReducer,
    notifications: notificationReducer,
  },
});

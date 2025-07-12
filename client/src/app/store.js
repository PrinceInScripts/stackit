import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth.slice';
import userReducer from '../features/user/user.slice';
import questionReducer from '../features/questions/questions.slice';
import answerReducer from '../features/answers/answer.slice';
import notificationReducer from '../features/notification/notification.slice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    questions: questionReducer,
    answers: answerReducer,
    notifications: notificationReducer,
  },
});

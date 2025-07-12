const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/user.routes'));
app.use('/api/questions', require('./routes/question.routes'));
app.use('/api/answers', require('./routes/answer.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

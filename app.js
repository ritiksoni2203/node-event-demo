const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;

mongoose.connect("mongodb://localhost:27017/event", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRouter = require('./routes/auth');
const eventRouter = require('./routes/event');
const invitationRouter = require('./routes/invitation');

app.use('/auth', authRouter);
app.use('/event', eventRouter);
app.use('/invitation', invitationRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
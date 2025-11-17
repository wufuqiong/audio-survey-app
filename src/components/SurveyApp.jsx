import React from 'react';
import BrowserSupport from './BrowserSupport';
import { 
  Container, 
  Paper, 
  Typography, 
  Box,
  AppBar,
  Toolbar,
  CircularProgress,
  Alert
} from '@mui/material';
import { Psychology as PsychologyIcon } from '@mui/icons-material';
import { surveyData } from '../data/surveyData';
import { useSurvey } from '../hooks/useSurvey';
import Question from './Question';
import ProgressBar from './ProgressBar';
import Navigation from './Navigation';
import Results from './Results';

const SurveyApp = () => {
  const {
    currentQuestionIndex,
    answers,
    isCompleted,
    handleAnswer,
    goToNextQuestion,
    goToPrevQuestion,
    getProgress
  } = useSurvey(surveyData.questions);

  // 安全检查：确保数据存在
  if (!surveyData || !surveyData.questions || surveyData.questions.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Alert severity="error">
          问卷数据加载失败，请检查数据文件。
        </Alert>
      </Container>
    );
  }

  if (isCompleted) {
    return <Results answers={answers} questions={surveyData.questions} />;
  }

  const currentQuestion = surveyData.questions[currentQuestionIndex];

  // 安全检查：确保当前问题存在
  if (!currentQuestion) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          加载题目中...
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
        <Toolbar>
          <PsychologyIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {surveyData.title || '问卷调查'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            第 {currentQuestionIndex + 1} / {surveyData.questions.length} 题
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4, minHeight: 'calc(100vh - 64px)' }}>
        <Paper elevation={3} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" component="h1" gutterBottom color="primary" fontWeight="bold">
              {surveyData.title || '问卷调查'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {surveyData.description || '请选择最符合的答案'}
            </Typography>
          </Box>

          <ProgressBar progress={getProgress()} />

          <Question
            question={currentQuestion}
            answer={answers[currentQuestion.id] || []}
            onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={surveyData.questions.length}
          />

          <Navigation
            onNext={goToNextQuestion}
            onPrev={goToPrevQuestion}
            canNext={currentQuestionIndex < surveyData.questions.length - 1}
            canPrev={currentQuestionIndex > 0}
            isLastQuestion={currentQuestionIndex === surveyData.questions.length - 1}
          />
        </Paper>
      </Container>
      <BrowserSupport />
    </>
  );
};

export default SurveyApp;
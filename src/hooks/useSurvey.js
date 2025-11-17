import { useState, useEffect } from 'react';

export const useSurvey = (questions = []) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!questions || questions.length === 0) {
      setIsCompleted(true);
    }
  }, [questions]);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const getProgress = () => {
    if (!questions || questions.length === 0) return 0;
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  return {
    currentQuestionIndex,
    answers,
    isCompleted,
    handleAnswer,
    goToNextQuestion,
    goToPrevQuestion,
    getProgress
  };
};
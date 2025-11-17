import React from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Card,
  CardContent,
  Chip,
  Alert
} from '@mui/material';
import { VolumeUp, Headphones } from '@mui/icons-material';
import Option from './Option';
import { useEnhancedAudio } from '../hooks/useEnhancedAudio';

const Question = ({ question, answer, onAnswer, questionNumber, totalQuestions }) => {
  const { playText, isPlaying, supported } = useEnhancedAudio();

  // 安全检查
  if (!question) {
    return <Alert severity="warning">题目数据加载中...</Alert>;
  }

  if (!supported) {
    return (
      <Alert severity="warning" sx={{ my: 2 }}>
        您的浏览器不支持语音朗读功能，请使用最新版本的Chrome、Edge或Safari浏览器。
      </Alert>
    );
  }

  const handlePlayQuestion = () => {
    playText(question.text, { rate: 0.8 });
  };

  const handleOptionSelect = (optionValue) => {
    if (question.type === 'multiple') {
      const currentAnswers = answer || [];
      const newAnswers = currentAnswers.includes(optionValue)
        ? currentAnswers.filter(a => a !== optionValue)
        : [...currentAnswers, optionValue];
      onAnswer(newAnswers);
    } else {
      onAnswer(optionValue);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box>
          <Chip 
            label={`第 ${questionNumber} 题 / 共 ${totalQuestions} 题`} 
            color="primary" 
            variant="outlined"
            sx={{ mb: 1 }}
          />
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
            {question.text}
          </Typography>
        </Box>
        <Button
          variant={isPlaying ? "contained" : "outlined"}
          startIcon={isPlaying ? <Headphones /> : <VolumeUp />}
          onClick={handlePlayQuestion}
          disabled={isPlaying}
          color={isPlaying ? "success" : "primary"}
          size="large"
        >
          {isPlaying ? '朗读中...' : '朗读题目'}
        </Button>
      </Box>

      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent sx={{ '&:last-child': { pb: 2 } }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            题目类型: {question.type === 'multiple' ? '多选题' : '单选题'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            💡 点击选项前的按钮可以朗读选项内容
          </Typography>
        </CardContent>
      </Card>

      <Box>
        {question.options && question.options.map((option, index) => (
          <Option
            key={option.id || index}
            option={option}
            index={index}
            isSelected={
              question.type === 'multiple'
                ? (answer || []).includes(option.value)
                : answer === option.value
            }
            onSelect={handleOptionSelect}
            questionType={question.type}
            onPlayOption={(text) => playText(text, { rate: 0.9 })}
            isPlaying={isPlaying}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Question;
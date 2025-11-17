import React from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import { Celebration, Replay, Download } from '@mui/icons-material';

const Results = ({ answers, questions }) => {
  const calculateResults = () => {
    return questions.map(question => ({
      question: question.text,
      answer: answers[question.id] || (question.type === 'multiple' ? [] : '未回答'),
      type: question.type
    }));
  };

  const results = calculateResults();

  const handleRestart = () => {
    window.location.reload();
  };

  const handleDownload = () => {
    const resultsText = results.map((result, index) => 
      `第 ${index + 1} 题: ${result.question}\n答案: ${Array.isArray(result.answer) ? result.answer.join(', ') : result.answer}\n`
    ).join('\n');
    
    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '问卷结果.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box textAlign="center" mb={4}>
          <Box sx={{ 
            width: 80, 
            height: 80, 
            bgcolor: 'success.light', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2
          }}>
            <Celebration sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography variant="h4" component="h1" gutterBottom color="success.main" fontWeight="bold">
            问卷完成！
          </Typography>
          <Typography variant="body1" color="text.secondary">
            感谢您的参与，以下是您的答案汇总
          </Typography>
        </Box>

        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              答题统计
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              <Chip label={`总题数: ${questions.length}`} variant="outlined" />
              <Chip 
                label={`已回答: ${Object.keys(answers).length}`} 
                color="primary" 
                variant="outlined" 
              />
              <Chip 
                label={`完成率: ${Math.round((Object.keys(answers).length / questions.length) * 100)}%`} 
                color="success" 
              />
            </Box>
          </CardContent>
        </Card>

        <List sx={{ mb: 4 }}>
          {results.map((result, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight="medium">
                      {index + 1}. {result.question}
                    </Typography>
                  }
                  secondary={
                    <Box mt={1}>
                      <Chip 
                        label={result.type === 'multiple' ? '多选题' : '单选题'} 
                        size="small" 
                        variant="outlined"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body2" color="primary" component="span">
                        您的答案: {Array.isArray(result.answer) 
                          ? result.answer.length > 0 
                            ? result.answer.join(', ') 
                            : '未选择'
                          : result.answer}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
              {index < results.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>

        <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
          <Button
            startIcon={<Replay />}
            onClick={handleRestart}
            variant="contained"
            size="large"
            sx={{ minWidth: 140 }}
          >
            重新开始
          </Button>
          <Button
            startIcon={<Download />}
            onClick={handleDownload}
            variant="outlined"
            size="large"
            sx={{ minWidth: 140 }}
          >
            下载结果
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Results;

import React from 'react';
import { 
  Box, 
  Button,
  ButtonGroup
} from '@mui/material';
import { ArrowBack, ArrowForward, CheckCircle } from '@mui/icons-material';

const Navigation = ({ onNext, onPrev, canNext, canPrev, isLastQuestion }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      mt: 4,
      pt: 3,
      borderTop: 1,
      borderColor: 'divider'
    }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={onPrev}
        disabled={!canPrev}
        variant="outlined"
        sx={{ 
          visibility: canPrev ? 'visible' : 'hidden',
          minWidth: 120
        }}
      >
        上一题
      </Button>

      <Button
        endIcon={isLastQuestion ? <CheckCircle /> : <ArrowForward />}
        onClick={onNext}
        variant="contained"
        size="large"
        sx={{ 
          minWidth: 140,
          px: 4
        }}
      >
        {isLastQuestion ? '完成问卷' : '下一题'}
      </Button>
    </Box>
  );
};

export default Navigation;

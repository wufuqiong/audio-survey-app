import React from 'react';
import { 
  Box, 
  LinearProgress, 
  Typography,
  Chip
} from '@mui/material';

const ProgressBar = ({ progress }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="body2" color="text.secondary">
          问卷进度
        </Typography>
        <Chip 
          label={`${Math.round(progress)}%`} 
          color="primary" 
          size="small"
        />
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ 
          height: 8, 
          borderRadius: 4,
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
          }
        }}
      />
    </Box>
  );
};

export default ProgressBar;

import React from 'react';
import { Alert, Box, Typography, Link } from '@mui/material';
import { VolumeUp, Warning } from '@mui/icons-material';

const BrowserSupport = () => {
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const isEdge = /Edg/.test(navigator.userAgent);
  const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  
  const supportsSpeech = 'speechSynthesis' in window;

  if (supportsSpeech) return null;

  return (
    <Alert 
      severity="warning" 
      icon={<Warning />}
      sx={{ mb: 2 }}
    >
      <Typography variant="h6" gutterBottom>
        浏览器兼容性提示
      </Typography>
      <Typography variant="body2" paragraph>
        您的浏览器可能不支持语音朗读功能。为了最佳体验，建议使用：
      </Typography>
      <Box component="ul" sx={{ pl: 2, mb: 2 }}>
        <li><strong>Google Chrome</strong>（推荐）</li>
        <li>Microsoft Edge</li>
        <li>Apple Safari</li>
      </Box>
      <Typography variant="body2">
        当前应用仍可正常使用，但语音功能将不可用。
      </Typography>
    </Alert>
  );
};

export default BrowserSupport;

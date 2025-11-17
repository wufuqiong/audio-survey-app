import React from 'react';
import { 
  Card, 
  CardContent, 
  FormControlLabel, 
  Radio, 
  Checkbox, 
  Box, 
  IconButton,
  Typography,
  Tooltip
} from '@mui/material';
import { VolumeUp } from '@mui/icons-material';

const Option = ({ option, index, isSelected, onSelect, questionType, onPlayOption, isPlaying }) => {
  // 安全检查
  if (!option) {
    return null;
  }

  const handlePlayOption = (event) => {
    event.stopPropagation();
    onPlayOption(option.text);
  };

  const handleSelect = () => {
    onSelect(option.value);
  };

  const ControlComponent = questionType === 'multiple' ? Checkbox : Radio;

  return (
    <Card 
      sx={{ 
        mb: 2,
        border: isSelected ? 2 : 1,
        borderColor: isSelected ? 'primary.main' : 'divider',
        backgroundColor: isSelected ? 'primary.50' : 'background.paper',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: 'primary.light',
          transform: 'translateY(-2px)',
          boxShadow: 2,
        }
      }}
      onClick={handleSelect}
      elevation={isSelected ? 1 : 0}
    >
      <CardContent sx={{ py: 2, '&:last-child': { py: 2 } }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" flex={1}>
            <Box 
              sx={{ 
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: isSelected ? 'primary.main' : 'grey.100',
                color: isSelected ? 'white' : 'grey.600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            >
              {String.fromCharCode(65 + index)}
            </Box>
            
            <FormControlLabel
              control={
                <ControlComponent 
                  checked={isSelected}
                  onChange={handleSelect}
                  sx={{ mr: 1 }}
                />
              }
              label={
                <Typography variant="body1" fontWeight={500}>
                  {option.text}
                </Typography>
              }
              sx={{ flex: 1, m: 0 }}
            />
          </Box>
          
          <Tooltip title="朗读此选项">
            <IconButton
              onClick={handlePlayOption}
              color={isPlaying ? "success" : "primary"}
              size="medium"
              sx={{ 
                bgcolor: isPlaying ? 'success.50' : 'grey.50',
                '&:hover': {
                  bgcolor: isPlaying ? 'success.100' : 'grey.100',
                }
              }}
            >
              <VolumeUp />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Option;
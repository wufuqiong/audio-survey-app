import { useState, useRef, useCallback } from 'react';

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const play = useCallback((audioUrl) => {
    // 停止当前播放
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // 创建新的音频对象
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(error => {
        console.error('音频播放失败:', error);
        // 如果预录制音频失败，尝试使用TTS
        fallbackToTTS(audioUrl);
      });

    audio.onended = () => {
      setIsPlaying(false);
    };

    audio.onerror = () => {
      setIsPlaying(false);
      console.error('音频加载失败');
    };
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  const fallbackToTTS = (audioUrl) => {
    console.log('音频加载失败，使用TTS回退:', audioUrl);
  };

  return {
    play,
    stop,
    isPlaying
  };
};

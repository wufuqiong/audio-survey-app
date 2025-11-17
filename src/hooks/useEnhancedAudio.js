import { useSpeechSynthesis } from './useSpeechSynthesis';

export const useEnhancedAudio = () => {
  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis();

  const playText = (text, options = {}) => {
    if (!isSupported) {
      console.warn('浏览器不支持语音合成');
      return;
    }

    // 停止当前播放
    stop();

    // 设置中文语言
    speak(text, { ...options, lang: 'zh-CN' });
  };

  return {
    playText,
    stop,
    isPlaying: isSpeaking,
    supported: isSupported
  };
};

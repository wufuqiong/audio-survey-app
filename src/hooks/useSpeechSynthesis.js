import { useState, useEffect, useCallback } from 'react';

export const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  // 检查浏览器支持
  useEffect(() => {
    const checkSupport = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        setIsSupported(true);
        
        // 语音列表加载
        const loadVoices = () => {
          try {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
          } catch (error) {
            console.warn('语音列表加载失败:', error);
          }
        };
        
        // 不同的浏览器有不同的语音加载方式
        if (window.speechSynthesis.getVoices().length > 0) {
          loadVoices();
        } else {
          window.speechSynthesis.onvoiceschanged = loadVoices;
        }
      } else {
        setIsSupported(false);
      }
    };
    
    checkSupport();
  }, []);

  const speak = useCallback((text, options = {}) => {
    if (!isSupported) {
      console.warn('浏览器不支持语音合成');
      return;
    }
    
    try {
      // 停止当前语音
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // 设置选项
      utterance.rate = options.rate || 0.8;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;
      utterance.lang = options.lang || 'zh-CN';
      
      // 查找中文语音
      if (voices.length > 0) {
        const chineseVoices = voices.filter(voice => 
          voice.lang.includes('zh') || voice.lang.includes('CN')
        );
        if (chineseVoices.length > 0) {
          utterance.voice = chineseVoices[0];
        }
      }
      
      // 事件处理
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (event) => {
        console.error('语音合成错误:', event);
        setIsSpeaking(false);
        
        // 回退方案：显示文本提示
        if (options.onError) {
          options.onError(text);
        }
      };
      
      window.speechSynthesis.speak(utterance);
      
    } catch (error) {
      console.error('语音合成异常:', error);
      setIsSpeaking(false);
    }
  }, [isSupported, voices]);

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
    voices
  };
};
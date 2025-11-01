import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UilMicrophone, UilMicrophoneSlash } from '@iconscout/react-unicons';

interface VoiceControlProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

const VoiceControl: React.FC<VoiceControlProps> = ({ onTranscript, disabled }) => {
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  const startListening = () => {
    if (!speechSupported || disabled) return;

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setPulseKey(prev => prev + 1);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  if (!speechSupported) {
    return (
      <motion.button
        type="button"
        disabled
        className="relative p-4 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-xl cursor-not-allowed flex items-center justify-center overflow-hidden"
        title="Speech recognition not supported in your browser"
        whileHover={{ scale: 1.05 }}
      >
        <UilMicrophoneSlash size={24} />
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={startListening}
      disabled={disabled || isListening}
      className={`relative p-4 rounded-xl transition-all duration-300 flex items-center justify-center overflow-hidden shadow-lg ${
        isListening 
          ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white' 
          : 'bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-green-500'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      title={isListening ? 'Listening...' : 'Click to speak'}
      aria-label={isListening ? 'Stop listening' : 'Start voice input'}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulsing background effect when listening */}
      <AnimatePresence>
        {isListening && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`${pulseKey}-${i}`}
                className="absolute inset-0 bg-red-500/50 rounded-xl"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Icon */}
      <AnimatePresence mode="wait">
        {isListening ? (
          <motion.div
            key="listening"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative z-10 flex items-center gap-2"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <UilMicrophone size={24} />
            </motion.div>
            
            {/* Sound waves */}
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-white rounded-full"
                  animate={{ height: ['8px', '16px', '8px'] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative z-10"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <UilMicrophone size={24} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip */}
      {!isListening && !disabled && (
        <motion.div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
          initial={{ opacity: 0, y: -5 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          Speak your mood
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45" />
        </motion.div>
      )}
    </motion.button>
  );
};

export default VoiceControl;
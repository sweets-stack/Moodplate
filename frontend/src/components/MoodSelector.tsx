import React from 'react'

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void
  disabled?: boolean
}

const moods = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😴', label: 'Tired', value: 'tired' },
  { emoji: '🤩', label: 'Excited', value: 'excited' },
  { emoji: '😌', label: 'Relaxed', value: 'relaxed' },
  { emoji: '🥶', label: 'Cold', value: 'cold' },
  { emoji: '🔥', label: 'Energetic', value: 'energetic' },
  { emoji: '🤒', label: 'Sick', value: 'sick' },
  { emoji: '🎉', label: 'Celebratory', value: 'celebratory' },
]

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect, disabled }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Or pick a common mood:</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {moods.map((mood) => (
          <button
            key={mood.value}
            type="button"
            onClick={() => onMoodSelect(mood.value)}
            disabled={disabled}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Select ${mood.label} mood`}
          >
            <span className="text-xl">{mood.emoji}</span>
            <span className="text-sm font-medium">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MoodSelector
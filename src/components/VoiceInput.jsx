function VoiceInput({
  fromLang,
  setText,
}) {
  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert(
        'Tu navegador no soporta reconocimiento de voz'
      )
      return
    }

    const recognition =
      new SpeechRecognition()

    recognition.lang =
      fromLang === 'es'
        ? 'es-ES'
        : 'en-US'

    recognition.start()

    recognition.onresult = (
      event
    ) => {
      const voiceText =
        event.results[0][0]
          .transcript

      setText(voiceText)
    }
  }

  return (
    <button
      onClick={startVoiceInput}
    >
      🎤 Hablar
    </button>
  )
}

export default VoiceInput
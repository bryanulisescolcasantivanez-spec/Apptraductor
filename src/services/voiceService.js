import { SpeechRecognition } from '@capacitor-community/speech-recognition'

export const startVoice = async (setText, lang = 'es-ES') => {
  const permission = await SpeechRecognition.requestPermissions()

  if (permission.speechRecognition !== 'granted') {
    alert('Permiso de micrófono denegado')
    return
  }

  await SpeechRecognition.start({
    language: lang,
    partialResults: true,
  })

  SpeechRecognition.addListener('partialResults', (data) => {
    setText(data.matches[0])
  })
}
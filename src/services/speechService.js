import { TextToSpeech } from '@capacitor-community/text-to-speech'

export const speakText = async (text, lang = 'es-ES') => {
  await TextToSpeech.speak({
    text,
    lang,
    rate: 1.0
  })
}
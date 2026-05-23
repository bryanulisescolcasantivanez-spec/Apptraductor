import { useEffect, useState } from 'react'
import { translateText } from './services/translateService'
import './style/style.css'
import { speakText } from './services/speechService'
import { startVoice } from './services/voiceService'

function App() {
  const [text, setText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [fromLang, setFromLang] = useState('es')
  const [toLang, setToLang] = useState('en')
  const [history, setHistory] = useState([])


  
  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem('history')) || []

    setHistory(savedHistory)
  }, [])

  const saveHistory = (item) => {
    let newHistory = [item, ...history]

    newHistory = newHistory.slice(0, 5)

    setHistory(newHistory)

    localStorage.setItem(
      'history',
      JSON.stringify(newHistory)
    )
  }

  const handleTranslate = async () => {
    if (!text.trim()) return

    try {
      const result = await translateText(
        text,
        fromLang,
        toLang
      ) 

      setTranslatedText(result)

      saveHistory({
        original: text,
        translated: result,
      })
    } catch (error) {
      console.error(error)
      alert('Error al traducir')
    }
  }

  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Tu navegador no soporta reconocimiento de voz')
      return
    }

    const recognition = new SpeechRecognition()

    recognition.lang =
      fromLang === 'es' ? 'es-ES' : 'en-US'

    recognition.start()

    recognition.onresult = (event) => {
      const voiceText =
        event.results[0][0].transcript

      setText(voiceText)
    }
  }

  const speakTranslation = () => {
    if (!translatedText) return

    const utterance =
      new SpeechSynthesisUtterance(
        translatedText
      )

    utterance.lang =
      toLang === 'es' ? 'es-ES' : 'en-US'

    speechSynthesis.speak(utterance)
  }

  const swapLanguages = () => {
    setFromLang(toLang)
    setToLang(fromLang)

    setText(translatedText)
    setTranslatedText(text)
  }

  return (
    <div className="app">
      <div className="card">
        <h1>🌎 Traductor IA</h1>

        <div className="selectors">
          <select
            value={fromLang}
            onChange={(e) =>
              setFromLang(e.target.value)
            }
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="fr">Francés</option>
          </select>

          <button onClick={swapLanguages}>
            ⇄
          </button>

          <select
            value={toLang}
            onChange={(e) =>
              setToLang(e.target.value)
            }
          >
            <option value="en">Inglés</option>
            <option value="es">Español</option>
            <option value="fr">Francés</option>
          </select>
        </div>

        <textarea
          placeholder="Escribe o habla..."
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
        />

        <div className="buttons">
          <button onClick={handleTranslate}>
            Traducir
          </button>

          <button onClick={() => startVoice(setText, fromLang)}>
            🎤 Hablar
          </button>
        </div>

        <div className="result">
          <h3>Traducción</h3>

          <p>{translatedText}</p>

          <button onClick={() =>
            speakText(translatedText, 'en-US')
          }>
            🔊 Escuchar
          </button>
        </div>

        <div className="history">
          <h3>Historial</h3>

          {history.length === 0 && (
            <p>No hay traducciones</p>
          )}

          {history.map((item, index) => (
            <div
              className="history-item"
              key={index}
            >
              <strong>{item.original}</strong>
              <p>{item.translated}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
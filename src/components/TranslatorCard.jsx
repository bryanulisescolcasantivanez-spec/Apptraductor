import LanguageSelector from './LanguageSelector'
import VoiceInput from './VoiceInput'

function TranslatorCard({
  text,
  setText,
  translatedText,
  fromLang,
  toLang,
  setFromLang,
  setToLang,
  handleTranslate,
  speakTranslation,
  swapLanguages,
}) {
  return (
    <div className="card">
      <h1>
        🌎 Traductor IA
      </h1>

      <LanguageSelector
        fromLang={fromLang}
        toLang={toLang}
        setFromLang={setFromLang}
        setToLang={setToLang}
        swapLanguages={
          swapLanguages
        }
      />

      <textarea
        placeholder="Escribe o habla..."
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <div className="buttons">
        <button
          onClick={
            handleTranslate
          }
        >
          Traducir
        </button>

        <VoiceInput
          fromLang={fromLang}
          setText={setText}
        />
      </div>

      <div className="result">
        <h3>Traducción</h3>

        <p>{translatedText}</p>

        <button
          onClick={
            speakTranslation
          }
        >
          🔊 Escuchar
        </button>
      </div>
    </div>
  )
}

export default TranslatorCard
function LanguageSelector({
  fromLang,
  toLang,
  setFromLang,
  setToLang,
  swapLanguages,
}) {
  return (
    <div className="selectors">
      <select
        value={fromLang}
        onChange={(e) =>
          setFromLang(e.target.value)
        }
      >
        
        <option value="es">
          Español
        </option>

        <option value="en">
          Inglés
        </option>

        <option value="fr">
          Francés
        </option>

        <option value="pt">
          Portugués
        </option>
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
        <option value="en">
          Inglés
        </option>

        <option value="es">
          Español
        </option>

        <option value="fr">
          Francés
        </option>

        <option value="pt">
          Portugués
        </option>
      </select>
    </div>
  )
}

export default LanguageSelector
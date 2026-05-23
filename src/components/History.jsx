function History({ history }) {
  return (
    <div className="history">
      <h3>📜 Historial</h3>

      {history.length === 0 ? (
        <p>No hay traducciones</p>
      ) : (
        history.map((item, index) => (
          <div
            className="history-item"
            key={index}
          >
            <strong>{item.original}</strong>

            <p>{item.translated}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default History
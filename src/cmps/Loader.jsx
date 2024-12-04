export function Loader({ text = 'Loading...' }) {
    return (
      <section className="loader-container">
        <div className="animation">
          <span></span>
          <span className="dot2"></span>
          <span></span>
        </div>
        <p>{text}</p>
      </section>
    )
  }
  
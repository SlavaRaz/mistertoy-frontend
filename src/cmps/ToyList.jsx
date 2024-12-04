import { Link } from 'react-router-dom'
import { ToyPreview } from './ToyPreview.jsx'

export function ToyList({ toys, onRemoveToy }) {
  return (
    <section className="toy-list">
      <ul>
        {toys.map(toy => (
          <li key={toy._id}>
            <ToyPreview toy={toy} />
            <div className="btn-container">
              <button>
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
              </button>
              <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

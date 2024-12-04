import { useEffect, useState } from 'react'
import { Loader } from '../cmps/Loader.jsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { showErrorMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy.service.local.js'


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Cannot load toy', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }


    if (!toy) return <Loader />

    return (
        <section className="toy-details" style={{ textAlign: 'center' }}>
            <h1>
                Toy name: <span>{toy.name}</span>
            </h1>
            <h1>
                Toy price: <span>{toy.price}</span>
            </h1>
            <h1>
                Labels: <span>{toy.labels.join(' ,')}</span>
            </h1>
            <h1 className={toy.inStock ? 'green' : 'red'}>
                {/* {toy.inStock ? 'In stock' : 'Not in stock'} */}
            </h1>
            <button>
                <Link to="/toy">Back</Link>
            </button>
        </section>
    )

}
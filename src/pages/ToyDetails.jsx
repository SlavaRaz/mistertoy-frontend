import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Loader } from '../cmps/Loader.jsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
// import { ToyMsgList } from "../cmps/ToyMsgList.jsx"
import { AddToyMsg } from "../cmps/AddToyMsg.jsx"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [isLoadingMsg, setIsLoadingMsg] = useState(false)
    const [isShowMsgModal, setIsShowMsgModal] = useState(null)

    const user = useSelector(state => state.userModule.loggedInUser)

    const { toyId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Cannot load toy details', err)
            navigate('/toy')
        }

    }

    function onToggleMsgModal() {
        setIsShowMsgModal((prevIsMsgModal) => !prevIsMsgModal)
    }

    async function onSaveToyMsg(toyId, msgToAdd) {
        try {
            setIsLoadingMsg(true)
            const msg = await toyService.saveToyMsg(toyId, msgToAdd)
            setToy(prevToy => ({
                ...prevToy,
                msgs: [msg, ...prevToy.msgs],
            }))
        } catch (err) {
            console.error('Failed to save message:', err)
            alert(`Failed to add message: ${err.message}`)
        } finally {
            setIsLoadingMsg(false)
        }
    }

    async function onRemoveToyMsg(toyId, msgId) {
        try {
            setIsLoadingMsg(true)
            const updatedToy = await toyService.removeToyMsg(toyId, msgId)
            setToy(prevToy => ({
                ...prevToy,
                msgs: prevToy.msgs.filter(msg => msg.id !== msgId),
            }))
        } catch (err) {
            console.error('Failed to remove message:', err)
            alert(`Failed to remove message: ${err.message}`)
        } finally {
            setIsLoadingMsg(false)
        }
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
            <button className="add-msg-btn" onClick={onToggleMsgModal}>Add a Message</button>
            {isShowMsgModal && (
                <AddToyMsg
                    toyId={toyId}
                    toggleMsg={onToggleMsgModal}
                    saveToyMsg={onSaveToyMsg}
                />
            )}

            {/* <div className='msg-container'>
                {!isLoadingMsg
                    ? <ToyMsgList
                        toyId={toy._id}
                        msgs={toy.msgs}
                        onRemoveToyMsg={onRemoveToyMsg}
                    />
                    : <Loader />
                }
            </div> */}
        </section>
    )

}
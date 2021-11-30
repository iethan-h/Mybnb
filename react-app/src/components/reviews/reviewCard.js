import { useDispatch,useSelector} from "react-redux";
import { useParams } from 'react-router'
import {deleteReview, editReview} from '../../store/review'
import { Modal } from '../../context/Modal';
import { useState, useEffect } from 'react'
import ReviewEdit from './editReview'
import './reviews.css'


const ReviewCard = ({review}) =>{
    const [showModal, setShowModal] = useState(false);
    const userId = useSelector((state) => state.session?.user?.id)
    const dispatch = useDispatch();
    
    const handleDelete = async (e) => {
        e.preventDefault()
        dispatch(deleteReview(review.id))
    }
    
    return(
        <div className='feedWrapper'>
        <div className='reviewBox'>
            <div>
                <p className="reviews">{review.review}</p>
            </div>
            <div>
                {review?.userId === userId ?
                <>
                <div className='userOptions'>
                    <button type="button" onClick={handleDelete}>Delete review</button> 
                        
                    <button onClick={() => setShowModal(true)}>Edit Review</button>
                        {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                                <ReviewEdit setShowModal={setShowModal} reviewId={review.id}/>
                            </Modal>
                        )}
                </div>
                </>
                :
                null}
            </div>
        </div>
        </div>
    )
}

export default ReviewCard
import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#app')

const ImageCaptureModal = (props) => (
    <Modal
        isOpen={!!props.imgDataUrl}
        contentLabel="captured image"
        onRequestClose={props.removeImage}
        closeTimeoutMS={200}
        className="modal"
    >
        <div className="modal-content">
            <h3>Captured Image</h3>
            <img src={props.imgDataUrl}></img>
            <div className="modal-actions">
                <button
                    className="button is-medium is-danger action-btn"
                    onClick={props.removeImage}
                >
                    Cancel</button>
                <button
                    className={`button is-medium is-success action-btn ${props.emailLoading && 'is-loading'}`}
                    onClick={props.submitImage}
                >
                    Send</button>
            </div>
        </div>
    </Modal>
)

export default ImageCaptureModal
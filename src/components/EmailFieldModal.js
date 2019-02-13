import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#app')

const EmailFieldModal = () => (
    <Modal
        isOpen={true}
        className="modal"   
    >
        <div className="modal-content">
            <button
                className="button is-medium is-success"
                style={{
                    width: '20%'
                }}
            >Send</button>
        </div>
    </Modal>
)

export default EmailFieldModal
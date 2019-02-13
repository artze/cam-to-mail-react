import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#app')

const EmailFieldModal = () => (
    <Modal
        isOpen={true}
        className="modal"   
    >
        <div className="modal-content">
            <label
                className="label is-large"
                style={{
                    width: '100%'
                }}
            >Email</label>
            <input className="input is-large" type="text" placeholder="Type your email here" />
            <button
                className="button is-medium is-success"
                style={{
                    'margin-top': '1em'
                }}
            >Send</button>
        </div>
    </Modal>
)

export default EmailFieldModal
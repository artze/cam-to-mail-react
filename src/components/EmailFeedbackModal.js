import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#app')

const EmailFeedbackModal = (props) => (
    <Modal
        isOpen={!!props.emailFeedbackMsg}
        className="modal"
    >
        <div className="modal-content">
            <p
                style={{
                    textAlign: 'center',
                    width: '100%',
                    marginBottom: '2em'
                }}
            >{props.emailFeedbackMsg}</p>
            <button
                className="button is-medium is-info"
                style={{
                    width: '20%'
                }}
                onClick={props.clearEmailFeedbackMsg}
            >OK</button>
        </div>
    </Modal>
)

export default EmailFeedbackModal
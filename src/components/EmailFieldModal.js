import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#app')

class EmailFieldModal extends React.Component {
    inputElement = ''

    handleImageSubmit = () => {
        const emailValue = this.inputElement.value
        this.props.submitImage(emailValue)
    }

    render() {
        return (
            <Modal
                isOpen={this.props.emailFieldModal}
                className="modal"
                onRequestClose={this.props.closeEmailFieldModal}
            >
                <div className="modal-content">
                    <label
                        className="label is-large"
                        style={{
                            width: '100%'
                        }}
                    >Email</label>
                    <input
                        className="input is-large"
                        type="text"
                        placeholder="Type your email here"
                        ref={ref => this.inputElement = ref}
                    />
                    <button
                        className={`button is-medium is-success ${this.props.emailLoading && 'is-loading'}`}
                        onClick={this.handleImageSubmit}
                        style={{
                            marginTop: '1em'
                        }}
                    >Send</button>
                </div>
            </Modal>
        )
    }
}

export default EmailFieldModal
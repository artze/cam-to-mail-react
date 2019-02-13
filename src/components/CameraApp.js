import React from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'
import ImageCaptureModal from './ImageCaptureModal'
import EmailFeedbackModal from './EmailFeedbackModal'
import switchCamIcon from '../../public/images/switch-camera.png'

class CameraApp extends React.Component {
    videoStream = ''
    videoElement = ''
    canvasElement = ''

    state = {
        imgDataUrl: '',
        videoDevicesIdArr: [],
        selectedVideoDeviceIndex: 0,
        emailLoading: false,
        emailFeedbackMsg: ''
    }

    getVideoDevices = () => {
        return new Promise((resolve, reject) => {
            navigator.mediaDevices.enumerateDevices()
                .then((devices) => {
                    const videoDevices = devices.filter((device) => device.kind === 'videoinput')
                    this.setState(() => ({ videoDevicesIdArr: videoDevices.map((device) => device.deviceId) }))
                    resolve()
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    displayCameraFeed = () => {
        const constraints = {
            video: {
                deviceId: {
                    exact: this.state.videoDevicesIdArr[this.state.selectedVideoDeviceIndex]
                },
                height: window.screen.orientation.type === 'landscape-primary' ? 842 : 595,
                width: window.screen.orientation.type === 'landscape-primary' ? 595 : 842
            }
        }

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                this.videoStream = stream
                this.videoElement.srcObject = stream
            })
    }

    stopAllVideoTracks = () => {
        if(this.videoStream && this.videoStream.getVideoTracks().length > 0) {
            this.videoStream.getVideoTracks().forEach((track) => {
                track.stop()
            })
        }
    }

    cycleThroughVideoDevices = () => {
        if(this.state.selectedVideoDeviceIndex === this.state.videoDevicesIdArr.length - 1) {
            this.setState(() => ({ selectedVideoDeviceIndex: 0 }), () => {
                this.stopAllVideoTracks()
                this.displayCameraFeed()
            })
        } else {
            this.setState((prevState) => ({ selectedVideoDeviceIndex: prevState.selectedVideoDeviceIndex + 1 }), () => {
                this.stopAllVideoTracks()
                this.displayCameraFeed()
            })
        }
    }

    captureImage = () => {
        this.canvasElement.width = this.videoElement.videoWidth
        this.canvasElement.height = this.videoElement.videoHeight
        this.canvasElement.getContext('2d').drawImage(this.videoElement, 0, 0)
        this.setState(() => ({ imgDataUrl: this.canvasElement.toDataURL('image/webp') }))
    }

    removeImage = () => {
        this.setState(() => ({ imgDataUrl: '' }))
    }

    submitImage = () => {
        this.setState(() => ({ emailLoading: true }))
        const imgData = this.canvasElement.toDataURL('image/png')
        
        const doc = new jsPDF()
        doc.addImage(imgData, 'PNG', 5, 5)
        const pdfBlob = doc.output('blob')
        
        const form = document.forms.namedItem('imageUploadForm')
        const formDataToUpload = new FormData(form)
        formDataToUpload.append('pdfFile', pdfBlob)

        
        axios.post('/pdf-mails', formDataToUpload)
            .then(() => {
                this.setState(() => ({
                    emailLoading: false,
                    imgDataUrl: '',
                    emailFeedbackMsg: 'Email was sent successfully.'
                }))
            })
            .catch((err) => {
                this.setState(() => ({
                    emailLoading: false,
                    imgDataUrl: '',
                    emailFeedbackMsg: 'Email sending failed.'
                }))
                console.log('Submission Error:', err)
            })
    }

    clearEmailFeedbackMsg = () => {
        this.setState(() => ({ emailFeedbackMsg: '' }))
    }

    componentDidMount() {
        this.getVideoDevices()
            .then(() => {
                this.displayCameraFeed()
            })
            .catch((err) => {
                console.log(err)
            })
        window.addEventListener('orientationchange', () => {
            this.stopAllVideoTracks()
            this.displayCameraFeed()
        })
    }

    render() {
        return (
            <div className="grid-container">
                <h2>Cam to Mail</h2>
                <div className="video-container">
                    <video
                        id="cam-feed"
                        autoPlay
                        ref={ref => this.videoElement = ref}
                    />
                    <div className="cam-actions">
                        <button
                            className="button is-info is-large capture-btn"
                            onClick={this.captureImage}
                        >
                            Capture Image
                        </button>
                        <button
                            className="button is-info is-large cam-switch-btn"
                            disabled={this.state.videoDevicesIdArr.length <= 1}
                            onClick={this.cycleThroughVideoDevices}
                        >
                            <img src={switchCamIcon} />
                        </button>
                    </div>
                </div>
                <canvas style={{ display: 'none' }} ref={ref => this.canvasElement = ref} />
                <form encType="multipart/form-data" name="imageUploadForm" style={{ display: 'none' }}>
                </form>
                <ImageCaptureModal
                    imgDataUrl={this.state.imgDataUrl}
                    removeImage={this.removeImage}
                    submitImage={this.submitImage}
                    emailLoading={this.state.emailLoading}></ImageCaptureModal>
                <EmailFeedbackModal
                    emailFeedbackMsg={this.state.emailFeedbackMsg}
                    clearEmailFeedbackMsg={this.clearEmailFeedbackMsg}
                ></EmailFeedbackModal>
            </div>
        )
    }
}

export default CameraApp
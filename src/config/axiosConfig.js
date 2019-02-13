import axios from 'axios'

const axiosConfig = () => {
    // eslint-disable-next-line no-undef
    if(process.env.NODE_ENV === 'development') {
        axios.defaults.baseURL = 'http://localhost:3000/api'
    // eslint-disable-next-line no-undef
    } else if(process.env.NODE_ENV === 'production') {
        axios.defaults.baseURL = 'https://artze.xyz/api'
    }
}

export default axiosConfig
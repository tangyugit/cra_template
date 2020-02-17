import axios from '@/utils/axios'
import apiUrl from '@/utils/api_url'

const home = {
    test(params) {
        return axios.post({ url: 'http://localhost:8333/index', params });
    }
}

export {
    home
}
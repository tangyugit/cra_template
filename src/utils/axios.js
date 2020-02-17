import axios from 'axios'
import qs from 'qs'

//请求拦截器
axios.interceptors.request.use(config=> {
    return config;
}, err=> {
    return Promise.reject(err.toString());
});

//响应拦截器
axios.interceptors.response.use(res=> {
    return res.status === 200 ? res.data : Promise.reject(res.statusText || '接口查询失败，请稍后再试！');
}, err=> {
    return Promise.reject(err.toString());
});

class Request {
    get({ url, params={}, timeout=20000 } = {}) {
        return new Promise((resolve, reject)=> {
            axios.get(url, {
                params: { ...params, timeStamp: new Date().getTime() },
                timeout
            }).then(res=> {
                resolve(res);
            }).catch(err=> {
                reject(err.toString());
            })
        });
    }
    post({ url, params={}, timeout=20000, headers={ 'content-type': 'application/x-www-form-urlencoded'} } = {}) {
        return new Promise((resolve, reject)=> {
            axios.post(url, qs.stringify({ ...params, timeStamp: new Date().getTime() }), {
                headers,
                timeout
            }).then(res=> {
                resolve(res);
            }).catch(err=> {
                reject(err.toString());
            })
        });
    }
}

const request = new Request();

export default request
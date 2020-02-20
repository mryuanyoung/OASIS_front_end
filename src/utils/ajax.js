const Request = (method, url, headers={}, data={},timeout=2000) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));
        xhr.timeout = timeout;
        xhr.onload = (e) => {
            if(e.target.status < 400) resolve(e.target.response);
            else reject(e.target.status);
        }
        xhr.onerror = (err) => reject(err);
        method === 'post'? xhr.send(data) : xhr.send();
    }).then(res => res);
}

export const getRequest = Request.bind(Object.create(null), 'get');
export const postRequest = Request.bind(Object.create(null), 'post');
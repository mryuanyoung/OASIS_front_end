const Request = (method, url, timeoutHandle, headers={}, data={}) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));
        xhr.timeout = 2000;
        xhr.ontimeout = timeoutHandle;
        xhr.onload = (e) => {
            if(e.target.status < 400) resolve(e.target.response);
            else reject(e.target.status);
        }
        xhr.onerror = (err) => reject(err);
        method === 'POST'? xhr.send(data) : xhr.send();
    }).then(res => res, timeoutHandle);
}

export const getRequest = Request.bind(Object.create(null), 'GET');
export const postRequest = Request.bind(Object.create(null), 'POST');
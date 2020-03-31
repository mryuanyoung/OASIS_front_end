export default function(fn, time=16){
    let startTime = null;
    return function(...rest){
        const _this = this;
        let t = Date.now();
        if(startTime === null || t - startTime >= time){
            fn.apply(_this, rest);
            startTime = t;
        }
    }
}
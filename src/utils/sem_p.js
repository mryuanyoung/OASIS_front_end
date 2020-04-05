export default function(fn, time){
    let canRun = true;
    return function(...rest){
        const _this = this;
        if(canRun){
            canRun = false;
            fn.apply(_this, rest);
        }
    }
}
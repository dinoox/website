import {defineNuxtPlugin} from "#app";


export default defineNuxtPlugin(() => {
    return {
        provide: {
            decomposeMatrix3D(ele, attr) {

                let transformArr = ['rotate', 'rotateX', 'rotateY', 'rotateZ',
                    'translate', 'translateX', 'translateY', 'translateZ',
                    'scale', 'scaleX', 'scaleY',
                    'skew', 'skewX', 'skewY'];


                const getOrSet = (a) => {
                    return Object.prototype.toString.call(a) == '[object Object]';
                }


                const transform = (transArr: null | Array<string>) => {
                    if (!ele.transform) {
                        ele.transform = {}; //第一次
                    }

                    if (!getOrSet(attr)) {
                        if (!Object.keys(ele.transform).includes(attr)) {//从未调用该方法设置过，返回默认值
                            if (['scale', 'scaleX', 'scaleY'].includes(attr)) {
                                return 1;
                            } else {
                                return 0
                            }
                        }
                        return ele.transform[attr];

                    } else { //设置transform相关属性

                        // 保存属性
                        for (let v of transArr) {
                            ele.transform[v] = attr[v];
                        }

                        //拼接属性值及单位  rotate/skew: deg   translate: px   scale: 无
                        let str = '';
                        for (let v of transArr) {
                            switch (v) {
                                case 'rotate':
                                case 'rotateX':
                                case 'rotateY':
                                case 'rotateZ':
                                case 'skew':
                                case 'skewX':
                                case 'skewY':
                                    str += v + `(${ele.transform[v]}deg) `;
                                    break;
                                case 'translate':
                                case 'translateX':
                                case 'translateY':
                                case 'translateZ':
                                    str += v + `(${ele.transform[v]}px) `;
                                    break;
                                case 'scale':
                                case 'scaleX':
                                case 'scaleY':
                                    str += v + `(${ele.transform[v]}) `;
                                    break;
                            }
                        }
                        ele.style.transform = str;
                    }
                }


                if (!getOrSet(attr) && transformArr.includes(attr)) {  //获取并且为transform相关属性
                    return transform(null);
                } else {
                    const attrKeys = Object.keys(attr);
                    //过滤掉transform相关以外的属性
                    let arr = attrKeys.filter((item) => {
                        return transformArr.includes(item)
                    })

                    transform(arr)
                }
            }

        }
    }
})
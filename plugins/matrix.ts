import { defineNuxtPlugin } from "#app";


export default defineNuxtPlugin(() => {
    return {
        provide: {
            decomposeMatrix3D(ele, attr: string): string {

                let transformArr = ['rotate', 'rotateX', 'rotateY', 'rotateZ',
                    'translate', 'translateX', 'translateY', 'translateZ',
                    'scale', 'scaleX', 'scaleY',
                    'skew', 'skewX', 'skewY'];

                let transform = ele.style.transform;
                if (!transform || !transformArr.includes(attr)) return null
                

                const t = (attr: string): string => {

                    //拼接属性值及单位  rotate/skew: deg   translate: px   scale: 无
                    let str: string;
                    let arr = transform.split(/[(,)]/);
                    console.log(arr);
                    

                    switch (attr) {
                        case 'rotate':
                        case 'rotateX':
                        case 'rotateY':
                        case 'rotateZ':
                        case 'skew':
                        case 'skewX':
                        case 'skewY':
                        case 'translate':
                        case 'translateX': str = arr[13] 
                        break
                        case 'translateY': str = arr[14]
                        break
                        case 'translateZ': str = arr[15]
                        break
                        case 'scale':
                        case 'scaleX':
                        case 'scaleY':
                            break;
                    }
                    return str;
                }
                
                return t(attr);
            }

        }
    }
})
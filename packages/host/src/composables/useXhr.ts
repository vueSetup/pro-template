import { reactive, toRefs } from "vue"

/**
 * Generate a 6-digit unique string with prefix `"__vc_" + ${prefix}`
 * https://github.com/Tencent/vConsole/blob/dev/src/lib/tool.ts#L452
 */
export const getUniqueID = (prefix: string = '') => {
    return '__vc_' + prefix + Math.random().toString(36).substring(2, 8);
}

/**
 * RequestItem(Lite)
 * https://github.com/Tencent/vConsole/blob/dev/src/network/requestItem.ts
 */
export class RequestItem {
    id: string = '';
    status: number | string = 0; // HTTP status codes
    statusText?: string = ''; // for display
    cancelState?: 0 | 1 | 2 | 3 = 0; // 0=no cancel; 1=abort (for XHR); 2=cancel (for Fetch); 3=timeout;
    readyState?: XMLHttpRequest['readyState'] = 0;

    constructor() {
        this.id = getUniqueID();
    }
}

export type IOnUpdateCallback = (item: RequestItem) => void

/**
* XHRProxyHandler(Lite)
* https://github.com/Tencent/vConsole/blob/dev/src/network/xhr.proxy.ts#L6
*/
export class XHRProxyHandler<T extends XMLHttpRequest> implements ProxyHandler<T> {
    public XMLReq: XMLHttpRequest

    constructor(XMLReq: XMLHttpRequest, onUpdateCallback?: IOnUpdateCallback) {
        this.XMLReq = XMLReq
        this.XMLReq.onreadystatechange = () => { this.onReadyStateChange() }
        this.XMLReq.onabort = () => { this.onAbort() }
        this.XMLReq.ontimeout = () => { this.onTimeout() }
    }

    // public get(target: T, key: string) {
    //     // if (typeof key === 'string') { console.log('Proxy get:', typeof key, key) }
    //     switch (key) {
    //         default:
    //             const value = Reflect.get(target, key)
    //             if (typeof value === 'function') {
    //                 return value.bind(target)
    //             } else {
    //                 return value
    //             }
    //     }
    // }

    public set(target: T, key: string, value: any) {
        // if (typeof key === 'string') { console.log('Proxy set:', typeof key, key) }
        switch (key) {
            case 'onreadystatechange':
                return this.setOnReadyStateChange(target, key, value)
            case 'onabort':
                return this.setOnAbort(target, key, value)
            case 'ontimeout':
                return this.setOnTimeout(target, key, value)
            default:
            // do nothing
        }
        return Reflect.set(target, key, value)
    }

    protected setOnReadyStateChange(target: T, key: string, value) {
        return Reflect.set(target, key, (...args) => {
            this.onReadyStateChange()
            value.apply(target, args)
        })
    }

    protected setOnAbort(target: T, key: string, value) {
        return Reflect.set(target, key, (...args) => {
            this.onAbort()
            value.apply(target, args)
        })
    }

    protected setOnTimeout(target: T, key: string, value) {
        return Reflect.set(target, key, (...args) => {
            this.onTimeout()
            value.apply(target, args)
        })
    }

    onReadyStateChange = () => {

    }

    onAbort = () => {
    }

    onTimeout = () => {
    }
}

/**
 * XHRProxy
 * https://github.com/Tencent/vConsole/blob/dev/src/network/xhr.proxy.ts#L231
 */
export class XHRProxy {
    public static create(onUpdateCallback: IOnUpdateCallback) {
        return new Proxy(XMLHttpRequest, {
            construct(ctor) {
                const XMLReq = new ctor()
                debugger
                XMLReq.withCredentials = true
                return new Proxy(XMLReq, new XHRProxyHandler(XMLReq, onUpdateCallback))
            }
        })
    }
}

export const useXhr = () => {
    if (!window.hasOwnProperty('XMLHttpRequest')) {
        return
    }

    const state = reactive<{
        requests: RequestItem[]
    }>({
        requests: []
    })


    window.XMLHttpRequest = XHRProxy.create((item) => {
        state.requests.push(item)
    })

    return toRefs(state)
}
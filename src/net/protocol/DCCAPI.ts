
export interface APIRequest{
    url?:string,
    encrypt?:boolean,
    keyField?:string,
    key?:string,
    request:{[key:string]:any};
    raw?:boolean;
}

export interface APIResponse{
    error:boolean,
    errorMsg:string|null,
    data:any
}

export enum APIErrors {
    UNAUTHORIZED_1 = "core.01",
    UNAUTHORIZED_2 = "core.02",
    AUTH_INACTIVE = 'wauth01 Inactive web auth',
    AUTH_PASSWORD_MISMATCH = 'wauth02 Password mismatch',
    AUTH_RESET_PASSWORD_MISMATCH = 'wauth03 Reset password mismatch',
    AUTH_NO_RESET_ACCESS = 'wauth04 User can reset hash only fow itself',
    AUTH_EXPIRED = 'wauth05 Expired password',
}

class DCCAPI{
    private readonly _authKey: string | null = null

    constructor(authKey?: string) {
        if (authKey) this._authKey = authKey
    }

    static base:String= 'qIWDHpg9FCzUAQNJ8XfML0yORZeY5B4PT7anmkjGE1bv6dxoh3lrS2tVwiscKu';
    public debug:boolean=true;
    public log?:(txt:string)=>void;

    static getBaseNumber(sourceNumber:number):string{
        let r = sourceNumber % 62;
        let result = '';
        if (sourceNumber - r === 0)
            result = DCCAPI.base.charAt(r);
        else
            result = DCCAPI.getBaseNumber((sourceNumber - r) / 62) + '' + DCCAPI.base.charAt(r);
        return result;
    }

    static unpack(str:string, key:string):string {
        if (!key)
            return "NO KEY";
        if (!str)
            return "";

        const keyLen = key.length;
        const strLen = str.length;
        if (strLen % 2 !== 0)
            return str;

        let m = 0;
        let n = 0;
        let decoded = "";
        while (m < strLen) {
            let code;
            let i = '';
            let mStep = 2;
            if (str.charAt(m) === '-') {
                i = str.charAt(m + 1) + '' + str.charAt(m + 2) + '' + str.charAt(m + 3);
                code = DCCAPI.getNumberByBase(i);
                mStep = 4;
            }
            else {
                i = str.charAt(m) + '' + str.charAt(m + 1);
                if (str.charAt(m) === '.')
                    i = str.charAt(m + 1);
                code = DCCAPI.getNumberByBase(i);
            }
            code -= key.charCodeAt(n);
            decoded += String.fromCharCode(code);
            n++;
            if (n === keyLen)
                n = 0;
            m += mStep;
        }
        return decoded;
    }

    static pack(str:string, key:string):string|null{
        let keyLen = key.length;
        if (keyLen === 0)
            return null;
        let encoded = '';
        let m = 0;
        let n = 0;
        while (n < str.length) {
            let chr = DCCAPI.getBaseNumber(str.charCodeAt(n++) + key.charCodeAt(m));
            if (chr.length === 1){
                chr = '.' + chr;
            }
            if (chr.length === 3) {
                encoded += '-' + chr;
            }
            else {
                encoded += chr;
            }
            m++;
            if (m === keyLen)
                m = 0;
        }
        return encoded;
    }

    static getNumberByBase(baseString:string):number{
        let m = baseString.length - 1;
        let res = 0;
        let pow = 0;
        while (m > -1)
            res += DCCAPI.base.indexOf(baseString.charAt(m--)) * Math.pow(62, (pow++));
        return res;
    }
  //@ts-ignore
    static getKey(password: string): string {
        /*
      const hash = crypto.createHash('sha256')
      hash.update(password)
      return hash.digest('hex')*/
      return ""
    }
  //@ts-ignore
    static encodeAES(decrypted: string, password: string) {
      /*const key = Buffer.from(DCCAPI.getKey(password), "hex")
      let iv: Buffer = crypto.randomBytes(16)
      const ivBase64 = iv.toString('base64').replace(/=*$/, '')

      if (ivBase64.length !== 22) {
        return false
      }

      if (!iv) return

      iv = Buffer.from(iv, "binary" as any)

      decrypted += md5(decrypted)

      const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)

      let encrypted = cipher.update(decrypted, 'utf8', 'base64')

      encrypted += cipher.final('base64')

      return ivBase64 + encrypted*/
      return ""
    }

    async call(data:APIRequest):Promise<APIResponse>{
        let url = data.url;
        if(!url){
            return {
                error:true,
                errorMsg:"NO URL PROVIDED",
                data: null
            };
        }

        let keyField="key"
        if(data.keyField!=null)
            keyField=data.keyField
        if (!data.key) data.key="web";
        if (this._authKey) data.key = this._authKey

        data.request[keyField]=data.key;
        
        
        if (this.debug) {
            let debug = "\t" + url + "\n";
            debug +="\tRequest:\n";
            for (let n in data.request) {
                if (n.indexOf("pass") > -1) {
                    debug += "\t\t" + n + ": ******\n";
                }
                else {
                    let val = data.request[n];
                    if (typeof val == "object") {
                        let str = "\n\t\t\t";
                        if (Array.isArray(val))
                            str += '[';
                        else
                            str += "{";
                        str += "\n";
                        for (let i in val) {
                            str += "\t\t\t\t" + i + ": " + val[i] + "\n";
                        }
                        if (Array.isArray(val))
                            str += '\t\t\t]';
                        else
                            str += "\t\t\t}";
                        val = str;
                    }
                    if(val && val.length>96)
                        val=val.substr(0,96)+"...";
                    debug += "\t\t" + n + ": " + val + "\n";
                }
            }
            if(this.log)
                this.log(debug);
        }
        
        let key = "12345678901234567890123456789012";
        
        let form = new FormData();
        if(data.encrypt){
            const result = DCCAPI.pack(JSON.stringify(data.request), key);
            form.set("cdata", key + result);
        }else{
            if(data.request)
                for(let i in data.request)
                    form.set(i,data.request[i]);
        }
     
        
          //@ts-ignore
        const promise = new Promise<APIResponse>((resolve:(value:APIResponse)=>void,reject:any)=>{
            let xhr = new XMLHttpRequest();
            xhr.open("post", url!);
              //@ts-ignore
            xhr.onload = (ev:ProgressEvent<EventTarget>) => {
                if (xhr.status > 399) {
                    resolve({
                        error: true,
                        errorMsg: "js...03 wrong http code: " + xhr.status,
                        data: null
                    });
                    return;
                }
                xhr.onload=null;
                xhr.onerror=null;
                this.finish(xhr.response, resolve,(data.raw)?data.raw:false);
            };
              //@ts-ignore
            xhr.onerror = (ev) => {
                xhr.onload=null;
                xhr.onerror=null;
                resolve({
                    error: true,
                    errorMsg: "js...01 load error, code:" + xhr.status,
                    data: null
                });
                return;
            };
    
    
            xhr.send(form);
        })
        

        return promise;
    }

    finish(data:any, callback:(response:APIResponse)=>void,raw:boolean):void{
        if (!data || data.length === 0) {
            callback({
                error: true,
                errorMsg: "js...01 no data",
                data: null
            });
            return;
        }
        let obj = null;
        try {
            obj = JSON.parse(data);
        }catch (e) {
            // not raw, 
            if(!raw){
                callback({
                    error: true,
                    errorMsg: "js...02 wrong json",
                    data: null
                });
                return;
            }
            callback({
                error: false,
                errorMsg: null,
                data: data
            });
            return;
        }

        if (obj!=null && obj.status!=null && obj.status.error) {
            callback({
                error: true,
                errorMsg: obj.status.errorMsg,
                data: null
            });
            return;
        }

        callback({
            error: false,
            errorMsg: null,
            data: obj.data
        });
    }

}

export default DCCAPI;
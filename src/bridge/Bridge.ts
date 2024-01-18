import Signal, { Req } from "badmfck-signal"

interface IWKWebKit{
    messageHandlers:{
        bridge:{
            postMessage:(message:string)=>void
        }
    }
}

type IActionType = "appReady"|"windowOpen"|"webviewOpen"

interface ISendParams{
    action:IActionType,
    params?:{[key:string]:any},
    passthrought?:{[key:string]:any}
}

// MEDIATORS
export const REQ_BRIDGE_WINDOW_OPEN=new Req<string,void>()
export const S_BRIDGE_APP_READY=new Signal<void>();
export const S_WEBVIEW_OPEN = new Signal<{url:string}>();


export class Bridge{
    webkit:IWKWebKit

    constructor(){
        (window as any)['bridge']=this;
        this.webkit=(window as any).webkit
        this.init();
    }

    private init(){
        REQ_BRIDGE_WINDOW_OPEN.listener=async ()=>this.windowOpen();
        S_BRIDGE_APP_READY.subscribe(()=>this.appReady())
        S_WEBVIEW_OPEN.subscribe((params)=>this.webviewOpen(params))
        console.log("Bridge initialized")
    }

    private webviewOpen(params:{url:string}){
        this.send({
            action: "webviewOpen",
            params: {url: params.url}
        })
    }

    private appReady(){
        console.log("TRYING TO CALL APPREADY")
        console.log(">sfa: ",(window as any)['_GLOBAL_SAFE_AREA']);
        console.log(">gid: ",(window as any)['_GLOBAL_ID']);
        this.send({action:"appReady"})
    }
  //@ts-ignore
    private softKeyboardOpen(height:any){
        console.log("Soft keyboard open",height)
    }
  //@ts-ignore
    private softKeyboardClose(){
        console.log("Soft keyboard close")
    }

    private windowOpen():void{
        this.send({
            action:"windowOpen",
            params:{
                id:"popup"
            },
            passthrought:{
                testParam:"hello"
            }
        })
    }

    private send(params:ISendParams){
        try{
            this.webkit.messageHandlers.bridge.postMessage(JSON.stringify(params))
        }catch(e){
            console.warn("Can't execute window postMessage!")
        }
    }
}
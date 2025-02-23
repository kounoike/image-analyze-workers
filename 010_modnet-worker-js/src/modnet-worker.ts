import { getBrowserType, BrowserType } from "./BrowserUtil";
import * as tf from '@tensorflow/tfjs';
import { MODNetConfig, MODNetFunctionType, MODNetOperationParams, WorkerCommand, WorkerResponse } from "./const";
import {setWasmPath} from '@tensorflow/tfjs-backend-wasm';

export { MODNetConfig, MODNetOperationParams }

export const generateMODNetDefaultConfig = ():MODNetConfig => {
    const defaultConf:MODNetConfig = {
        browserType         : getBrowserType(),
        processOnLocal      : false,
        useTFWasmBackend    : false,
        modelPath           : "/modnet/model.json",
        wasmPath            : "/tfjs-backend-wasm.wasm",
        workerPath          : "./modnet-worker-worker.js"
    }
    return defaultConf
}


export const generateDefaultMODNetParams = ():MODNetOperationParams => {
    const defaultParams:MODNetOperationParams = {
        type                : MODNetFunctionType.Segmentation,
        processWidth        : 256,
        processHeight       : 256,
    }
    return defaultParams
}

const load_module = async (config: MODNetConfig) => {
    if(config.useTFWasmBackend){
        console.log("use wasm backend")
      require('@tensorflow/tfjs-backend-wasm')
      setWasmPath(config.wasmPath)
      await tf.setBackend("cpu")
    }else{
      console.log("use webgl backend")
      require('@tensorflow/tfjs-backend-webgl')
      await tf.setBackend("webgl")
    }
}

export class LocalWorker{
    model:tf.GraphModel|null = null
    canvas = document.createElement("canvas")

    init = (config: MODNetConfig) => {
        const p = new Promise<void>((onResolve, onFail) => {
            load_module(config).then(()=>{
                tf.ready().then(async()=>{
                    tf.env().set('WEBGL_CPU_FORWARD', false)
                    this.model = await tf.loadGraphModel(config.modelPath)
                    onResolve()                    
                })
            })
        })
        return p
    }

    predict = async (targetCanvas:HTMLCanvasElement, config: MODNetConfig, params: MODNetOperationParams):Promise<number[][]> => {
        console.log("current backend[main thread]:",tf.getBackend())
        // ImageData作成
        this.canvas.width  = params.processWidth
        this.canvas.height = params.processHeight
        const ctx = this.canvas.getContext("2d")!
        ctx.drawImage(targetCanvas, 0, 0, this.canvas.width, this.canvas.height)
        let bm:number[][]
        tf.tidy(()=>{
            let tensor = tf.browser.fromPixels(this.canvas)
            tensor = tensor.expandDims(0)
            tensor = tf.cast(tensor, 'float32')
            tensor = tensor.div(tf.max(tensor))
            tensor = tensor.sub(0.485).div(0.229)
            let prediction = this.model!.predict(tensor) as tf.Tensor
            bm = prediction.reshape([params.processWidth, params.processHeight]).arraySync() as number[][]

        })
        return bm!
    }
}



export class MODNetWorkerManager{
    private workerMN:Worker|null = null
    private canvasOut = document.createElement("canvas")
    private canvas = document.createElement("canvas")
    private config = generateMODNetDefaultConfig()
    private localWorker = new LocalWorker()
    init = async (config: MODNetConfig|null) =>{
        if(config != null){
            this.config = config
        }
        if(this.workerMN){
            this.workerMN.terminate()
        }
        this.workerMN = null

        if(this.config.processOnLocal == true){
            await this.localWorker.init(this.config!)
            return
        }

        // Bodypix 用ワーカー
        const workerMN = new Worker(this.config.workerPath, { type: 'module' })
        // this.workerMN = new Worker("../dist/modnet-worker-worker.js", { type: 'module' })
        workerMN!.postMessage({message: WorkerCommand.INITIALIZE, config:this.config})
        const p = new Promise<void>((onResolve, onFail)=>{
            workerMN!.onmessage = (event) => {
                if (event.data.message === WorkerResponse.INITIALIZED) {
                    console.log("WORKERSS INITIALIZED")
                    this.workerMN = workerMN
                    onResolve()
                }else{
                    console.log("celeb a mask Initialization something wrong..")
                    onFail(event)
                }
            }
        })
        return p
    }

    predict = async (targetCanvas:HTMLCanvasElement, params = generateDefaultMODNetParams()) => {
        if(this.config.processOnLocal == true){
            const prediction = await this.localWorker.predict(targetCanvas, this.config, params)
            return prediction
        }
        if(!this.workerMN){
            return null
        }

        else if(this.config.browserType === BrowserType.SAFARI){
            // Case.2 Process on worker thread, Safari (Send dataArray) 
            this.canvas.width = params.processWidth
            this.canvas.height = params.processHeight
            const ctx = this.canvas.getContext("2d")!
            ctx.drawImage(targetCanvas, 0, 0, this.canvas.width, this.canvas.height)
            const imageData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
            const dataArray = imageData.data
            const uid = performance.now()

            this.workerMN!.postMessage({ 
                message: WorkerCommand.PREDICT, uid:uid,
                config: this.config, params: params,
                data: dataArray
            }, [dataArray.buffer])
            const p = new Promise((onResolve:(v:number[][])=>void, onFail)=>{
                this.workerMN!.onmessage = (event) => {
                    if(event.data.message === WorkerResponse.PREDICTED && event.data.uid === uid){
                        const prediction = event.data.prediction
                        onResolve(prediction)
                    }else{
                        console.log("celeb a mask Prediction something wrong..")
                        onFail(event)
                    }
                }        
            })
            return p
        }else{
            // Case.3 Process on worker thread, Chrome (Send ImageBitmap)
            const off = new OffscreenCanvas(targetCanvas.width, targetCanvas.height)
            off.getContext("2d")!.drawImage(targetCanvas, 0, 0, targetCanvas.width, targetCanvas.height)
            const imageBitmap = off.transferToImageBitmap()
            const uid = performance.now()
            this.workerMN!.postMessage({ 
                message: WorkerCommand.PREDICT, uid:uid,
                config: this.config, params: params,
                // data: data, width: inImageData.width, height:inImageData.height
                image: imageBitmap
            }, [imageBitmap])
            const p = new Promise((onResolve:(v:number[][])=>void, onFail)=>{
                this.workerMN!.onmessage = (event) => {
                    if(event.data.message === WorkerResponse.PREDICTED && event.data.uid === uid){
                        const prediction = event.data.prediction
                        onResolve(prediction)
                    }else{
                        console.log("celeb a mask Prediction something wrong..")
                        onFail(event)
                    }
                }        
            })
            return p
        }
    }
}




//// Utility for Demo

export const createForegroundImage = (srcCanvas:HTMLCanvasElement, prediction:number[][]) =>{
    const tmpCanvas = document.createElement("canvas")
    tmpCanvas.width = prediction[0].length
    tmpCanvas.height = prediction.length    
    const imageData = tmpCanvas.getContext("2d")!.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height)
    const data = imageData.data

    for (let rowIndex = 0; rowIndex < tmpCanvas.height; rowIndex++) {
      for (let colIndex = 0; colIndex < tmpCanvas.width; colIndex++) {
        const seg_offset = ((rowIndex * tmpCanvas.width) + colIndex)
        const pix_offset = ((rowIndex * tmpCanvas.width) + colIndex) * 4
        if(prediction[rowIndex][colIndex] > 0.005){

          data[pix_offset + 0] = prediction[rowIndex][colIndex] *255
          data[pix_offset + 1] = prediction[rowIndex][colIndex] *255
          data[pix_offset + 2] = prediction[rowIndex][colIndex] *255
          data[pix_offset + 3] = 255

        }else{
          data[pix_offset + 0] = 0
          data[pix_offset + 1] = 0
          data[pix_offset + 2] = 0
          data[pix_offset + 3] = 0
        }
      }
    }
    const imageDataTransparent = new ImageData(data, tmpCanvas.width, tmpCanvas.height);
    tmpCanvas.getContext("2d")!.putImageData(imageDataTransparent, 0, 0)

    const outputCanvas = document.createElement("canvas")

    outputCanvas.width = srcCanvas.width
    outputCanvas.height = srcCanvas.height
    const ctx = outputCanvas.getContext("2d")!
    ctx.drawImage(tmpCanvas, 0, 0, outputCanvas.width, outputCanvas.height)
    const outImageData = ctx.getImageData(0, 0, outputCanvas.width, outputCanvas.height)
    return  outImageData

  }
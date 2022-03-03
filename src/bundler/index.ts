import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { FetchPlugin } from './plugins/fetch-plugin';

let service:esbuild.Service;
const bundle= async(rawCode:string)=>{

    if(!service){
        service=await esbuild.startService({
            worker:true,
            wasmURL:'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
        });
    }
    try{
        const result=await service.build({
            entryPoints:['index.js'],
            bundle:true,
            write:false,
            plugins:[unpkgPathPlugin(),
              FetchPlugin(rawCode)
          ],
            //this is to remove the process.env.node_env warning from the browser
            define:{
                'process.env.NODE_ENV':'"production"',
                global:'window'
            }
        })
        return {
            code:result.outputFiles[0].text,
            error:''
        }
    }
    catch(err:any){
        return{
            code:'',
            error:err.message
        }
    }
    
}

export default bundle;
import * as esbuild from 'esbuild-wasm'
import axios from 'axios';
import localForage from 'localforage'; 

const fileCache=localForage.createInstance({
  name:'filecache',
});

export const FetchPlugin=(inputCode:string)=>{
    return{
        name:'fetch-plugin',
        setup(build:esbuild.PluginBuild){

        build.onLoad({filter:/(^index\.js$)/},(args:any)=>{
            console.log('onLoad-index', args);
            return {
                loader: 'jsx',
                contents:inputCode,
              };
        })

    build.onLoad({filter:/.*/},async(args:any)=>{
            const cachedResults=await fileCache.getItem<esbuild.OnLoadResult>(args.path);
            if(cachedResults){
             return cachedResults;
            }
        });

        build.onLoad({filter:/.css$/},async(args:any)=>{
            console.log('onLoad-css', args);
           
            const {data,request}=await axios.get(args.path);
            const escaped=data.replace(/\n/g,'')
                          .replace(/"/g,'\\"')
                          .replace(/'/g,"\\'")
            const content=
            `   const style=document.createElement('style');
                style.innerText='${escaped}';
                document.head.appendChild(style);
            `
            const result:esbuild.OnLoadResult={
                loader:'jsx',
                contents:content,
                resolveDir:new URL('./',request.responseURL).pathname
            }
            //store the result in cache
            await fileCache.setItem(args.path,result);
            return result;
        });

        build.onLoad({ filter: /.*/ }, async (args: any) => {
            console.log('onLoad', args);
            
            const {data,request}=await axios.get(args.path);
           
            const result:esbuild.OnLoadResult={
                loader:'jsx',
                contents:data,
                resolveDir:new URL('./',request.responseURL).pathname
            }
            //store the result in cache
            await fileCache.setItem(args.path,result);
            return result;
          
    
          });
        }
    }
}
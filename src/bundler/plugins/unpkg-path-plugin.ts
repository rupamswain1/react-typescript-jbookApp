import * as esbuild from 'esbuild-wasm';

// (async ()=>{
//   await fileCache.setItem('color','red');
//   const color=await fileCache.getItem('color');

//   console.log(color);
  
// })()

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      //Handle the root directory
      build.onResolve({filter:/(^index\.js$)/},()=>{
        return { path:'index.js', namespace: 'a' };
      })
      //Handle relative paths in the module
      build.onResolve({filter:/^\.+\//},(args:any)=>{
          return{
            namespace:'a',
            path:new URL(args.path,'https://unpkg.com'+args.resolveDir+'/').href
            //path:new URL(args.path,args.importer+'/').href
        }
      })

      //Handle main file of the module

      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        return{
            path:`https://unpkg.com/${args.path}`,
            namespace:'a'
        }
        // else if(args.path==='tiny-test-pkg'){
        //     return {path:'https://unpkg.com/tiny-test-pkg@1.0.0/index.js', namespace:'a'}
        // }
      });
 

    },
  };
};
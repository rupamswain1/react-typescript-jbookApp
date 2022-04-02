import { useTypedSelector } from './use-typed-selector'

export const useCumilativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells
    const orderedCell = order.map((id) => data[id])
    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
         var show=(value)=>{
           const root=document.querySelector("#root");
           if(typeof value==='object'){
             if(value.$$typeof && value.props){
               _ReactDOM.render(value,root);
             }
             else{
               root.innerHTML=JSON.stringify(value);
             }          
           }else{
           root.innerHTML=value;
           }
         }
       `
    const showFuncNoOps = `var show=()=>{}`
    const cumilativeCell = []
    for (let c of orderedCell) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumilativeCell.push(showFunc)
        } else {
          cumilativeCell.push(showFuncNoOps)
        }
        cumilativeCell.push(c.content)
      }
      if (c.id === cellId) {
        break
      }
    }
    return cumilativeCell
  }).join('\n')
}

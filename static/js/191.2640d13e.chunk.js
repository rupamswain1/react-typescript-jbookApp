(this["webpackJsonpreact-typescript-jbookapp"]=this["webpackJsonpreact-typescript-jbookapp"]||[]).push([[191],{361:function(t,a){!function(t){t.languages.http={"request-line":{pattern:/^(?:GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH|PRI|SEARCH)\s(?:https?:\/\/|\/)\S*\sHTTP\/[0-9.]+/m,inside:{method:{pattern:/^[A-Z]+\b/,alias:"property"},"request-target":{pattern:/^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,lookbehind:!0,alias:"url",inside:t.languages.uri},"http-version":{pattern:/^(\s)HTTP\/[0-9.]+/,lookbehind:!0,alias:"property"}}},"response-status":{pattern:/^HTTP\/[0-9.]+ \d+ .+/m,inside:{"http-version":{pattern:/^HTTP\/[0-9.]+/,alias:"property"},"status-code":{pattern:/^(\s)\d+(?=\s)/,lookbehind:!0,alias:"number"},"reason-phrase":{pattern:/^(\s).+/,lookbehind:!0,alias:"string"}}},"header-name":{pattern:/^[\w-]+:(?=.)/m,alias:"keyword"}};var a,e,s,p=t.languages,n={"application/javascript":p.javascript,"application/json":p.json||p.javascript,"application/xml":p.xml,"text/xml":p.xml,"text/html":p.html,"text/css":p.css},r={"application/json":!0,"application/xml":!0};for(var i in n)if(n[i]){a=a||{};var o=r[i]?(s=(e=i).replace(/^[a-z]+\//,""),"(?:"+e+"|\\w+/(?:[\\w.-]+\\+)+"+s+"(?![+\\w.-]))"):i;a[i.replace(/\//g,"-")]={pattern:RegExp("(content-type:\\s*"+o+"(?:(?:\\r\\n?|\\n).+)*)(?:\\r?\\n|\\r){2}[\\s\\S]*","i"),lookbehind:!0,inside:n[i]}}a&&t.languages.insertBefore("http","header-name",a)}(Prism)}}]);
//# sourceMappingURL=191.2640d13e.chunk.js.map
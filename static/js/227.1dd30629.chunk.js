(this["webpackJsonpreact-typescript-jbookapp"]=this["webpackJsonpreact-typescript-jbookapp"]||[]).push([[227],{397:function(e,t){!function(e){var t="\\\\\\((?:[^()]|\\([^()]*\\))*\\)",n=RegExp('"(?:[^"\r\n\\\\]|\\\\[^\r\n(]|__)*"'.replace(/__/g,(function(){return t}))),i={interpolation:{pattern:RegExp("((?:^|[^\\\\])(?:\\\\{2})*)"+t),lookbehind:!0,inside:{content:{pattern:/^(\\\()[\s\S]+(?=\)$)/,lookbehind:!0,inside:null},punctuation:/^\\\(|\)$/}}},a=e.languages.jq={comment:/#.*/,property:{pattern:RegExp(n.source+"(?=\\s*:(?!:))"),greedy:!0,inside:i},string:{pattern:n,greedy:!0,inside:i},function:{pattern:/(\bdef\s+)[a-z_]\w+/i,lookbehind:!0},variable:/\B\$\w+/,"property-literal":{pattern:/\b[a-z_]\w*(?=\s*:(?!:))/i,alias:"property"},keyword:/\b(?:as|break|catch|def|elif|else|end|foreach|if|import|include|label|module|modulemeta|null|reduce|then|try|while)\b/,boolean:/\b(?:true|false)\b/,number:/(?:\b\d+\.|\B\.)?\b\d+(?:[eE][+-]?\d+)?\b/,operator:[{pattern:/\|=?/,alias:"pipe"},/\.\.|[!=<>]?=|\?\/\/|\/\/=?|[-+*/%]=?|[<>?]|\b(?:and|or|not)\b/],"c-style-function":{pattern:/\b[a-z_]\w*(?=\s*\()/i,alias:"function"},punctuation:/::|[()\[\]{},:;]|\.(?=\s*[\[\w$])/,dot:{pattern:/\./,alias:"important"}};i.interpolation.inside.content.inside=a}(Prism)}}]);
//# sourceMappingURL=227.1dd30629.chunk.js.map
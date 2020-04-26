(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory);}else{factory(jQuery);}}(function($){var pluses=/\+/g;function encode(s){return config.raw?s:encodeURIComponent(s);}
function decode(s){return config.raw?s:decodeURIComponent(s);}
function stringifyCookieValue(value){return encode(config.json?JSON.stringify(value):String(value));}
function parseCookieValue(s){if(s.indexOf('"')===0){s=s.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');}
try{s=decodeURIComponent(s.replace(pluses,' '));}catch(e){return;}
try{return config.json?JSON.parse(s):s;}catch(e){}}
function read(s,converter){var value=config.raw?s:parseCookieValue(s);return $.isFunction(converter)?converter(value):value;}
var config=$.cookie=function(key,value,options){if(value!==undefined&&!$.isFunction(value)){options=$.extend({},config.defaults,options);if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+days);}
return(document.cookie=[encode(key),'=',stringifyCookieValue(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}
var result=key?undefined:{};var cookies=document.cookie?document.cookie.split('; '):[];for(var i=0,l=cookies.length;i<l;i++){var parts=cookies[i].split('=');var name=decode(parts.shift());var cookie=parts.join('=');if(key&&key===name){result=read(cookie,value);break;}
if(!key&&(cookie=read(cookie))!==undefined){result[name]=cookie;}}
return result;};config.defaults={};$.removeCookie=function(key,options){if($.cookie(key)!==undefined){$.cookie(key,'',$.extend({},options,{expires:-1}));return true;}
return false;};}));

$.fn.jtk = function(A, O)
{
   var DV = "\u07b0\u0787\u07ac\u0783\u078c\u0794\u07aa\u07a8\u07ae\u0795][\\\u07a6\u0790\u078b\u078a\u078e\u0780\u0796\u0786\u078d\u061b'\u0792\xd7\u0797\u0788\u0784\u0782\u0789\u060c./\u07a4\u07a2\u07ad\u079c\u0793\u07a0\u07ab\u07a9\u07af\xf7}{|\u07a7\u0781\u0791\ufdf2\u07a3\u0799\u079b\u079a\u0785:\"\u07a1\u0798\u079d\u07a5\u079e\u078f\u079f><\u061f)(";
   var EN = "qwertyuiop[]\\asdfghjkl;'zxcvbnm,./QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?()";
   function handleKey(a)
   {
      if(!a)var a=window.event;
      if(null==a.which)keycode=a.keyCode;
      else
      {
         if(!(a.which>0))return!0;
         if(keycode=a.which, window.opera&&1==[45, 46, 35, 36].indexOf(keycode))return!0
      }
      if(a.modifier)var b=a.modifiers&Event.CONTROL_MASK;
      else if("undefined"!=typeof a.ctrlKey)var b=a.ctrlKey;
      try
      {
         var c=EN.indexOf(String.fromCharCode(keycode));
         if(-1==c||b)return!0;
         var f=DV.substr(c, 1)
      }
      catch(g)
      {
         return
      }
      "function"==typeof a.preventDefault?a.preventDefault():a.returnValue=!1;
      var h=this.scrollTop;
      if(this.selectionStart)
      {
         var j=this.selectionStart+1;
         this.value=this.value.substring(0, this.selectionStart)+f+this.value.substring(this.selectionEnd, this.value.length), this.setSelectionRange(j, j), this.focus()
      }
      else
      {
         document.selection?(sel=document.selection.createRange(), sel.text=f, this.focus()):this.value+=f;
      }
      this.scrollTop=h;
      return f;
   }
   if (typeof(O)=="object")
   {

      if (A == "disable")
      {
         return true;
      }
      else
      {
         return handleKey(O);
      }
   }
   else
   {
      if (A == "disable")
      {
         $(this).off('keypress');
      }
      else
      {
         $(this).off('keypress').on('keypress', handleKey);
      }
   }
}

function addDVkbd(el){
  $(el).jtk('enable');
}
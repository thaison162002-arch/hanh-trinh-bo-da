/* Mở bằng trình duyệt ngoài khi đang ở trong Zalo/Facebook/Messenger */
(function(){
var ua=navigator.userAgent||'',inApp=/Zalo|FBAN|FBAV|FB_IAB|Messenger|Instagram|Line\//i.test(ua);
var isA=/Android/i.test(ua),isI=/iPhone|iPad|iPod/i.test(ua);
window.__gate=function(target,auto,tryI){
 var u=new URL(target,location.href),hp=u.host+u.pathname+u.search+u.hash;
 if(!inApp){if(auto)location.replace(u.href);return false}
 var chrome='intent://'+hp+'#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url='+encodeURIComponent(u.href)+';end';
 var anyB='intent://'+hp+'#Intent;scheme=https;action=android.intent.action.VIEW;end';
 var safari='x-safari-'+u.href;
 var d=document.createElement('div');d.id='gate';
 d.innerHTML='<div style="position:fixed;inset:0;background:rgba(40,25,15,.92);z-index:99999;display:flex;align-items:center;justify-content:center;padding:18px;font-family:Arial,sans-serif">'+
 '<div style="background:#F6EEDF;border-radius:16px;max-width:420px;width:100%;padding:22px;text-align:center;color:#3B2A1E">'+
 '<div style="font-size:40px">🌐</div><h2 style="margin:6px 0 8px;color:#5C3A21;font-family:Georgia,serif">Mở bằng trình duyệt</h2>'+
 '<p style="margin:0 0 14px;line-height:1.45">Zalo/Facebook hay chặn hoặc chạy chậm trang này. Bấm nút dưới để mở bằng '+(isI?'Safari':'Chrome')+' cho mượt nhé.</p>'+
 (isA?'<a href="'+chrome+'" style="display:block;background:#5C3A21;color:#fff;padding:14px;border-radius:12px;font-weight:bold;text-decoration:none;font-size:17px">Mở bằng Chrome</a>'+
      '<a href="'+anyB+'" style="display:block;margin-top:8px;color:#5C3A21;font-weight:bold">Mở bằng trình duyệt khác</a>':'')+
 (isI?'<a href="'+safari+'" style="display:block;background:#5C3A21;color:#fff;padding:14px;border-radius:12px;font-weight:bold;text-decoration:none;font-size:17px">Mở bằng Safari</a>'+
      '<p style="font-size:14px;margin:10px 0 0;line-height:1.4">Nếu không được: bấm <b>⋯</b> ở góc trên bên phải → chọn <b>“Mở bằng trình duyệt”</b>.</p>':'')+
 (!isA&&!isI?'<a href="'+u.href+'" target="_blank" style="display:block;background:#5C3A21;color:#fff;padding:14px;border-radius:12px;font-weight:bold;text-decoration:none">Mở trang</a>':'')+
 '<button id="gcopy" style="margin-top:12px;width:100%;padding:12px;border-radius:12px;border:1.5px solid #5C3A21;background:#fff;color:#5C3A21;font-weight:bold;font-size:15px">📋 Sao chép link</button>'+
 '<a id="gstay" href="'+u.href+'" style="display:block;margin-top:12px;font-size:14px;color:#7A6A5A">Vẫn tiếp tục trong '+(/Zalo/i.test(ua)?'Zalo':'ứng dụng')+'</a></div></div>';
 document.body.appendChild(d);
 document.getElementById('gcopy').onclick=function(){var b=this;(navigator.clipboard?navigator.clipboard.writeText(u.href):Promise.reject()).then(function(){b.textContent='✓ Đã sao chép – dán vào Chrome/Safari'},function(){prompt('Sao chép link này:',u.href)})};
 if(target===location.href||auto===false){document.getElementById('gstay').onclick=function(e){e.preventDefault();d.remove()}}
 if(isA&&(auto||tryI))setTimeout(function(){location.href=chrome},400);
 return true};
})();

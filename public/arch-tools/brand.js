/*!
 * TectSkill PDF Tools – ส่วนกลาง: แถบแบรนด์, ข้อความชวน, Google Analytics และการบันทึกไฟล์
 * แก้ค่าใน CONFIG ด้านล่างที่เดียว มีผลกับทุกเครื่องมือ
 */
(function(){
  'use strict';
  var CONFIG={
    toolsHome:'https://tool.tectskill.com/',      // หน้ารวมเครื่องมือ
    mainSite:'https://tectskill.com/',            // เว็บหลัก
    ctaUrl:'https://tectskill.com/',              // หน้าที่อยากให้คนไปต่อหลังใช้เครื่องมือ (เช่น หน้าคอร์ส)
    ctaText:'อยากใช้ AI ช่วยงานออกแบบด้วยไหม',
    ctaLink:'ดูคอร์สของ TectSkill',
    gaId:'',                                      // ใส่ Google Analytics Measurement ID เช่น 'G-XXXXXXXXXX'
    credit:'สร้างด้วย tool.tectskill.com',        // เครดิตบนรายงานที่เครื่องมือสร้างขึ้น
    producer:'TectSkill PDF Tools – tool.tectskill.com'
  };
  /* ค่าที่ส่งมาจาก WordPress plugin (ถ้ามี) จะทับค่าด้านบน */
  if(window.TS_CONFIG){for(var ck in window.TS_CONFIG){if(window.TS_CONFIG[ck])CONFIG[ck]=window.TS_CONFIG[ck];}}
  var TOOLS=[
    ['revision-compare','เทียบแบบ'],['measure-scale','วัดตามสเกล'],['sheet-set','รวมชุดแบบ'],
    ['batch-stamp','ประทับตราแบบ'],['markup','ตรวจแบบ'],['compress','บีบอัดแบบ'],['print-scale','พิมพ์ย่อตามสเกล']
  ];
  var me=document.currentScript,tool=(me&&me.dataset.tool)||location.pathname.split('/').pop().replace(/\.html$/,'')||'index';
  var framed=false;try{framed=window.self!==window.top;}catch(e){framed=true;}

  /* ---------- analytics ---------- */
  if(CONFIG.gaId){
    var g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(CONFIG.gaId);
    document.head.appendChild(g);window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments);};window.gtag('js',new Date());window.gtag('config',CONFIG.gaId);
  }
  function track(name,params){
    try{if(window.gtag){var p={tool:tool};for(var k in params)p[k]=params[k];window.gtag('event',name,p);}}catch(e){}
  }

  /* ---------- styles ---------- */
  var css=''
  +'.ts-bar{height:44px;display:flex;align-items:center;gap:14px;padding:0 16px;background:var(--panel,#F7F8F7);border-bottom:1px solid var(--line,#C9D0CF);font:14px/1.4 "IBM Plex Sans Thai",system-ui,sans-serif;color:var(--ink,#1C2427);position:relative;z-index:30}'
  +'.ts-bar a{color:inherit;text-decoration:none}'
  +'.ts-logo{font-weight:600;white-space:nowrap}.ts-logo span{font-weight:400;color:var(--muted,#5B676C);margin-left:6px}'
  +'.ts-sp{flex:1}'
  +'.ts-menu{position:relative}.ts-menu summary{cursor:pointer;list-style:none;padding:5px 10px;border:1px solid var(--line,#C9D0CF);border-radius:7px;font-size:13px;white-space:nowrap}'
  +'.ts-menu summary::-webkit-details-marker{display:none}'
  +'.ts-menu ul{position:absolute;right:0;top:calc(100% + 6px);margin:0;padding:6px;list-style:none;min-width:200px;background:var(--panel,#F7F8F7);border:1px solid var(--line,#C9D0CF);border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.12)}'
  +'.ts-menu li a{display:block;padding:6px 10px;border-radius:6px;font-size:13.5px}.ts-menu li a:hover{background:rgba(127,127,127,.12)}'
  +'.ts-menu li a[aria-current="page"]{font-weight:600}'
  +'.ts-main{font-size:13px;color:var(--muted,#5B676C);white-space:nowrap}.ts-main:hover{color:var(--ink,#1C2427)}'
  +'.ts-bar a:focus-visible,.ts-menu summary:focus-visible,.ts-toast a:focus-visible,.ts-toast button:focus-visible{outline:2px solid #1670C2;outline-offset:2px}'
  +'body.ts-has-bar .app{height:calc(100% - 44px)!important}'
  +'@media (max-width:820px){body.ts-has-bar .app{height:auto!important}.ts-logo span{display:none}.ts-main{display:none}}'
  +'.ts-toast{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:50;max-width:340px;background:var(--panel,#F7F8F7);color:var(--ink,#1C2427);border:1px solid var(--line,#C9D0CF);border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.18);padding:14px 40px 14px 16px;font:14px/1.5 "IBM Plex Sans Thai",system-ui,sans-serif}'
  +'.ts-toast b{display:block;font-weight:600;margin-bottom:2px}'
  +'.ts-toast a{display:inline-block;margin-top:8px;padding:6px 12px;border-radius:7px;background:var(--btn,#1C2427);color:var(--btn-ink,#F7F8F7);text-decoration:none;font-weight:500;font-size:13.5px}'
  +'.ts-toast button{position:absolute;top:8px;right:8px;border:0;background:transparent;color:var(--muted,#5B676C);font-size:16px;cursor:pointer;border-radius:6px;width:28px;height:28px}'
  +'@media (max-width:520px){.ts-toast{left:12px;right:12px;max-width:none}}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

  /* ---------- top bar (hidden when embedded in an iframe) ---------- */
  function bar(){
    if(framed)return;
    var b=document.createElement('header');b.className='ts-bar';
    var items=TOOLS.map(function(t){return '<li><a href="'+t[0]+'.html"'+(t[0]===tool?' aria-current="page"':'')+'>'+esc(t[1])+'</a></li>';}).join('');
    b.innerHTML='<a class="ts-logo" href="'+CONFIG.toolsHome+'">TectSkill<span>เครื่องมือฟรีสำหรับสถาปนิก</span></a><span class="ts-sp"></span>'
      +'<details class="ts-menu"><summary>เครื่องมือทั้งหมด</summary><ul>'+items+'</ul></details>'
      +'<a class="ts-main" href="'+CONFIG.mainSite+'">tectskill.com</a>';
    document.body.insertBefore(b,document.body.firstChild);document.body.classList.add('ts-has-bar');
    b.querySelector('.ts-main').addEventListener('click',function(){track('main_site_click');});
    document.addEventListener('click',function(e){var d=b.querySelector('.ts-menu');if(d.open&&!d.contains(e.target))d.open=false;});
  }

  /* ---------- call to action after a successful export ---------- */
  function cta(){
    try{if(sessionStorage.getItem('ts-cta'))return;sessionStorage.setItem('ts-cta','1');}catch(e){}
    var t=document.createElement('div');t.className='ts-toast';t.setAttribute('role','status');
    t.innerHTML='<b>ไฟล์พร้อมแล้ว</b>'+esc(CONFIG.ctaText)+'<br><a href="'+CONFIG.ctaUrl+'" target="_blank" rel="noopener">'+esc(CONFIG.ctaLink)+'</a><button aria-label="ปิด">✕</button>';
    document.body.appendChild(t);
    t.querySelector('a').addEventListener('click',function(){track('cta_click');});
    t.querySelector('button').addEventListener('click',function(){t.remove();});
    setTimeout(function(){if(t.isConnected)t.remove();},20000);
  }

  /* ---------- download helper ---------- */
  function save(filename,data){
    var blob=data instanceof Blob?data:new Blob([data],{type:/\.csv$/i.test(filename)?'text/csv;charset=utf-8':'application/octet-stream'});
    /* TectSkill PDF app: let the host page save the file (native Save dialog in the desktop app) */
    var host=null;try{host=framed&&window.parent&&window.parent.__tectskillSaveFile;}catch(e){host=null;}
    if(typeof host==='function'){
      track('file_export',{file_type:(filename.split('.').pop()||'').toLowerCase()});
      return Promise.resolve(host(filename,blob)).then(function(ok){if(ok!==false)setTimeout(cta,700);});
    }
    var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(function(){URL.revokeObjectURL(a.href);},4000);
    track('file_export',{file_type:(filename.split('.').pop()||'').toLowerCase()});
    setTimeout(cta,700);
    return Promise.resolve();
  }

  window.TS={config:CONFIG,tools:TOOLS,tool:tool,save:save,track:track,credit:CONFIG.credit,producer:CONFIG.producer};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){bar();track('tool_open');});
  else{bar();track('tool_open');}
})();

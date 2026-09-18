/* ==========================================================================
   Mandour Medical Center — i18n toggle (AR default / EN)
   Every translatable element carries data-ar and data-en attributes.
   Placeholder text on inputs is switched separately via data-ar-ph/data-en-ph.
   ========================================================================== */
(function(){
  function applyLang(lang){
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-en', lang === 'en');

    document.querySelectorAll('[data-ar]').forEach(function(el){
      var val = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if(val !== null){ el.textContent = val; }
    });
    document.querySelectorAll('[data-ar-ph]').forEach(function(el){
      var val = lang === 'ar' ? el.getAttribute('data-ar-ph') : el.getAttribute('data-en-ph');
      if(val !== null){ el.setAttribute('placeholder', val); }
    });
    document.querySelectorAll('[data-ar-html]').forEach(function(el){
      var val = lang === 'ar' ? el.getAttribute('data-ar-html') : el.getAttribute('data-en-html');
      if(val !== null){ el.innerHTML = val; }
    });

    document.querySelectorAll('.lang-switch button').forEach(function(btn){
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    try{ localStorage.setItem('mmc-lang', lang); }catch(e){}
  }

  function initLang(){
    var saved = null;
    try{ saved = localStorage.getItem('mmc-lang'); }catch(e){}
    var lang = saved || 'ar';
    applyLang(lang);

    document.querySelectorAll('.lang-switch button').forEach(function(btn){
      btn.addEventListener('click', function(){
        applyLang(btn.getAttribute('data-lang'));
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initLang);
})();

/* ==========================================================================
   Mandour Medical Center — interactions
   Mobile menu, FAQ accordion, patient-type toggle, booking form stub,
   WhatsApp deep-link, sticky header shadow.
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function(){

  /* Mobile hamburger menu */
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  if(hamburger && mobileNav){
    hamburger.addEventListener('click', function(){
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ mobileNav.classList.remove('open'); });
    });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    if(!q) return;
    q.addEventListener('click', function(){
      var wasOpen = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(function(i){ i.classList.remove('open'); });
      if(!wasOpen){ item.classList.add('open'); }
    });
  });

  /* New / existing patient toggle on booking panel */
  document.querySelectorAll('.patient-toggle button').forEach(function(btn){
    btn.addEventListener('click', function(){
      btn.parentElement.querySelectorAll('button').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });

  /* Doctor filter (specialty / day) — client-side show/hide, static demo */
  var specFilter = document.getElementById('doctorSpecFilter');
  var dayFilter = document.getElementById('doctorDayFilter');
  function filterDoctors(){
    var spec = specFilter ? specFilter.value : 'all';
    var day = dayFilter ? dayFilter.value : 'all';
    document.querySelectorAll('.doctor-card').forEach(function(card){
      var matchSpec = spec === 'all' || card.dataset.spec === spec;
      var matchDay = day === 'all' || (card.dataset.days || '').includes(day);
      card.style.display = (matchSpec && matchDay) ? '' : 'none';
    });
  }
  if(specFilter) specFilter.addEventListener('change', filterDoctors);
  if(dayFilter) dayFilter.addEventListener('change', filterDoctors);

  /* Booking form submit — client-side confirmation only.
     Replace this handler with a real endpoint (WhatsApp Business API,
     email service, Google Sheets webhook, or clinic CRM) when ready. */
  var bookingForm = document.getElementById('bookingForm');
  var confirmMsg = document.getElementById('bookingConfirm');
  if(bookingForm){
    bookingForm.addEventListener('submit', function(e){
      e.preventDefault();
      if(confirmMsg){ confirmMsg.classList.add('show'); }
      bookingForm.reset();
      if(confirmMsg){ confirmMsg.scrollIntoView({behavior:'smooth', block:'center'}); }
    });
  }

  /* Sticky header shadow on scroll */
  var header = document.querySelector('.site-header');
  if(header){
    window.addEventListener('scroll', function(){
      header.style.boxShadow = window.scrollY > 8 ? '0 4px 18px -12px rgba(15,40,35,.25)' : 'none';
    });
  }
});

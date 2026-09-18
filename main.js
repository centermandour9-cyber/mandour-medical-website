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

  /* Booking form submit — builds a WhatsApp message from the filled fields
     and opens it in a new tab addressed to the center's WhatsApp number.
     No server/backend is required; the visitor reviews the message inside
     WhatsApp itself before pressing send. Replace the CENTER_WHATSAPP
     number below if it ever changes. */
  var CENTER_WHATSAPP = '201128323232';
  var bookingForm = document.getElementById('bookingForm');
  var confirmMsg = document.getElementById('bookingConfirm');
  var isArabic = function(){ return document.documentElement.lang !== 'en'; };

  function fieldText(id){
    var el = document.getElementById(id);
    if(!el) return '';
    if(el.tagName === 'SELECT'){
      var opt = el.options[el.selectedIndex];
      return opt ? opt.textContent.trim() : '';
    }
    return (el.value || '').trim();
  }

  if(bookingForm){
    bookingForm.addEventListener('submit', function(e){
      e.preventDefault();

      var patientTypeBtn = bookingForm.closest('.booking-panel') ? bookingForm.closest('.booking-panel').querySelector('.patient-toggle button.active') : null;
      var patientType = patientTypeBtn ? patientTypeBtn.textContent.trim() : '';

      var name = fieldText('bkName');
      var phone = fieldText('bkPhone');
      var email = fieldText('bkEmail');
      var specialty = fieldText('bkSpecialty');
      var doctor = fieldText('bkDoctor');
      var date = fieldText('bkDate');
      var time = fieldText('bkTime');
      var notes = fieldText('bkNotes');

      var lines = isArabic() ? [
        'السلام عليكم، أرغب في حجز موعد في مركز مندور الطبي.',
        'نوع المريض: ' + (patientType || '-'),
        'الاسم: ' + (name || '-'),
        'رقم الهاتف: ' + (phone || '-'),
        email ? 'البريد الإلكتروني: ' + email : null,
        'التخصص: ' + (specialty || '-'),
        doctor ? 'الطبيب: ' + doctor : null,
        date ? 'اليوم المفضل: ' + date : null,
        time ? 'الوقت المفضل: ' + time : null,
        notes ? 'ملاحظات: ' + notes : null
      ] : [
        'Hello, I would like to book an appointment at Mandour Medical Center.',
        'Patient type: ' + (patientType || '-'),
        'Name: ' + (name || '-'),
        'Phone: ' + (phone || '-'),
        email ? 'Email: ' + email : null,
        'Specialty: ' + (specialty || '-'),
        doctor ? 'Doctor: ' + doctor : null,
        date ? 'Preferred day: ' + date : null,
        time ? 'Preferred time: ' + time : null,
        notes ? 'Notes: ' + notes : null
      ];

      var message = lines.filter(Boolean).join('\n');
      var waUrl = 'https://wa.me/' + CENTER_WHATSAPP + '?text=' + encodeURIComponent(message);

      if(confirmMsg){
        confirmMsg.classList.add('show');
        confirmMsg.scrollIntoView({behavior:'smooth', block:'center'});
      }
      window.open(waUrl, '_blank');
      bookingForm.reset();
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

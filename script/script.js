
      (function () {
        "use strict";

        var $ = function (sel, ctx) {
          return (ctx || document).querySelector(sel);
        };
        var $$ = function (sel, ctx) {
          return Array.prototype.slice.call(
            (ctx || document).querySelectorAll(sel),
          );
        };
        var prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        /* =========================================================
     MOBILE MENU
     ========================================================= */
        function initMobileMenu() {
          var menuBtn = $("#menuBtn");
          var mobileMenu = $("#mobileMenu");
          if (!menuBtn || !mobileMenu) return;

          menuBtn.addEventListener("click", function () {
            mobileMenu.classList.toggle("hidden");
          });
          $$("a", mobileMenu).forEach(function (a) {
            a.addEventListener("click", function () {
              mobileMenu.classList.add("hidden");
            });
          });
        }

        /* =========================================================
     SCROLL REVEAL
     ========================================================= */
        function initScrollReveal() {
          var items = $$("[data-reveal]");
          if (!items.length) return;

          if (prefersReducedMotion) {
            items.forEach(function (el) {
              el.classList.add("visible");
            });
            return;
          }

          var observer = new IntersectionObserver(
            function (entries) {
              entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                  entry.target.classList.add("visible");
                  observer.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
          );

          items.forEach(function (el, i) {
            el.style.setProperty("--d", (i % 4) * 90 + "ms");
            observer.observe(el);
          });
        }

        /* =========================================================
     ACTIVE NAV HIGHLIGHT
     ========================================================= */
        function initActiveNav() {
          var sections = $$("section[id]");
          var navLinks = $$(".nav-link");
          if (!sections.length || !navLinks.length) return;

          var navObserver = new IntersectionObserver(
            function (entries) {
              entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                  navLinks.forEach(function (l) {
                    l.classList.toggle(
                      "active",
                      l.getAttribute("href") === "#" + entry.target.id,
                    );
                  });
                }
              });
            },
            { rootMargin: "-40% 0px -55% 0px" },
          );

          sections.forEach(function (s) {
            navObserver.observe(s);
          });
        }

        /* =========================================================
     UNIVERSAL SLIDER
     ========================================================= */
        // function initSliders() {
        //   var sliders = $$("[data-slider]");
        //   if (!sliders.length) return;

        //   sliders.forEach(function (sliderEl) {
        //     var sliderId = sliderEl.getAttribute("data-slider");
        //     var track = $(".slider-track", sliderEl);
        //     var dotsWrap = $("#" + sliderId + "-dots");
        //     var slides = $$(".slider-slide", track);

        //     if (!track || !slides.length) return;

        //     var index = 0;
        //     var timer = null;
        //     var slideCount = slides.length;

        //     function getVisibleCount() {
        //       var width = window.innerWidth;
        //       if (sliderId === "studio") {
        //         if (width >= 1024) return 3;
        //         if (width >= 640) return 2;
        //         return 1;
        //       }
        //       if (sliderId === "team") {
        //         if (width >= 1024) return 4;
        //         if (width >= 640) return 2;
        //         return 1;
        //       }
        //       return 1;
        //     }

        //     function getMaxIndex() {
        //       return Math.max(0, slideCount - getVisibleCount());
        //     }

        //     function render() {
        //       var maxIdx = getMaxIndex();
        //       if (index > maxIdx) index = maxIdx;
        //       if (index < 0) index = 0;
        //       track.style.transform =
        //         "translateX(-" + index * (100 / slideCount) + "%)";

        //       if (dotsWrap) {
        //         var dots = $$(".slider-dot", dotsWrap);
        //         var totalDots = maxIdx + 1;
        //         if (dots.length !== totalDots) {
        //           dotsWrap.innerHTML = "";
        //           for (var i = 0; i < totalDots; i++) {
        //             var dot = document.createElement("button");
        //             dot.className = "slider-dot";
        //             dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        //             (function (idx) {
        //               dot.addEventListener("click", function () {
        //                 goTo(idx);
        //               });
        //             })(i);
        //             dotsWrap.appendChild(dot);
        //           }
        //         }
        //         var newDots = $$(".slider-dot", dotsWrap);
        //         newDots.forEach(function (d, i) {
        //           d.classList.toggle("active", i === index);
        //         });
        //       }
        //     }

        //     function goTo(i) {
        //       var maxIdx = getMaxIndex();
        //       if (i < 0) i = maxIdx;
        //       if (i > maxIdx) i = 0;
        //       index = i;
        //       render();
        //     }

        //     function next() {
        //       goTo(index + 1);
        //     }
        //     function prev() {
        //       goTo(index - 1);
        //     }

        //     function startAuto() {
        //       if (prefersReducedMotion) return;
        //       stopAuto();
        //       timer = setInterval(function () {
        //         next();
        //       }, 4500);
        //     }
        //     function stopAuto() {
        //       if (timer) clearInterval(timer);
        //       timer = null;
        //     }

        //     var prevBtn = $('[data-slider-prev="' + sliderId + '"]');
        //     var nextBtn = $('[data-slider-next="' + sliderId + '"]');

        //     if (prevBtn)
        //       prevBtn.addEventListener("click", function () {
        //         prev();
        //         startAuto();
        //       });
        //     if (nextBtn)
        //       nextBtn.addEventListener("click", function () {
        //         next();
        //         startAuto();
        //       });

        //     var viewport = $(".slider-viewport", sliderEl);
        //     if (viewport) {
        //       viewport.addEventListener("mouseenter", stopAuto);
        //       viewport.addEventListener("mouseleave", startAuto);

        //       var startX = 0;
        //       viewport.addEventListener(
        //         "touchstart",
        //         function (e) {
        //           startX = e.touches[0].clientX;
        //         },
        //         { passive: true },
        //       );
        //       viewport.addEventListener(
        //         "touchend",
        //         function (e) {
        //           var dx = e.changedTouches[0].clientX - startX;
        //           if (Math.abs(dx) > 40) {
        //             if (dx < 0) next();
        //             else prev();
        //             startAuto();
        //           }
        //         },
        //         { passive: true },
        //       );
        //     }

        //     render();
        //     startAuto();
        //     window.addEventListener("resize", function () {
        //       render();
        //     });
        //   });
        // }

        /* =========================================================
     WHATSAPP FORM SUBMISSION
     ========================================================= */
        function sendToWhatsApp(formData, formType) {
          var phone = "918273776670";
          var lines = [];

          if (formType === "appointment") {
            lines.push("*New Appointment Request*");
            lines.push("Name: " + (formData.fullName || "N/A"));
            lines.push("Phone: " + (formData.phone || "N/A"));
            lines.push("Email: " + (formData.email || "N/A"));
            lines.push("Preferred Date: " + (formData.date || "N/A"));
            lines.push("Preferred Time: " + (formData.time || "N/A"));
            lines.push("Service: " + (formData.service || "N/A"));
            if (formData.message) lines.push("Message: " + formData.message);
          } else {
            lines.push("*New Contact Message*");
            lines.push("Name: " + (formData.name || "N/A"));
            lines.push("Email: " + (formData.email || "N/A"));
            if (formData.phone) lines.push("Phone: " + formData.phone);
            lines.push("Subject: " + (formData.subject || "N/A"));
            lines.push("Message: " + (formData.message || "N/A"));
          }

          var url =
            "https://wa.me/" +
            phone +
            "?text=" +
            encodeURIComponent(lines.join("\n"));
          window.open(url, "_blank");
        }

        /* =========================================================
     FORM VALIDATION
     ========================================================= */
        function isValidEmail(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
        }
        function isValidPhone(v) {
          return /^[+]?[\d\s().-]{7,16}$/.test(v.trim());
        }

        function setFieldState(field, valid, message) {
          var errorEl = field.querySelector(".error-msg");
          field.classList.toggle("has-error", !valid);
          field.classList.toggle(
            "has-success",
            valid &&
              field.querySelector("input,select,textarea").value.trim() !== "",
          );
          if (errorEl && !valid) errorEl.textContent = message;
        }

        function validateForm(form, rules) {
          var valid = true;
          rules.forEach(function (rule) {
            var input = form.querySelector('[name="' + rule.name + '"]');
            if (!input) return;
            var field = input.closest(".field") || input.parentElement;
            var value = input.value.trim();
            var ok = true;

            if (rule.required && !value) ok = false;
            if (ok && value && rule.validator) ok = rule.validator(value);

            setFieldState(field, ok, rule.message);
            if (!ok) valid = false;
          });
          return valid;
        }

        function wireForm(opts) {
          var form = $(opts.formSelector);
          if (!form) return;
          var alertBox = $(opts.alertSelector);
          var submitBtn = form.querySelector('[type="submit"]');
          var spinner = submitBtn ? submitBtn.querySelector(".spinner") : null;
          var btnLabel = submitBtn
            ? submitBtn.querySelector(".btn-label")
            : null;

          form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (alertBox) alertBox.classList.remove("success", "error", "show");

            if (!validateForm(form, opts.rules)) {
              var firstError = form.querySelector(".field.has-error");
              if (firstError) {
                var inp = firstError.querySelector("input,select,textarea");
                if (inp) inp.focus();
              }
              return;
            }

            var data = {};
            new FormData(form).forEach(function (value, key) {
              data[key] = value;
            });

            if (submitBtn) submitBtn.disabled = true;
            if (spinner) spinner.classList.add("active");
            if (btnLabel) btnLabel.textContent = "Opening WhatsApp…";

            setTimeout(function () {
              sendToWhatsApp(data, opts.formType);

              if (alertBox) {
                alertBox.textContent = opts.successMsg;
                alertBox.classList.add("show", "success");
                alertBox.style.display = "flex";
              }
              form.reset();
              $$(".field", form).forEach(function (f) {
                f.classList.remove("has-success", "has-error");
              });

              if (submitBtn) submitBtn.disabled = false;
              if (spinner) spinner.classList.remove("active");
              if (btnLabel)
                btnLabel.textContent = btnLabel.dataset.default || "Submit";
            }, 600);
          });
        }

        function initAppointmentForm() {
          wireForm({
            formSelector: "#appointment-form",
            alertSelector: "#appointment-alert",
            formType: "appointment",
            successMsg:
              "Opening WhatsApp — please send the pre-filled message to confirm your appointment.",
            rules: [
              {
                name: "fullName",
                required: true,
                message: "Please enter your full name.",
              },
              {
                name: "phone",
                required: true,
                validator: isValidPhone,
                message: "Please enter a valid phone number.",
              },
              {
                name: "email",
                required: true,
                validator: isValidEmail,
                message: "Please enter a valid email address.",
              },
              {
                name: "date",
                required: true,
                validator: function (v) {
                  return new Date(v) >= new Date(new Date().toDateString());
                },
                message: "Please choose a valid, upcoming date.",
              },
              {
                name: "time",
                required: true,
                message: "Please choose a preferred time.",
              },
              {
                name: "service",
                required: true,
                message: "Please select a treatment.",
              },
            ],
          });
        }

        function initContactForm() {
          wireForm({
            formSelector: "#contact-form",
            alertSelector: "#contact-alert",
            formType: "contact",
            successMsg:
              "Opening WhatsApp — please send the pre-filled message to reach our team.",
            rules: [
              {
                name: "name",
                required: true,
                message: "Please enter your name.",
              },
              {
                name: "email",
                required: true,
                validator: isValidEmail,
                message: "Please enter a valid email address.",
              },
              {
                name: "phone",
                required: false,
                validator: isValidPhone,
                message: "Please enter a valid phone number.",
              },
              {
                name: "subject",
                required: true,
                message: "Please add a subject.",
              },
              {
                name: "message",
                required: true,
                message: "Please enter a message.",
              },
            ],
          });
        }

        /* =========================================================
     FAQ ACCORDION
     ========================================================= */
        function initFAQ() {
          var items = $$(".faq-item");
          if (!items.length) return;

          items.forEach(function (item) {
            var btn = item.querySelector(".faq-question");
            var answer = item.querySelector(".faq-answer");
            if (!btn || !answer) return;

            btn.addEventListener("click", function () {
              var isOpen = item.classList.contains("open");
              items.forEach(function (other) {
                other.classList.remove("open");
                var otherAnswer = other.querySelector(".faq-answer");
                if (otherAnswer) otherAnswer.style.maxHeight = null;
                var otherBtn = other.querySelector(".faq-question");
                if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
              });
              if (!isOpen) {
                item.classList.add("open");
                answer.style.maxHeight = answer.scrollHeight + "px";
                btn.setAttribute("aria-expanded", "true");
              }
            });
          });
        }

        /* =========================================================
     GALLERY + LIGHTBOX
     ========================================================= */
        var lightboxImages = [];
        var lightboxIndex = 0;
        var lightboxEl = null;
        var lightboxImg = null;

        function initLightbox() {
          lightboxImages = $$(".gallery-item img");
          lightboxEl = $("#lightbox");
          lightboxImg = $("#lightbox-img");
          if (!lightboxEl || !lightboxImages.length) return;

          var closeBtn = $("#lightbox-close");
          var prevBtn = $("#lightbox-prev");
          var nextBtn = $("#lightbox-next");

          function show(i) {
            lightboxIndex = (i + lightboxImages.length) % lightboxImages.length;
            lightboxImg.src = lightboxImages[lightboxIndex].src;
            lightboxImg.alt = lightboxImages[lightboxIndex].alt;
          }

          function open(i) {
            show(i);
            lightboxEl.classList.add("open");
            lightboxEl.setAttribute("aria-hidden", "false");
            if (closeBtn) closeBtn.focus();
            document.body.style.overflow = "hidden";
          }

          function close() {
            lightboxEl.classList.remove("open");
            lightboxEl.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
          }

          lightboxImages.forEach(function (img, i) {
            var parent = img.closest(".gallery-item");
            if (parent) {
              parent.addEventListener("click", function () {
                open(i);
              });
            }
          });

          if (closeBtn) closeBtn.addEventListener("click", close);
          if (prevBtn)
            prevBtn.addEventListener("click", function () {
              show(lightboxIndex - 1);
            });
          if (nextBtn)
            nextBtn.addEventListener("click", function () {
              show(lightboxIndex + 1);
            });

          lightboxEl.addEventListener("click", function (e) {
            if (e.target === lightboxEl) close();
          });

          document.addEventListener("keydown", function (e) {
            if (!lightboxEl.classList.contains("open")) return;
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") show(lightboxIndex - 1);
            if (e.key === "ArrowRight") show(lightboxIndex + 1);
          });
        }

        /* =========================================================
     BEFORE / AFTER SLIDER
     ========================================================= */
        function initBeforeAfterSlider() {
          var slider = $("#ba-slider");
          if (!slider) return;
          var afterWrap = $(".ba-after-wrap", slider);
          var handle = $(".ba-handle", slider);

          function setPosition(percent) {
            var clamped = Math.min(100, Math.max(0, percent));
            afterWrap.style.width = clamped + "%";
            handle.style.left = clamped + "%";
            handle.setAttribute("aria-valuenow", Math.round(clamped));
          }

          function positionFromClientX(clientX) {
            var rect = slider.getBoundingClientRect();
            var percent = ((clientX - rect.left) / rect.width) * 100;
            setPosition(percent);
          }

          var dragging = false;
          handle.addEventListener("mousedown", function () {
            dragging = true;
          });
          window.addEventListener("mouseup", function () {
            dragging = false;
          });
          window.addEventListener("mousemove", function (e) {
            if (dragging) positionFromClientX(e.clientX);
          });

          handle.addEventListener(
            "touchstart",
            function () {
              dragging = true;
            },
            { passive: true },
          );
          window.addEventListener("touchend", function () {
            dragging = false;
          });
          slider.addEventListener(
            "touchmove",
            function (e) {
              if (!dragging) return;
              positionFromClientX(e.touches[0].clientX);
            },
            { passive: true },
          );

          slider.addEventListener("click", function (e) {
            if (e.target === handle || handle.contains(e.target)) return;
            positionFromClientX(e.clientX);
          });

          handle.setAttribute("tabindex", "0");
          handle.setAttribute("role", "slider");
          handle.setAttribute(
            "aria-label",
            "Before and after comparison position",
          );
          handle.setAttribute("aria-valuemin", "0");
          handle.setAttribute("aria-valuemax", "100");
          handle.addEventListener("keydown", function (e) {
            var current = parseFloat(afterWrap.style.width) || 50;
            if (e.key === "ArrowLeft") setPosition(current - 5);
            if (e.key === "ArrowRight") setPosition(current + 5);
          });

          setPosition(50);
        }

        /* =========================================================
     PLAY BUTTON
     ========================================================= */
        function initPlayButton() {
          var playBtn = document.querySelector(".image-play-btn");
          if (playBtn) {
            playBtn.addEventListener("click", function () {
              alert("Video would play here (demo).");
            });
          }
        }

        /* =========================================================
     FOOTER YEAR
     ========================================================= */
        function initFooterYear() {
          var yearEl = $("#current-year");
          if (yearEl) yearEl.textContent = new Date().getFullYear();
        }

        /* =========================================================
     INIT
     ========================================================= */
        document.addEventListener("DOMContentLoaded", function () {
          initMobileMenu();
          initScrollReveal();
          initActiveNav();
          initSliders();
          initAppointmentForm();
          initContactForm();
          initFAQ();
          initLightbox();
          initBeforeAfterSlider();
          initPlayButton();
          initFooterYear();
        });
      })();


      

      document
        .getElementById("quickAppointmentForm")
        .addEventListener("submit", function (e) {
        
          e.preventDefault();
        
          const name = document
            .getElementById("appointmentName")
            .value
            .trim();
        
          const doctor = document
            .getElementById("appointmentDoctor")
            .value;
        
          const department = document
            .getElementById("appointmentDepartment")
            .value;
        
          // Validate form
          if (!name || !doctor || !department) {
            alert("Please fill in all appointment details.");
            return;
          }
        
          // WhatsApp number
          const whatsappNumber = "918273776670";
        
          // WhatsApp message
          const message =
    `Hello, I would like to book a dental appointment.
        
    👤 Name: ${name}
    👨‍⚕️ Doctor: ${doctor}
    🦷 Department: ${department}
        
    Please let me know the available appointment time.`;
        
          // Encode message
          const encodedMessage = encodeURIComponent(message);
        
          // Open WhatsApp
          const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
          window.open(whatsappURL, "_blank");
        });












        //Testimonials Section
    (function() {
      // ----- SLIDER LOGIC (supports 6 slides) -----
      const sliderTrack = document.getElementById('testi-track');
      const slides = sliderTrack ? Array.from(sliderTrack.children) : [];
      const prevBtn = document.querySelector('[data-slider-prev="testimonials"]');
      const nextBtn = document.querySelector('[data-slider-next="testimonials"]');
      const dotsContainer = document.getElementById('testimonials-dots');

      if (!sliderTrack || slides.length === 0) return;

      let currentIndex = 0;
      const totalSlides = slides.length;

      // create dots
      function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
          const dot = document.createElement('button');
          dot.classList.add('slider-dot');
          if (i === currentIndex) dot.classList.add('active');
          dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
          dot.addEventListener('click', () => goToSlide(i));
          dotsContainer.appendChild(dot);
        }
      }

      // update track position & active dot
      function updateSlider() {
        if (!sliderTrack) return;
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

        if (dotsContainer) {
          const dots = dotsContainer.querySelectorAll('.slider-dot');
          dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
          });
        }
      }

      function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;
        updateSlider();
      }

      function nextSlide() {
        goToSlide(currentIndex + 1);
      }

      function prevSlide() {
        goToSlide(currentIndex - 1);
      }

      if (prevBtn) prevBtn.addEventListener('click', prevSlide);
      if (nextBtn) nextBtn.addEventListener('click', nextSlide);

      // keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        }
      });

      // initialize
      createDots();
      updateSlider();
    })();
  





 //Before and After
    (function() {
      'use strict';

      document.addEventListener('DOMContentLoaded', function() {
        const slider = document.getElementById('ba-slider');
        if (!slider) return;

        const afterWrap = document.getElementById('ba-after-wrap');
        const handle = document.getElementById('ba-handle');
        const beforeImg = afterWrap.querySelector('img'); // the "before" image inside the wrap

        if (!afterWrap || !handle || !beforeImg) return;

        // --- state ---
        let isDragging = false;
        let sliderRect = null;          // cached bounding rect
        let currentPercent = 50;        // start at 50%

        // --- helper: get the width of the slider (the container) ---
        function getSliderWidth() {
          return slider.getBoundingClientRect().width;
        }

        // --- update the visual position of the handle and the clipping wrap ---
        function setPosition(percent) {
          // clamp percent between 0 and 100
          percent = Math.min(100, Math.max(0, percent));
          currentPercent = percent;

          // 1. Update the width of the afterWrap (the "before" image container)
          //    The wrap takes up `percent`% of the slider width.
          afterWrap.style.width = percent + '%';

          // 2. The inner image must remain the full width of the slider,
          //    but shifted so it stays aligned with the base image.
          //    We set its width to 100% of the slider width (in px) and
          //    use a negative margin-left equal to the amount of the wrap
          //    that is cut off from the left? Actually we need it to stay
          //    in place: the wrap's left edge is always at 0, and its width
          //    is `percent`% of the slider. The image inside should have width
          //    equal to the *slider's* width, so that the visible part of the
          //    before image exactly aligns with the after image underneath.
          const sliderWidth = getSliderWidth();
          if (sliderWidth > 0) {
            // set the image width to the full slider width
            beforeImg.style.width = sliderWidth + 'px';
            // no need to shift left/right because the wrap's left edge is at 0
            // and the image's left edge is also at 0 — the wrap clips the right side.
          }

          // 3. Move the handle line to `percent`% from the left.
          handle.style.left = percent + '%';
        }

        // --- initialize and recalc on resize ---
        function refresh() {
          // When the slider size changes, we need to re-apply the image width
          // and keep the same percent position.
          setPosition(currentPercent);
        }

        // --- event handlers ---
        function onPointerDown(e) {
          // only left mouse button or touch/pen
          if (e.button !== undefined && e.button !== 0) return;

          isDragging = true;
          sliderRect = slider.getBoundingClientRect();

          // Prevent default to avoid text selection / image drag
          e.preventDefault();

          // Move immediately to the click/touch position
          moveToClientX(e.clientX);

          // Add listeners on document to track movement outside the slider
          document.addEventListener('pointermove', onPointerMove);
          document.addEventListener('pointerup', onPointerUp);
          document.addEventListener('pointercancel', onPointerUp);

          // Optional: set cursor
          document.body.style.cursor = 'ew-resize';
        }

        function onPointerMove(e) {
          if (!isDragging) return;
          e.preventDefault();
          moveToClientX(e.clientX);
        }

        function onPointerUp(e) {
          if (!isDragging) return;
          isDragging = false;
          document.removeEventListener('pointermove', onPointerMove);
          document.removeEventListener('pointerup', onPointerUp);
          document.removeEventListener('pointercancel', onPointerUp);
          document.body.style.cursor = '';
        }

        // --- core: convert clientX to a percentage and update ---
        function moveToClientX(clientX) {
          if (!sliderRect) {
            sliderRect = slider.getBoundingClientRect();
          }
          // Calculate the x position relative to the slider's left edge
          let relativeX = clientX - sliderRect.left;
          // Clamp to slider bounds
          relativeX = Math.min(sliderRect.width, Math.max(0, relativeX));
          // Convert to percentage
          const percent = (relativeX / sliderRect.width) * 100;
          setPosition(percent);
        }

        // --- handle direct clicks on the slider (not just the handle) ---
        // We want a click anywhere on the slider to move the divider there.
        slider.addEventListener('pointerdown', function(e) {
          // If the target is the handle itself, we still want to drag.
          // But we need to prevent the handle's own pointerdown from double-firing.
          // We'll handle everything on the slider container, and let the handle
          // just be a visual element (pointer-events: none? no, we need the cursor).
          // Actually the handle has pointer-events: auto, and it's inside the slider.
          // When you click on the handle, the event bubbles to the slider.
          // So we can just use the slider's pointerdown for all cases.
          // But we must ensure we don't start dragging when clicking on labels? Labels
          // are above (z-index 20) but they are not interactive; we can allow drag
          // starting from them too. It's fine.
          // However, if the user clicks on the handle, we don't want two handlers.
          // We'll only attach to the slider, and ignore if already dragging.
          if (isDragging) return;
          // Use the same logic as onPointerDown
          if (e.button !== undefined && e.button !== 0) return;
          isDragging = true;
          sliderRect = slider.getBoundingClientRect();
          e.preventDefault();
          moveToClientX(e.clientX);
          document.addEventListener('pointermove', onPointerMove);
          document.addEventListener('pointerup', onPointerUp);
          document.addEventListener('pointercancel', onPointerUp);
          document.body.style.cursor = 'ew-resize';
        });

        // Prevent default drag behaviour on images inside the slider
        slider.querySelectorAll('img').forEach(img => {
          img.addEventListener('dragstart', (e) => e.preventDefault());
        });

        // --- initial set-up ---
        // Ensure the before image width is correctly set after layout
        // Use requestAnimationFrame to wait for layout
        requestAnimationFrame(() => {
          refresh();
        });

        // Also handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            // recalc slider rect and reapply position
            sliderRect = slider.getBoundingClientRect();
            refresh();
          }, 150);
        });

        // Optional: respond to orientation change
        window.addEventListener('orientationchange', function() {
          setTimeout(() => {
            sliderRect = slider.getBoundingClientRect();
            refresh();
          }, 200);
        });

        // --- also handle keyboard for accessibility? (not required, but nice) ---
        // Make handle focusable? Could add tabindex, but not necessary for this request.
      });
    })();
  



    
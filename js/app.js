/**
 * Fashion AI Strategy — Full Interactive Page Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll visual elevation
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.classList.remove('active');
      } else {
        mobileDrawer.classList.add('open');
        mobileDrawer.setAttribute('aria-hidden', 'false');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        mobileMenuBtn.classList.add('active');
      }
    });

    // Close mobile menu on clicking link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.classList.remove('active');
      });
    });

    // Close mobile drawer on clicking outside
    document.addEventListener('click', (e) => {
      if (
        mobileDrawer.classList.contains('open') &&
        !mobileDrawer.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.classList.remove('active');
      }
    });
  }

  // 3. Checkout Flow & Direct Link Handling
  const CHECKOUT_URL = 'https://nestuge.com/wisdomai';
  const enrollModal = document.getElementById('enroll-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const enrollButtons = document.querySelectorAll('.btn-open-enroll');
  const enrollForm = document.getElementById('enroll-form');
  const modalStepCheckout = document.getElementById('modal-step-checkout');
  const modalStepSuccess = document.getElementById('modal-step-success');
  const btnSuccessClose = document.getElementById('btn-success-close');
  const orderRef = document.getElementById('order-ref');
  const mobileEnrollBtn = document.getElementById('btn-mobile-enroll');

  // Dismiss mobile drawer when mobile checkout button is tapped
  if (mobileEnrollBtn && mobileDrawer) {
    mobileEnrollBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.classList.remove('active');
      }
    });
  }

  // Open modal triggers (if any elements retain .btn-open-enroll)
  enrollButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Dismiss mobile drawer if open
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        if (mobileMenuBtn) {
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileMenuBtn.classList.remove('active');
        }
      }
      if (enrollModal) {
        modalStepCheckout.style.display = 'block';
        modalStepSuccess.style.display = 'none';
        enrollModal.showModal();
      }
    });
  });

  // Close modal
  if (modalCloseBtn && enrollModal) {
    modalCloseBtn.addEventListener('click', () => {
      enrollModal.close();
    });
  }

  // Helper to trigger Meta Pixel InitiateCheckout event
  function trackInitiateCheckout(source) {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', {
        content_name: 'Fashion AI Strategy Masterclass',
        content_category: 'Online Course',
        value: 10000,
        currency: 'NGN',
        cta_source: source || 'direct_click'
      });
    }
  }

  // Attach InitiateCheckout tracking to all direct CTA links
  const directCtaTriggers = [
    { id: 'btn-header-enroll', source: 'header_nav' },
    { id: 'btn-mobile-enroll', source: 'mobile_drawer' },
    { id: 'btn-hero-enroll', source: 'hero_primary' },
    { id: 'btn-pricing-enroll', source: 'pricing_card' }
  ];

  directCtaTriggers.forEach(({ id, source }) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        trackInitiateCheckout(source);
      });
    }
  });

  // Handle enrollment checkout submission by redirecting to Nestuge checkout
  if (enrollForm) {
    enrollForm.addEventListener('submit', (e) => {
      e.preventDefault();
      trackInitiateCheckout('modal_form');
      window.location.href = CHECKOUT_URL;
    });
  }

  if (btnSuccessClose) {
    btnSuccessClose.addEventListener('click', () => {
      trackInitiateCheckout('modal_success_btn');
      window.location.href = CHECKOUT_URL;
    });
  }

  // Close dialog on clicking outside backdrop
  [enrollModal].forEach(dialog => {
    if (dialog) {
      dialog.addEventListener('click', (e) => {
        const dialogDimensions = dialog.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          dialog.close();
        }
      });
    }
  });

  // 4. Interactive Editorial Lifestyle Thumbnails & Lightbox
  const thumbButtons = document.querySelectorAll('.thumb-btn');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

  thumbButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const imgSrc = btn.getAttribute('data-img');
      if (lightboxModal && lightboxImg && imgSrc) {
        lightboxImg.src = imgSrc;
        lightboxModal.showModal();
      }
    });
  });

  if (lightboxCloseBtn && lightboxModal) {
    lightboxCloseBtn.addEventListener('click', () => {
      lightboxModal.close();
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      const rect = lightboxModal.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        lightboxModal.close();
      }
    });
  }

  // 5. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Optional: close other accordions
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherTrigger = otherItem.querySelector('.faq-trigger');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        if (isActive) {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 6. Smooth Scrolling for Navigation Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerHeight = document.getElementById('header') ? document.getElementById('header').offsetHeight : 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 7. Method Section: Side-by-Side Comparison Tabs & Video Controls
  const methodTabs = document.querySelectorAll('.method-tab-btn');
  const methodPanes = document.querySelectorAll('.method-tab-pane');

  if (methodTabs.length > 0 && methodPanes.length > 0) {
    methodTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-target');
        if (!targetId) return;

        // Deactivate all tabs
        methodTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });

        // Activate clicked tab
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Meta Pixel: Track interaction with video comparison case study
        if (typeof window.fbq === 'function') {
          window.fbq('trackCustom', 'Video_Interaction', {
            action: 'switch_case_study',
            case_study: targetId
          });
        }

        // Toggle panes
        methodPanes.forEach(pane => {
          if (pane.id === targetId) {
            pane.classList.add('active');
            pane.removeAttribute('hidden');

            // Play video in active pane
            const activeVideo = pane.querySelector('.method-visual-video');
            if (activeVideo) {
              activeVideo.play().catch(() => {
                // Autoplay policy fallback: muted play
                activeVideo.muted = true;
                activeVideo.play().catch(() => {});
              });
            }
          } else {
            pane.classList.remove('active');
            pane.setAttribute('hidden', '');

            // Pause video in inactive pane to save bandwidth/resources
            const inactiveVideo = pane.querySelector('.method-visual-video');
            if (inactiveVideo) {
              inactiveVideo.pause();
            }
          }
        });
      });
    });
  }

  // Audio Toggle for AI Videos
  const audioButtons = document.querySelectorAll('.video-audio-toggle');
  audioButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      // Meta Pixel: Track audio toggle interaction
      if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', 'Video_Interaction', {
          action: 'toggle_audio'
        });
      }

      const mediaBox = btn.closest('.method-media-box');
      if (!mediaBox) return;
      const video = mediaBox.querySelector('.method-visual-video');
      if (!video) return;

      const iconMute = btn.querySelector('.icon-mute');
      const iconUnmute = btn.querySelector('.icon-unmute');

      if (video.muted) {
        video.muted = false;
        if (iconMute) iconMute.style.display = 'none';
        if (iconUnmute) iconUnmute.style.display = 'block';
        btn.setAttribute('aria-label', 'Mute video audio');
      } else {
        video.muted = true;
        if (iconMute) iconMute.style.display = 'block';
        if (iconUnmute) iconUnmute.style.display = 'none';
        btn.setAttribute('aria-label', 'Unmute video audio');
      }
    });
  });

  // IntersectionObserver for Method Videos Autoplay/Pause on Scroll
  const methodVideos = document.querySelectorAll('.method-visual-video');
  if ('IntersectionObserver' in window && methodVideos.length > 0) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        const parentPane = video.closest('.method-tab-pane');
        const isPaneActive = parentPane ? parentPane.classList.contains('active') : true;

        if (entry.isIntersecting && isPaneActive) {
          video.play().catch(() => {
            video.muted = true;
            video.play().catch(() => {});
          });
        } else {
          video.pause();
        }
      });
    }, {
      threshold: 0.25
    });

    methodVideos.forEach(v => videoObserver.observe(v));
  }

  // 8. Meta Pixel: ViewContent (When visitor reaches Offer & Pricing section)
  const priceSection = document.getElementById('price') || document.getElementById('what-you-get');
  if (priceSection && 'IntersectionObserver' in window) {
    let viewContentFired = false;
    const viewObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !viewContentFired) {
          viewContentFired = true;
          if (typeof window.fbq === 'function') {
            window.fbq('track', 'ViewContent', {
              content_name: 'Fashion AI Strategy Masterclass Offer',
              content_category: 'Course Pricing',
              value: 10000,
              currency: 'NGN'
            });
          }
          viewObserver.disconnect();
        }
      });
    }, { threshold: 0.25 });
    viewObserver.observe(priceSection);
  }

  // 9. Meta Pixel: Scroll Depth Milestones (50% and 75%)
  let scroll50Fired = false;
  let scroll75Fired = false;
  let scrollTicking = false;

  function checkScrollDepth() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const scrollPercent = (scrollTop / docHeight) * 100;

    if (!scroll50Fired && scrollPercent >= 50) {
      scroll50Fired = true;
      if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', 'ScrollDepth', { percent: 50 });
      }
    }

    if (!scroll75Fired && scrollPercent >= 75) {
      scroll75Fired = true;
      if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', 'ScrollDepth', { percent: 75 });
      }
      window.removeEventListener('scroll', onScrollHandler);
    }
    scrollTicking = false;
  }

  function onScrollHandler() {
    if (!scrollTicking) {
      window.requestAnimationFrame(checkScrollDepth);
      scrollTicking = true;
    }
  }

  window.addEventListener('scroll', onScrollHandler, { passive: true });

  // 10. Meta Pixel: Time on Page (30s and 60s Engagement Milestones)
  setTimeout(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'TimeOnPage', { seconds: 30 });
    }
  }, 30000);

  setTimeout(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'TimeOnPage', { seconds: 60 });
    }
  }, 60000);
});

//https://chat.deepseek.com/a/chat/s/3124ae7c-6639-4c6d-be15-79ab22f8a243

document.addEventListener('DOMContentLoaded', () => {
  const faqBoxes = document.querySelectorAll('.mainArticles .FAQ .questions .box');
  const hamburger = document.getElementById('hamburger');
  const dropdownMenu = document.getElementById('dropdownMenu');

  const navigationMap = {
    home: 'index.html',
    protein: 'protein.html',
    creatine: 'creatine.html',
  };

  const hideDropdown = () => dropdownMenu?.classList.remove('show');
  const showDropdown = () => dropdownMenu?.classList.toggle('show');

  const navigateTo = (path) => {
    if (path) window.location.href = path;
  };

  const smoothScrollToAnchor = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const setupAnchorLinks = () => {
    const typesButton = document.querySelector('.introduction .buttons .types');
    const timingButton = document.querySelector('.introduction .buttons .timing');

    if (typesButton) {
      typesButton.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToAnchor('types');
      });
    }

    if (timingButton) {
      timingButton.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToAnchor('timing');
      });
    }
  };

  const setupNavigation = () => {
    dropdownMenu?.querySelectorAll('a')?.forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
        hideDropdown();

        const href = link.textContent.trim().toLowerCase();
        navigateTo(navigationMap[href]);
      });
    });

    Object.entries(navigationMap).forEach(([key, path]) => {
      document.querySelectorAll(`.button${capitalize(key)}`)?.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          navigateTo(path);
        });
      });
    });
  };

  const setupHamburgerMenu = () => {
    hamburger?.addEventListener('click', (e) => {
      e.stopPropagation();
      showDropdown();
    });

    document.addEventListener('click', (e) => {
      if (!dropdownMenu?.contains(e.target) && !hamburger?.contains(e.target)) {
        hideDropdown();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 600) {
        hideDropdown();
      }
    });
  };

  const setupFAQAccordion = () => {
    faqBoxes.forEach(box => {
      const question = box.querySelector('.question');
      const button = box.querySelector('.faq-toggle');
      const answer = box.querySelector('.answer');
      const icon = button?.querySelector('i');

      const closeAllAnswers = () => {
        document.querySelectorAll('.answer').forEach(ans => ans.style.display = 'none');
        document.querySelectorAll('.faq-toggle i').forEach(i => {
          i.classList.remove('fa-minus');
          i.classList.add('fa-plus');
        });
        document.querySelectorAll('.mainArticles .FAQ .questions .box').forEach(b => b.classList.remove('open'));
      };

      const toggleAnswer = () => {
        const isOpen = answer?.style.display === 'flex';

        closeAllAnswers();

        if (!isOpen) {
          answer.style.display = 'flex';
          icon?.classList.remove('fa-plus');
          icon?.classList.add('fa-minus');
          box.classList.add('open');
        }
      };

      question?.addEventListener('click', (e) => {
        if (e.target === button || e.target === icon) return;
        toggleAnswer();
      });

      button?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAnswer();
      });
    });
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  setupHamburgerMenu();
  setupNavigation();
  setupFAQAccordion();
  setupAnchorLinks();
});
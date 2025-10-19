/*  ---------------------------------------------------
    Template Name: Ogani
    Description:  Ogani eCommerce  HTML Template
    Author: Colorlib
    Author URI: https://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Gallery filter
        --------------------*/
        $('.featured__controls li').on('click', function () {
            $('.featured__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.featured__filter').length > 0) {
            var containerEl = document.querySelector('.featured__filter');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Humberger Menu
    $(".humberger__open").on('click', function () {
        $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").addClass("active");
        $("body").addClass("over_hid");
    });

    $(".humberger__menu__overlay").on('click', function () {
        $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").removeClass("active");
        $("body").removeClass("over_hid");
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*-----------------------
        Categories Slider
    ------------------------*/
    $(".categories__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 4,
        dots: false,
        nav: true,
        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {

            0: {
                items: 1,
            },

            480: {
                items: 2,
            },

            768: {
                items: 3,
            },

            992: {
                items: 4,
            }
        }
    });


    $('.hero__categories__all').on('click', function(){
        $('.hero__categories ul').slideToggle(400);
    });

    /*--------------------------
        Latest Product Slider
    ----------------------------*/
    $(".latest-product__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*-----------------------------
        Product Discount Slider
    -------------------------------*/
    $(".product__discount__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {

            320: {
                items: 1,
            },

            480: {
                items: 2,
            },

            768: {
                items: 2,
            },

            992: {
                items: 3,
            }
        }
    });

    /*---------------------------------
        Product Details Pic Slider
    ----------------------------------*/
    $(".product__details__pic__slider").owlCarousel({
        loop: true,
        margin: 20,
        items: 4,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*-----------------------
		Price Range Slider
	------------------------ */
    var rangeSlider = $(".price-range"),
        minamount = $("#minamount"),
        maxamount = $("#maxamount"),
        minPrice = rangeSlider.data('min'),
        maxPrice = rangeSlider.data('max');
    rangeSlider.slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        values: [minPrice, maxPrice],
        slide: function (event, ui) {
            minamount.val('$' + ui.values[0]);
            maxamount.val('$' + ui.values[1]);
        }
    });
    minamount.val('$' + rangeSlider.slider("values", 0));
    maxamount.val('$' + rangeSlider.slider("values", 1));

    /*--------------------------
        Select
    ----------------------------*/
    $("select").niceSelect();

    /*------------------
		Single Product
	--------------------*/
    $('.product__details__pic__slider img').on('click', function () {

        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.product__details__pic__item--large').attr('src');
        if (imgurl != bigImg) {
            $('.product__details__pic__item--large').attr({
                src: imgurl
            });
        }
    });

    /*-------------------
		Quantity change
	--------------------- */
    var proQty = $('.pro-qty');
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
    });

})(jQuery);


const textSpan = document.querySelector(".hero__text span");
const texts = ["SELAMAT DATANG", "HAPPY SHOPPING", "STAY HEALTHY"];
let index = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = texts[index];
  textSpan.textContent = current.substring(0, charIndex);

  if (!isDeleting && charIndex < current.length) {
    charIndex++;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) index = (index + 1) % texts.length;
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(type, speed);
}

type();

//Gede Bjir

    document.addEventListener('DOMContentLoaded', () => {
        const slides = [
            { url: '#', image: './img/models/1.png', alt: 'Banner Promo 1' },
            { url: '#', image: './img/models/2.png', alt: 'Banner Official Store' },
            { url: '#', image: './img/models/3.png', alt: 'Banner Promo Special' }
        ];

        let currentSlide = 0;
        let autoPlayInterval;
        let isTransitioning = false;

        const track = document.getElementById('sliderTrack');
        const pageControl = document.getElementById('pageControl');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        // Buat slide dan dot
        slides.forEach((slide, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'slide';
            slideDiv.innerHTML = `
                <a href="${slide.url}">
                    <img src="${slide.image}" alt="${slide.alt}">
                </a>
            `;
            track.appendChild(slideDiv);

            const dot = document.createElement('button');
            dot.className = 'page-dot';
            dot.setAttribute('aria-label', 'Slide ' + (index + 1));
            dot.addEventListener('click', () => goToSlide(index));
            pageControl.appendChild(dot);
        });

        function updateSlider() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateDots();
            updateActiveSlide();
        }

        function updateDots() {
            document.querySelectorAll('.page-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        function updateActiveSlide() {
            document.querySelectorAll('.slide').forEach((slide, i) => {
                slide.classList.toggle('active', i === currentSlide);
            });
        }

        function nextSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
            resetAutoPlay();
            setTimeout(() => isTransitioning = false, 800);
        }

        function prevSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
            resetAutoPlay();
            setTimeout(() => isTransitioning = false, 800);
        }

        function goToSlide(index) {
            if (index === currentSlide || isTransitioning) return;
            isTransitioning = true;
            currentSlide = index;
            updateSlider();
            resetAutoPlay();
            setTimeout(() => isTransitioning = false, 800);
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        // Event listener tombol
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        // Hover pause
        const slider = document.querySelector('.slider-wrapper');
        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);

        // Swipe gesture
        let touchStartX = 0;
        slider.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
        slider.addEventListener('touchend', e => {
            let diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
        });

        // Keyboard
        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });

        // Start everything
        updateSlider();
        startAutoPlay();
    });


//inst story

const container = document.getElementById('carouselContainer');
const navButton = document.getElementById('navButton');
const scrollButton = document.getElementById('scrollButton');
const modalOverlay = document.getElementById('modalOverlay');
const modalVideo = document.getElementById('modalVideo');
const closeButton = document.getElementById('closeButton');
const modalClickable = document.getElementById('modalClickable');
const storyItems = document.querySelectorAll('.story-item');

// Open modal when story is clicked
storyItems.forEach(item => {
	item.addEventListener('click', async () => {
		const videoSrc = item.getAttribute('data-video');
		modalVideo.src = videoSrc;
		modalOverlay.classList.add('active');
		document.body.style.overflow = 'hidden';

		try {
			modalVideo.muted = false;      // unmute (some browsers default to muted)
			await modalVideo.play();       // play with audio
		} catch (err) {
			console.warn("Autoplay with sound was blocked:", err);

			// fallback: wait for a user click inside the modal
			modalOverlay.addEventListener('click', () => {
				modalVideo.play().catch(e => console.error(e));
			}, { once: true });
		}
	});
});


// Close modal
function closeModal() {
	modalOverlay.classList.remove('active');
	modalVideo.pause();
	modalVideo.src = '';
	document.body.style.overflow = '';
}

closeButton.addEventListener('click', closeModal);
modalClickable.addEventListener('click', closeModal);

// Close with ESC key
document.addEventListener('keydown', e => {
	if (e.key === 'Escape') closeModal();
});

// Check if scrollable
function checkScrollable() {
	const isScrollable = container.scrollWidth > container.clientWidth;
	const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;

	if (isScrollable && !isAtEnd) {
		navButton.classList.add('show');
	} else {
		navButton.classList.remove('show');
	}
}

// Smooth scroll
scrollButton.addEventListener('click', () => {
	container.scrollBy({
		left: 300,
		behavior: 'smooth'
	});
});

window.addEventListener('load', checkScrollable);
window.addEventListener('resize', checkScrollable);
container.addEventListener('scroll', checkScrollable);

// Drag scroll
let isDown = false;
let startX;
let scrollLeft;

container.addEventListener('mousedown', e => {
	isDown = true;
	startX = e.pageX - container.offsetLeft;
	scrollLeft = container.scrollLeft;
});

container.addEventListener('mouseleave', () => isDown = false);
container.addEventListener('mouseup', () => isDown = false);

container.addEventListener('mousemove', e => {
	if (!isDown) return;
	e.preventDefault();
	const x = e.pageX - container.offsetLeft;
	const walk = (x - startX) * 2;
	container.scrollLeft = scrollLeft - walk;
});

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', function(e) {
            console.log('Searching for:', e.target.value);
        });

        // Cart badge update (example)
        const cartBadge = document.getElementById('cartBadge');
        let cartCount = 0;

        // Example: Update cart count
        function updateCart(count) {
            cartCount = count;
            cartBadge.textContent = cartCount;
        }


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Track external link clicks
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('External link clicked:', link.href);
    });
});
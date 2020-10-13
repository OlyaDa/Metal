'use strict';

document.addEventListener('DOMContentLoaded', () => {
    ///mobileMenu
    const btnOpen = document.querySelector('#btnOpen'),
        menuList = document.querySelector('#menuList'),
        btnClose = document.querySelector('#btnClose'),
        overlay = document.querySelector('#overlay');
        if(menuList) {
            const closeMenu = () => {
                    menuList.classList.remove('open-menu');
                    overlay.classList.remove('open-menu');
            };
            const openMenu = () => {
                menuList.classList.add('open-menu');
                overlay.classList.add('open-menu');
            };
            btnOpen.addEventListener('click', () => {
                openMenu();
            });
            btnClose.addEventListener('click', () => {
                closeMenu();
            });
            
            menuList.addEventListener('click', e => {
                if(menuList.contains(e.target)) {
                    closeMenu();
                }
            });
            document.addEventListener('click', e => {
                if(menuList.classList.contains('open-menu')) {
                    if(e.target === overlay) {
                        closeMenu();
                    }
                }
            });
        }


    //settings show mobile
    const mSearch = document.querySelector('#mSearch'),
        settingsBtn = document.querySelector('#settingsBtn'),
        settingsm = document.querySelector('#settingsm');
        if(mSearch) {
            const settingsShow = () => {
                settingsm.classList.add('settings-show');
            };
            const settingsHide = () => {
                settingsm.classList.remove('settings-show');
            };
            mSearch.addEventListener('click', () => {
                if(settingsm.classList.contains('settings-show')){
                    settingsHide();
                } else {
                    settingsShow();
                }
            });
            settingsBtn.addEventListener('click', e => {
                e.preventDefault();
                settingsHide();
            });
        }
    
    /// tabs myDeal

    const tabsList = document.querySelectorAll('.tabs-list ul li'),
        tabsCont = document.querySelectorAll('.tabs-cont');
    if(tabsList.length != 0) {
        tabsList[0].classList.add('active-list');
        tabsCont[0].classList.add('active-cont');
        tabsList.forEach((key, i) => {
            key.addEventListener('click', () => {
                tabsList.forEach( (key, i) => {
                    key.classList.remove('active-list');
                    tabsCont[i].classList.remove('active-cont'); 
                });
                key.classList.add('active-list');
                tabsCont[i].classList.add('active-cont');
            });
        });
    }

    //list height
    const slickInit = () => {
        if(window.innerWidth <= 992 ) {
            $('.slick-wrap').slick({
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true,
                arrows: false
            });
        }
    };

    const listHeightCHeck = (list, sub) => {
        const mainList = document.querySelectorAll(list),
                subList = document.querySelector(sub);
        if (window.innerWidth <= 992 && mainList.length > 0 && subList) {
                mainList.forEach((key, i) => {
                    subList.children[i].style.height = 'auto';
                    key.style.height = 'auto';
                    if(key.clientHeight >  subList.children[i].clientHeight) {
                        subList.children[i].style.height = key.offsetHeight + 'px';
                    } else {
                        key.style.height =  subList.children[i].offsetHeight + 'px';
                    }
                });
        } else {
            mainList.forEach((key, i) => {
                subList.children[i].style.height = 'auto';
                key.style.height = 'auto';
            });
        }
    };
    listHeightCHeck('.mainsearch-cont-resultTrade-title ul li','.slick-current');
    listHeightCHeck('.curent-title ul li','.slick-current');
    slickInit();

    $('.slick-wrap').on('afterChange', function () {
        listHeightCHeck();
    });

    listHeightCHeck();

    
    window.addEventListener('resize', () => {
        userInfoBuild('.user-cont', '.user-list');
    });

    $(function () {
        $('.mpopup').magnificPopup({
            type: 'inline',
            preloader: false,
            focus: '#username',
            showCloseBtn: false
        });
    });
    const mpopupClose = document.querySelectorAll('.popup-close'),
        forPopupUl = document.querySelectorAll('.forPopup');
    if(mpopupClose.length > 0) {
        mpopupClose.forEach(key => {
            key.addEventListener('click', () => {
                $.magnificPopup.close();
            });
        });
    }
    if(forPopupUl.length > 0) {
        forPopupUl.forEach(key => {
            key.addEventListener('click', ()=> {
                console.log('32');
                $.magnificPopup.open({
                    items: {
                        src: '#popupdeal'
                    },
                    type: 'inline',
                    preloader: false,
                    focus: '#username',
                    showCloseBtn: false
                });
            });
        });
    }

    ///steps
    const nextBtn = document.querySelector('.btn-m-next'),
        prevBtn = document.querySelector('.btn-m-prev'),
        stepsNumber = document.querySelectorAll('.steps-item'),
        mainItem = document.querySelectorAll('.main-it');
    let counterSteps = 0;
    const stepsInit = (count) => {
        stepsNumber.forEach((key, i ) => {
            mainItem[i].classList.remove('main-it-active');
            key.classList.remove('steps-item-active', 'steps-item-end');
            if (i > count && i != 0) {
                key.classList.remove('steps-item-active', 'steps-item-end');
            } else if ( i ==  count) {
                key.classList.add('steps-item-active');
                mainItem[i].classList.add('main-it-active');
            } else if ( i < count ) {
                key.classList.remove('steps-item-active');
                key.classList.add('steps-item-end');
            }
        });
    };
    stepsInit(counterSteps);
    if(nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            if(counterSteps < stepsNumber.length-1) {
                counterSteps++;
                stepsInit(counterSteps);
            } else if (counterSteps == stepsNumber.length-1) {
                e.target.setAttribute('type', 'sybmit');
            }
            if(counterSteps == stepsNumber.length-1){
                e.target.textContent = 'Создать';
            }
        });
    }
    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            if(counterSteps > 0 ) {
                counterSteps--;
                stepsInit(counterSteps);
            }
            
        });
    }


    ////user info list
    const userInfoBuild = (mainCont, listCon) => {
        if(mainCont){
            const mainContE = document.querySelector(mainCont),
                listConE = document.querySelector(listCon);
                listConE.style.width = mainContE.offsetWidth + 'px';
        }

    };
    userInfoBuild('.user-cont', '.user-list');


    const mainContE = document.querySelector('.user-cont'),
    listConE = document.querySelector('.user-list');

    const hideUserInfo = () => {
        mainContE.classList.toggle('user-active');
        listConE.classList.toggle('user-info-active');
    };

    if(mainContE && window.innerWidth > 992){
        document.addEventListener('click', e => {
            if(mainContE.contains(e.target) || listConE.contains(e.target)) {
                hideUserInfo();
            }
        });
    }

});


//gallery popup
$(document).ready(function() {
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
            }
        }
    });

});



$('.slick-list').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    dots: false,
    autoplay: false,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                // slidesToShow: 2,
                // arrows: true,
            }
        },
    ]
});
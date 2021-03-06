/* Template: Aria - Business HTML Landing Page Template
   Author: Inovatik
   Created: Jul 2019
   Description: Custom JS file
*/


(function($) {
    "use strict"; 
	
	/* Preloader */
	$(window).on('load', function() {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});

	
	/* Navbar Scripts */
	// jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 20) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
	});

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function(event) {
    if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });


    /* Rotating Text - Morphtext */
	$("#js-rotating").Morphext({
		// The [in] animation type. Refer to Animate.css for a list of available animations.
		animation: "fadeIn",
		// An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
		separator: ",",
		// The delay between the changing of each phrase in milliseconds.
		speed: 2000,
		complete: function () {
			// Called after the entrance animation is executed.
		}
    });
    

    /* Card Slider - Swiper */
	var cardSlider = new Swiper('.card-slider', {
		autoplay: {
            delay: 4000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		slidesPerView: 3,
		spaceBetween: 20,
        breakpoints: {
            // when window is <= 992px
            992: {
                slidesPerView: 2
            },
            // when window is <= 768px
            768: {
                slidesPerView: 1
            } 
        }
    });

    
    /* Lightbox - Magnific Popup */
	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: false, /* keep it false to avoid html tag shift with margin-right: 17px */
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
    });
    

    /* Filter - Isotope */
    var $grid = $('.grid').isotope({
        // options
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
    });
    
    // filter items on button click
    $('.filters-button-group').on( 'click', 'a', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
    
    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'a', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
        });	
    });
    

    /* Counter - CountTo */
	var a = 0;
	$(window).scroll(function() {
		if ($('#counter').length) { // checking if CountTo section exists in the page, if not it will not run the script and avoid errors	
			var oTop = $('#counter').offset().top - window.innerHeight;
			if (a == 0 && $(window).scrollTop() > oTop) {
			$('.counter-value').each(function() {
				var $this = $(this),
				countTo = $this.attr('data-count');
				$({
				countNum: $this.text()
				}).animate({
					countNum: countTo
				},
				{
					duration: 2000,
					easing: 'swing',
					step: function() {
					$this.text(Math.floor(this.countNum));
					},
					complete: function() {
					$this.text(this.countNum);
					//alert('finished');
					}
				});
			});
			a = 1;
			}
		}
    });


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
    });


    /* Call Me Form */
    $("#callMeForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            lformError();
            lsubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            lsubmitForm();
        }
    });

    function lsubmitForm() {
        // initiate variables with form content
		var name = $("#lname").val();
		var phone = $("#lphone").val();
		var email = $("#lemail").val();
		var select = $("#lselect").val();
        var terms = $("#lterms").val();
        
        $.ajax({
            type: "POST",
            url: "php/callmeform-process.php",
            data: "name=" + name + "&phone=" + phone + "&email=" + email + "&select=" + select + "&terms=" + terms, 
            success: function(text) {
                if (text == "success") {
                    lformSuccess();
                } else {
                    lformError();
                    lsubmitMSG(false, text);
                }
            }
        });
	}

    function lformSuccess() {
        $("#callMeForm")[0].reset();
        lsubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function lformError() {
        $("#callMeForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function lsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#lmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Contact Form */
    $("#contactForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            cformError();
            csubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            csubmitForm();
        }
    });

    function csubmitForm() {
        // initiate variables with form content
		var name = $("#cname").val();
		var email = $("#cemail").val();
        var message = $("#cmessage").val();
        var terms = $("#cterms").val();
        $.ajax({
            type: "POST",
            url: "php/contactform-process.php",
            data: "name=" + name + "&email=" + email + "&message=" + message + "&terms=" + terms, 
            success: function(text) {
                if (text == "success") {
                    cformSuccess();
                } else {
                    cformError();
                    csubmitMSG(false, text);
                }
            }
        });
	}

    function cformSuccess() {
        $("#contactForm")[0].reset();
        csubmitMSG(true, "Message Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
        $("textarea").removeClass('notEmpty'); // resets the field label after submission
    }

    function cformError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function csubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Privacy Form */
    $("#privacyForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            pformError();
            psubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            psubmitForm();
        }
    });

    function psubmitForm() {
        // initiate variables with form content
		var name = $("#pname").val();
		var email = $("#pemail").val();
        var select = $("#pselect").val();
        var terms = $("#pterms").val();
        
        $.ajax({
            type: "POST",
            url: "php/privacyform-process.php",
            data: "name=" + name + "&email=" + email + "&select=" + select + "&terms=" + terms, 
            success: function(text) {
                if (text == "success") {
                    pformSuccess();
                } else {
                    pformError();
                    psubmitMSG(false, text);
                }
            }
        });
	}

    function pformSuccess() {
        $("#privacyForm")[0].reset();
        psubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function pformError() {
        $("#privacyForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function psubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);


function ageCalculator() {
    var dob = new Date("2000-11-25");
    {
    
    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime();
    
    //convert the calculated difference in date format
    var age_dt = new Date(month_diff); 
    
    //extract year from date    
    var year = age_dt.getUTCFullYear();
    
    //now calculate the age of the user
    var age = Math.abs(year - 1970);
    
    //display the calculated age
    return document.getElementById("result").innerHTML =  age;
    }
}

var playerTrack = $("#player-track");
    var bgArtwork = $('#bg-artwork');
    var bgArtworkUrl;
    var albumName = $('#album-name');
    var trackName = $('#track-name');
    var albumArt = $('#album-art'),
        sArea = $('#s-area'),
        seekBar = $('#seek-bar'),
        trackTime = $('#track-time'),
        insTime = $('#ins-time'),
        sHover = $('#s-hover'),
        playPauseButton = $("#play-pause-button"),
        i = playPauseButton.find('i'),
        tProgress = $('#current-time'),
        tTime = $('#track-length'),
        seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
        buffInterval = null, tFlag = false;

    var playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;

    var songs = [{
        artist: "Tris",
        name: "3.1.0.7 2(Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/3.1.0.7%202%20guitar%20Tris.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    }, {
        artist: "Tris",
        name: "3.1.0.7 Rap (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/3.1.0.7%20rap%20Tris.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "Cha gi?? r???i ????ng kh??ng (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/Cha%20gi??%20r???i%20????ng%20kh??ng%20Tris.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "Chuy???n c???a m??a ????ng (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/Chuy???n%20c???a%20m??a%20????ng%20Tris.mp3",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "Ch???m ????y n???i ??au (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/Ch???m%20????y%20n???i%20??au%20Tris.mp3",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "C??n m?? b??ng gi?? (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/C??n%20m??%20b??ng%20gi??%20guitar%20Tris.mp3",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "Gi?? v???n h??t (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/Gi??%20v???n%20h??t%20guitar%20Tris.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "H???t th????ng c???n nh??? (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/H???t%20th????ng%20c???n%20nh???%20Tris.mp3",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "Mu???n m??ng l?? t??? l??c (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/Mu???n%20m??ng%20l??%20t???%20l??c%20beat%20Tris.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "M??nh chia tay ??i (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/M??nh%20chia%20tay%20??i%20guitar%20Tris.mp3",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "Ng?????i ta n??i (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/Ng?????i%20ta%20n??i%20Tris.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "N??m ???y (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/N??m%20???y%20Tris.mp3",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "N??? ai ???? l???i xin l???i (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/N???%20ai%20????%20l???i%20xin%20l???i%20Tris.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "S??i G??n ??au l??ng qu?? (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/S??i%20G??n%20??au%20l??ng%20qu??%20Tris.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "S??i G??n ??au l??ng qu?? rap (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/S??i%20G??n%20??au%20l??ng%20qu??%20rap%20Tris%20.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "T??nh n??o kh??ng nh?? t??nh ?????u (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/T??nh%20n??o%20kh??ng%20nh??%20t??nh%20?????u%20Tris.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "Y??u nh?? ng??y y??u cu???i (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/Y??u%20nh??%20ng??y%20y??u%20cu???i%20Tris.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "Y??u ???????c kh??ng (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/Y??u%20???????c%20kh??ng%20Tris.mp3",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "??au ????? tr?????ng th??nh (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/??au%20?????%20tr?????ng%20th??nh%20guitar%20Tris.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "???????ng em ??i anh s??? ??i ng?????c l???i (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/???????ng%20em%20??i%20anh%20s???%20??i%20ng?????c%20l???i%20guitar%20Tris.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "3.1.0.7 3 (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/3.1.0.7%203%20guitar%20Tris.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "V??? (Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/V???%20Tris.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "Cu???c s???ng em ???n kh??ng(Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/Cu???c%20s???ng%20em%20???n%20kh??ng%20beat.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "Th????ng(Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/Th????ng%20Tris.mp3",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "Thay t??i y??u c?? ???y(Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/Thay%20t??i%20y??u%20c??%20???y%20Tris.mp3",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "Ph??? xa(Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/Ph???%20xa%20Tris.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    },
    {
        artist: "Tris",
        name: "U???c c?? ng?????i b??n t??i m???i khi bu???n(Cover)",
        url: "https://trisnguyen2511.github.io/CVHTML/Songs/?????c%20c??%20ng?????i%20b??n%20t??i%20m???i%20khi%20bu???n%20guitar.wav",
        picture: "images/5fc779186aa1140014eda0ae.png"
    }

    
    ];

    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
    songs = shuffle(songs);

    function playPause() {
        setTimeout(function () {
            if (audio.paused) {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class', 'fas fa-pause');
                audio.play();
            }
            else {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class', 'fas fa-play');
                audio.pause();
            }
        }, 300);
    }


    function showHover(event) {
        seekBarPos = sArea.offset();
        seekT = event.clientX - seekBarPos.left;
        seekLoc = audio.duration * (seekT / sArea.outerWidth());

        sHover.width(seekT);

        cM = seekLoc / 60;

        ctMinutes = Math.floor(cM);
        ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if (ctMinutes < 10)
            ctMinutes = '0' + ctMinutes;
        if (ctSeconds < 10)
            ctSeconds = '0' + ctSeconds;

        if (isNaN(ctMinutes) || isNaN(ctSeconds))
            insTime.text('--:--');
        else
            insTime.text(ctMinutes + ':' + ctSeconds);

        insTime.css({ 'left': seekT, 'margin-left': '-21px' }).fadeIn(0);

    }

    function hideHover() {
        sHover.width(0);
        insTime.text('00:00').css({ 'left': '0px', 'margin-left': '0px' }).fadeOut(0);
    }

    function playFromClickedPos() {
        audio.currentTime = seekLoc;
        seekBar.width(seekT);
        hideHover();
    }

    function updateCurrTime() {
        nTime = new Date();
        nTime = nTime.getTime();

        if (!tFlag) {
            tFlag = true;
            trackTime.addClass('active');
        }

        curMinutes = Math.floor(audio.currentTime / 60);
        curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

        durMinutes = Math.floor(audio.duration / 60);
        durSeconds = Math.floor(audio.duration - durMinutes * 60);

        playProgress = (audio.currentTime / audio.duration) * 100;

        if (curMinutes < 10)
            curMinutes = '0' + curMinutes;
        if (curSeconds < 10)
            curSeconds = '0' + curSeconds;

        if (durMinutes < 10)
            durMinutes = '0' + durMinutes;
        if (durSeconds < 10)
            durSeconds = '0' + durSeconds;

        if (isNaN(curMinutes) || isNaN(curSeconds))
            tProgress.text('00:00');
        else
            tProgress.text(curMinutes + ':' + curSeconds);

        if (isNaN(durMinutes) || isNaN(durSeconds))
            tTime.text('00:00');
        else
            tTime.text(durMinutes + ':' + durSeconds);

        if (isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds))
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');


        seekBar.width(playProgress + '%');

        if (playProgress == 100) {
            i.attr('class', 'fa fa-play');
            seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
            selectTrack(1);
        }
    }

    function checkBuffering() {
        clearInterval(buffInterval);
        buffInterval = setInterval(function () {
            if ((nTime == 0) || (bTime - nTime) > 1000)
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        }, 100);
    }

    function selectTrack(flag) {
        if (flag == 0 || flag == 1)
            ++currIndex;
        else
            --currIndex;
        if(currIndex>=songs.length){
            alert("h???t nh???c r???i ^^");
            --currIndex;
            return;
        }


        if ((currIndex > -1) && (currIndex < songs.length)) {
            if (flag == 0)
                i.attr('class', 'fa fa-play');
            else {
                albumArt.removeClass('buffering');
                i.attr('class', 'fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');

            currAlbum = songs[currIndex].name;
            currTrackName = songs[currIndex].artist;
            currArtwork = songs[currIndex].picture;

            audio.src = songs[currIndex].url;

            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if (flag != 0) {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');

                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            $('#album-art img').prop('src', bgArtworkUrl);
        }
        else {
            if (flag == 0 || flag == 1)
                --currIndex;
            else
                ++currIndex;
        }
    }

    function initPlayer() {
        audio = new Audio();

        selectTrack(0);

        audio.loop = false;

        playPauseButton.on('click', playPause);

        sArea.mousemove(function (event) { showHover(event); });

        sArea.mouseout(hideHover);

        sArea.on('click', playFromClickedPos);

        $(audio).on('timeupdate', updateCurrTime);

        playPreviousTrackButton.on('click', function () { selectTrack(-1); });
        playNextTrackButton.on('click', function () { selectTrack(1); });
    }

    initPlayer();

jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    // 初回のみローディング
    const webStorage = function () {
        if (sessionStorage.getItem('visit')) {
            $(".loading").css("visibility", "hidden");
        } else {
            sessionStorage.setItem('visit', 'true'); 
            $(".loading").delay(2000).fadeOut(1000);
        }
    }
    webStorage();


    // $(window).on("load", function () {
    //     $(".js-loading__img").delay(800).fadeOut(600); // 画像をフェードアウト
    //     $(".js-loading").delay(1000).fadeOut(600); // 背景色をフェードアウト
    // });
    // // ページの読み込みが完了しなくても2秒経ったら強制的にローディング画面をフェードアウト
    // setTimeout(stoploading, 2000);
    // function stoploading() {
    //     $(".js-loading").fadeOut(600);
    // }


    $(function() {
        // フェードイン
        $(window).scroll(function (){
            $('.js-fade').each(function(){
                var pos = $(this).offset().top;
                var scroll = $(window).scrollTop();
                var windowHeight = $(window).height();
                if (scroll > pos - windowHeight + 50){
                    $(this).addClass('scroll');
                }
            });
        });


        // ページ移動先の位置調整
        let headerHeight = $('.header').outerHeight();
        let urlHash = location.hash;
        if (urlHash) {
        let position = $(urlHash).offset().top - headerHeight;
        $('html, body').animate({ scrollTop: position }, 0);
        }
    // });

    // スムーススクロール
    // $(function() {
        // #から始まるアンカータグをクリックしたら処理を実行
        $('a[href^="#"]').click(function() {
            // const adjust = -105;
            // スクロールの速度（ミリ秒）
            const speed = 500;
            // アンカーの値取得（リンク先<href>を取得して、hrefという変数に代入）
            const href = $(this).attr("href");
            // 移動先を取得（リンク先<href>のidがある要素を探してtargetに代入）
            const target = $(href == "#" || href == "" ? "html" : href);
            // 移動先を調整(idの要素の位置をoffset()で取得しpositionに代入<ヘッダー分は差し引く>）
            const position = target.offset().top - $( '.js-header' ).outerHeight();

            console.log('Position:', position);
            // スムーススクロール
            $("html, body").animate({scrollTop: position}, speed, "swing");

            return false;
        });
    // });

        //   ヘッダー追従
        let header = $('.header');
        let headerNav = $('.header__nav-item-white')
        // let headerHeight = $('.header').height();
        let height = $('.js-fv-height').height();

        $(window).scroll(function () {
        if ($(this).scrollTop() > height - 30) {
            header.addClass('is-color');
            headerNav.addClass('is-color');
        } else {
            header.removeClass('is-color');
            headerNav.removeClass('is-color');
        }
        });




    // ハンバーガーメニュー
    // $(function () {
        $(".js-hamburger").on("click", function () {
            $(this).toggleClass("is-open");
            if ($(this).hasClass("is-open")) {
                openDrawer();
            } else {
                closeDrawer();
            }
        });

        // backgroundまたはページ内リンクをクリックで閉じる
        $(".header__drawer, .js-drawer a[href]").on("click", function () {
            closeDrawer();
        });


        // resizeイベント
        $(window).on('resize', function () {
            if (window.matchMedia("(min-width: 768px)").matches) {
                closeDrawer();
            }
        });
    // });

        function openDrawer() {
            $(".js-drawer").fadeIn();
            $(".js-hamburger").addClass("is-open");
        }

        function closeDrawer() {
            $(".js-drawer").fadeOut();
            $(".js-hamburger").removeClass("is-open");
        }

    // モダール
    // $(function () {
        $(".js-modal-open").on("click", function () {
            $(".js-modal").fadeIn();
            return false;
        });
        $(".js-modal-close").on("click", function () {
            $(".js-modal").fadeOut();
            return false;
        });
    // });

    // モーダルウィンドウオープン時の背景固定
    // $(function () {
        let scrollPosition;
        $(".js-modal-open").on("click", function () {
            scrollPosition = $(window).scrollTop();
            $("body").addClass("fixed").css({ top: -scrollPosition });
        });
        $(".js-modal-close").on("click", function () {
            $("body").removeClass("fixed").css({ top: 0 });
            window.scrollTo(0, scrollPosition);
        });
    // });



    // サインインボタン非活性
        $(document).ready(function () {
            var $submitBtn = $('#js-modal-submit');
            $('.modal__form input').on('change', function () {
                if (
                    $('.modal__form input[type="email"]').val() !== "" &&
                    $('.modal__form input[type="password"]').val() !== ""
                ) {
                    $submitBtn.prop('disabled', false);
                    $submitBtn.addClass('modal__submit-active');
                } else {
                    $submitBtn.prop('disabled', true);
                    $submitBtn.removeClass('modal__submit-active');
                }
            });
        });

    // 送信ボタン非活性
        $(document).ready(function () {
            var $submitBtn = $('#js-entry__submit');
                $('.entry__form input, .entry__form textarea').on('change', function () {
                
                if (
                    $('.entry__form input[type="radio"]:checked').length !== 0 && // チェックの数が０ではない
                    $('.entry__form #name').val() !== "" && 
                    $('.entry__form #age').val() !== "" && 
                    $('.entry__form #mail').val() !== "" &&
                    $('.entry__form #income').val() !== "" &&
                    $('.entry__form textarea[name="resume"]').val() !== "" &&
                    $('.entry__form textarea[name="pr"]').val() !== "" &&
                    $('.entry__form #privacyCheck').prop('checked') === true
                ) {
                    $submitBtn.prop('disabled', false);
                    $submitBtn.addClass('form-submit-active');
                } else {
                    $submitBtn.prop('disabled', true);
                    $submitBtn.removeClass('form-submit-active');
                }
            });
        });
    
    // サンクスページへ
        $(document).ready(function () {
            $('.entry__form').submit(function (event) {
                // var formData = $('#form').serialize();
                // $.ajax({
                // url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdEPrh7Faf6xDivpTrRPNQhix3T0ndMkKZD7H-g1AkyMxhnqQ/formResponse",
                // data: formData,
                // type: "POST",
                // dataType: "xml",
                // statusCode: {
                // 0: function () {
                // //$(".end-message").slideDown();
                // //$(".submit-btn").fadeOut();
                window.location.href = "thanks.html";
                // },
                // 200: function () {
                // $(".false-message").slideDown();
                // }
                // }
                // });
                event.preventDefault();
            });
        });

    });
});



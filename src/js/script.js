
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    $(window).on("load", function () {
        $(".js-loading__img").delay(800).fadeOut(600); // 画像をフェードアウト
        $(".js-loading").delay(1000).fadeOut(600); // 背景色をフェードアウト
        });
        // ページの読み込みが完了しなくても2秒経ったら強制的にローディング画面をフェードアウト
        setTimeout(stoploading, 2000);
        function stoploading() {
        $(".js-loading").fadeOut(600);
        }

        // ハンバーガーメニュー
    $(function () {
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
        $(window).on('resize', function() {
            if (window.matchMedia("(min-width: 768px)").matches) {
                closeDrawer();
            }
        });
    });

    function openDrawer() {
        $(".js-drawer").fadeIn();
        $(".js-hamburger").addClass("is-open");
    }

    function closeDrawer() {
            $(".js-drawer").fadeOut();
        $(".js-hamburger").removeClass("is-open");
    }

    // モダール
    $(function () {
        $(".js-modal-open").on("click", function () {
            $(".js-modal").fadeIn();
            return false;
        });
        $(".js-modal-close").on("click", function () {
            $(".js-modal").fadeOut();
            return false;
        });
    });

    // モーダルウィンドウオープン時の背景固定
    $(function () {
        let scrollPosition;
        $(".js-modal-open").on("click", function () {
            scrollPosition = $(window).scrollTop();
            $("body").addClass("fixed").css({ top: -scrollPosition });
        });
        $(".js-modal-close").on("click", function () {
            $("body").removeClass("fixed").css({ top: 0 });
            window.scrollTo(0, scrollPosition);
        });
    });

    // サインインボタン非活性
    $(document).ready(function () {
        var $submitBtn = $('#js-submit');
        $('.form input').on('change', function () {
            if (
                $('.form input[type="email"]').val() !== "" && 
                $('.form input[type="password"]').val() !== ""
            ) {
                $submitBtn.prop('disabled', false);
                $submitBtn.addClass('modal__submit-active');
            } else {
                $submitBtn.prop('disabled', true);
                $submitBtn.removeClass('modal__submit-active');
            }
        });
    });
        

});

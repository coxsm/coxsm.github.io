$(document).ready(function () {

    setTimeout(function () {

        $(".animsition").animsition({

            inClass: 'fade-in-up-sm',
            outClass: 'fade-out-up-sm',
            inDuration: 2000,
            outDuration: 800,
            linkElement: '.animsition-link',
            // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
            loading: false,
            loadingParentElement: 'body', //animsition wrapper element
            loadingClass: 'animsition-loading',
            unSupportCss: ['animation-duration',
                              '-webkit-animation-duration',
                              '-o-animation-duration'
                            ],
            //"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
            //The default setting is to disable the "animsition" in a browser that does not support "animation-duration".

            overlay: false,

            overlayClass: 'animsition-overlay-slide',
            overlayParentElement: 'body'
        });

    }, 1000);

});


$(document).ready(function(){
    $("#modal-custom").iziModal({
        title: '',
        subtitle: '',
        headerColor: '#88A0B9',
        background: null,
        theme: '',  // light
        icon: null,
        iconText: null,
        iconColor: '',
        rtl: false,
        width: 600,
        top: null,
        bottom: null,
        borderBottom: true,
        padding: 0,
        radius: 3,
        zindex: 999999,
        iframe: false,
        iframeHeight: 400,
        iframeURL: null,
        focusInput: true,
        group: '',
        loop: false,
        arrowKeys: true,
        navigateCaption: true,
        navigateArrows: true, // Boolean, 'closeToModal', 'closeScreenEdge'
        history: false,
        restoreDefaultContent: false,
        autoOpen: 0, // Boolean, Number
        bodyOverflow: false,
        fullscreen: false,
        openFullscreen: false,
        closeOnEscape: true,
        closeButton: true,
        appendTo: 'body', // or false
        appendToOverlay: 'body', // or false
        overlay: true,
        overlayClose: true,
        overlayColor: 'rgba(0, 0, 0, 0.6)',
        timeout: true,
        timeoutProgressbar: true,
        pauseOnHover: false,
        timeoutProgressbarColor: 'rgba(255,255,255,0.5)',
        transitionIn: 'comingIn',
        transitionOut: 'comingOut',
        transitionInOverlay: 'fadeIn',
        transitionOutOverlay: 'fadeOut',
        onOpened: function() {
            //console.log('onOpened');
        },
        onClosed: function() {
            //console.log('onClosed');  
        }

    });
    $("#modal-custom").on('click', 'header a', function(event) {
        event.preventDefault();
        var $this = $(this);
        var index = $this.index();
        $this.addClass('active').siblings('a').removeClass('active');
        
        var $sections = $this.closest('div').find('.sections');
        var $currentSection = $this.closest("div").find("section").eq(index);
        //var $nextSection = $this.closest("div").find("section").eq(index).siblings('section');
    
        $sections.css('height', $currentSection.innerHeight());
    
        function changeHeight(){
            $this.closest("div").find("section").eq(index).fadeIn().siblings('section').fadeOut(100);
        }
    
        if( $currentSection.innerHeight() > $sections.innerHeight() ){
            changeHeight();
        } else {
            setTimeout(function() {
                changeHeight();
            }, 150);
        }
    
        if( $this.index() === 0 ){
            $("#modal-custom .iziModal-content .icon-close").css('background', '#ddd');
        } else {
            $("#modal-custom .iziModal-content .icon-close").attr('style', '');
        }
    });
    
    $("#modal-custom").on('click', '.submit', function(event) {
        event.preventDefault();
    
        var fx = "wobble",  //wobble shake
            $modal = $(this).closest('.iziModal');
    
        if( !$modal.hasClass(fx) ){
            $modal.addClass(fx);
            setTimeout(function(){
                $modal.removeClass(fx);
            }, 1500);
        }
    });
})

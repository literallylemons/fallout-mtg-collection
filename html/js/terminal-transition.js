(function(){

    const transitionDuration = 320;

    let transitioning = false;

    function startTransition(url){

        if(transitioning){

            return;

        }

        const terminal =
            document.querySelector(
                ".terminal"
            );

        if(!terminal){

            window.location.href = url;

            return;

        }

        transitioning = true;


        terminal.classList.add(
            "crt-transition"
        );

        setTimeout(function(){

            window.location.href = url;

        }, transitionDuration);

    }

    document.addEventListener(
        "click",
        function(event){

            const link =
                event.target.closest(
                    "a"
                );


            if(!link){

                return;

            }

            if(
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            ){

                return;

            }

            if(
                link.target &&
                link.target !== "_self"
            ){

                return;

            }

            const href =
                link.getAttribute(
                    "href"
                );

            if(
                !href ||
                href.startsWith("#") ||
                href.startsWith("javascript:")
            ){

                return;

            }

            const url =
                new URL(
                    href,
                    window.location.href
                );


            if(
                url.origin !==
                window.location.origin
            ){

                return;

            }

            if(
                url.pathname ===
                window.location.pathname &&
                url.search ===
                window.location.search
            ){

                return;

            }

            event.preventDefault();

            startTransition(
                url.href
            );

        }
    );

})();

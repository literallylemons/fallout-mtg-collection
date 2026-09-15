(function(){

    const bootSteps = [
        "INITIALIZING:",
        "ESTABLISHING CONNECTION:",
        "ACCESSING CARD DATABASE:",
        "LOADING COLLECTION DATA:",
        "VERIFYING DATABASE:",
        "LOADING TERMINAL INTERFACE:",
        "INITIALIZING DISPLAY:",
        "SYSTEM CHECK:"
    ];

    const minDelay = 600;
    const maxDelay = 1400;

    let loader;
    let currentStep = 0;
    let pageReady = false;
    let sequenceFinished = false;


    function randomDelay(){

        return Math.floor(
            Math.random() *
            (maxDelay - minDelay + 1)
        ) + minDelay;

    }


    function createLoader(){

        loader =
            document.createElement("div");

        loader.className =
            "terminal-loader";


        loader.innerHTML = `

            <div class="terminal">

                <div class="header">

                    <div class="terminal-title">
                        COLLECTION MANAGEMENT TERMINAL
                    </div>

                    <div class="system-title">
                        ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM v 1.61
                    </div>

                    <div class="copyright">
                        COPYRIGHT 2075-2077 ROBCO INDUSTRIES
                    </div>

                </div>


                <div class="divider">
                    ============================================================
                </div>


                <div class="terminal-loader-steps"></div>

            </div>

        `;


        document.body.appendChild(loader);

    }


    function addStep(text){

        const steps =
            loader.querySelector(
                ".terminal-loader-steps"
            );


        const line =
            document.createElement("div");

        line.className =
            "terminal-loader-line";


        line.innerHTML =
            `> ${text} <span class="terminal-loader-cursor"></span>`;


        steps.appendChild(line);


        return line;

    }


    function completeStep(line){

        const cursor =
            line.querySelector(
                ".terminal-loader-cursor"
            );


        if(cursor){

            cursor.remove();

        }


        line.innerHTML +=
            ` <span class="terminal-loader-complete">OK</span>`;

    }


    function runNextStep(){

        if(currentStep >= bootSteps.length){

            finishBootSequence();

            return;

        }


        const line =
            addStep(
                bootSteps[currentStep]
            );


        setTimeout(function(){

            completeStep(line);

            currentStep++;


            setTimeout(
                runNextStep,
                100
            );

        }, randomDelay());

    }


    function finishBootSequence(){

        sequenceFinished = true;


        const steps =
            loader.querySelector(
                ".terminal-loader-steps"
            );


        const readyLine =
            document.createElement("div");

        readyLine.className =
            "terminal-loader-line terminal-loader-complete";

        readyLine.textContent =
            "> SYSTEM READY.";


        steps.appendChild(readyLine);


        setTimeout(function(){

            if(pageReady){

                startTransition();

            }

        }, 350);

    }


    function startTransition(){

        if(
            !sequenceFinished ||
            !pageReady
        ){

            return;

        }


        loader
            .querySelector(".terminal")
            .classList.add("crt-transition");


        setTimeout(function(){

            if(loader){

                loader.remove();

            }

        }, 320);

    }


    window.finishTerminalLoading =
        function(){

            pageReady = true;


            if(sequenceFinished){

                startTransition();

            }

        };


    function start(){

        createLoader();

        runNextStep();

    }


    if(document.readyState === "loading"){

        document.addEventListener(
            "DOMContentLoaded",
            start
        );

    }else{

        start();

    }

})();

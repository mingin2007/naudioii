
    window.onload = function(){
       
        
        var words =  [];
        
        document.getElementById("submit-selection").onclick = function(){
            var sel = document.getElementById("quest-select").options[document.getElementById("quest-select").selectedIndex].text;
            
            var url = 'http://localhost:3000/JSON/' + sel;
           // alert(url);
            fetch(url, { mode: 'no-cors' })
                .then((res) => res.json())
            .then((data)=> {words = data; words.sort(()=> Math.random() - 0.5);});

        document.getElementById("screen").style.visibility = 'hidden';
        }

        console.log("b4 " + words);

        console.log("after " + words);
    
        var rep = document.querySelector("#replay");
        var next = document.querySelector("#next");
        var audAns = document.querySelector("#ans-aud");
        var audWord = document.querySelector("#word-aud");
        var left = document.querySelector("#left");
        var middle = document.querySelector("#middle");        
        var right = document.querySelector("#right");
        var correct = 0;
        var playing = 0;
        var correctAnswers = 0;
        var totalAnswers = 0;
        var running = 0;
        
        var startTime = 0;
    
        rep.onclick = ()=>{if(playing)audWord.play()};
        next.onclick = ()=>{        
            play();
            if(!running){
                startTime = Date.now();
                running = 1;
    
                setTimeout(()=>{
                    alert("Σε ένα λεπτό διάβασες " + totalAnswers + " λέξεις με  " + correctAnswers + " σωστές επιλογές");
                    location.reload(); 
                }, 60000);
            }
        }
    
        function play(){
            if(!words.length){
                alert("Σε " + ((Date.now() - startTime) / 1000) + "δευτερόλεπτα διάβασες " + totalAnswers + " με  " + correctAnswers + " σωστές επιλογές");
                return;
                }
    
            playing = 1;
            let elmn = words.pop(); 
            audWord.src = "./audio/" + elmn[0];
            let textSize = Math.max(elmn[1].length, elmn[2].length, elmn[2].length);
            console.log(textSize);
            [...document.getElementsByClassName("words")].forEach(element => {
                element.style.fontSize = (6-(textSize/5))+"vw";
            });

            let selector = Math.random();
            if(selector>0.67){
                left.textContent = elmn[1];
                middle.textContent = elmn[2];
                right.textContent = elmn[3];
                correct = 1;
            }else if(selector < 0.68 && selector > 0.33){
                left.textContent = elmn[2];
                middle.textContent = elmn[1];
                right.textContent = elmn[3];
                correct = 2;
            }else{
                left.textContent = elmn[3];
                middle.textContent = elmn[2];                    
                right.textContent = elmn[1];
                correct = 3;
            }
            audWord.play();
            right.style.backgroundColor = "blueviolet";
            middle.style.backgroundColor = "blueviolet";
            left.style.backgroundColor = "blueviolet";
        };
    
        
        function checkAnswer(){
            if(!playing)
                return;
            if ((this.id == "left" && correct == 1 ) || (this.id == "middle" && correct == 2 ) || (this.id == "right" && correct == 3 ) ) {
                    this.style.backgroundColor = "green";
                    correctAnswers +=1;
                    audAns.src = "./audio/sound-cor.ogg";
                }else{
                    this.style.backgroundColor = "red";
                    audAns.src = "./audio/sound-wro.ogg";
                }
            audAns.play();
            playing = 0;
            this.blur();
            totalAnswers +=1;
            setTimeout(play, 1000);
        }
    
        left.onclick = checkAnswer;
        middle.onclick = checkAnswer;
        right.onclick = checkAnswer;
    }

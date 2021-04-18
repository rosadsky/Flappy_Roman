
window.onload = function () {

    const c = document.getElementById('canvas');
    const hudbaPozadie = document.getElementById('hudba');

    c.width = 485; // Šírka canvasu
    c.height = 600; // Výška canvasu


    let vyskaPrechodu = 300; //Priestor pre vtáka v px

    let SkoreKorunky= 0;
    let pomocnaScore= 0;
    let cas = 0;
    let rychlost = 3;



    const ctx = c.getContext('2d');
    const prostredie = new Prostredie(c,ctx); //c, ctx
    const vtak = new Vtak(264,250,ctx); //x,y,ctx
    const budovy = [];
    const korunky = [];


    const gameovertext = document.getElementById('gameover');
    const gameovermenu = document.getElementById('gameovermenu');
    const zvukon = document.getElementById('zvukon');
    const zvukoff = document.getElementById('zvukoff');
    const korunkaskore = document.getElementById('korunkaskore');
    const fail = document.getElementById('fail');


    setInterval(function () { //Interval na každých 3000 = 3 sekundy.
        let budovaSet = generovanieBudov(ctx,c.width,c.height);

        budovy.push(budovaSet.top,budovaSet.bottom);


    },1650)


    setInterval(function () { //Interval na každých 3000 = 3 sekundy.
        let korunaSet = generovanieKoruniek(ctx,c.width,c.height);

        korunky.push(korunaSet);

    },3300)


    loopHry();

    //hlavný loop
    function loopHry() {

        if (vtak.gameover){
            hudbaPozadie.pause();
            if (vtak.hudbaPoz){
                fail.play();
            }

            gameOverText(vtak);
        } else {

            prostredie.update();
            prostredie.render();

            budovy.forEach(function (budova) { //pre každý budova objekt sa updatuje aj renderuje horná aj spodná budova
                budova.update();
                budova.render();
            });

            korunky.forEach(function (korunka) {
                korunka.update();
                korunka.render();

            });

            vtak.update(budovy);
            vtak.render();

            ctx.font = "50px Helvetica";
            ctx.fillStyle = "white";
            ctx.fillText ( SkoreKorunky, 225, 180);


            if (detectCollision(vtak,budovy)) { vtak.gameover = true; }

            if (detekciaKorunky(vtak,korunky)) {
                if (pomocnaScore< 1){
                    SkoreKorunky++;
                    console.log(SkoreKorunky);

                   if (rychlost<4 && SkoreKorunky>15){
                       rychlost += 0.25;  // zrychlovanie pohyb budov
                   }



                    if(vyskaPrechodu>=200 && SkoreKorunky % 3 ===0){
                        vyskaPrechodu -=25; //znižovanie prechodu
                    }

                    pomocnaScore++;
                    if(vtak.hudbaPoz){
                        korunkaskore.play();
                    };
                    cas = 0;
                }

            } else  {
                cas++;
                if (cas%3===0){
                    pomocnaScore = 0;
                }
            }



            if(vtak.hudbaPoz){
                ctx.drawImage(zvukon,5,5,35,35);
                hudbaPozadie.play();

            }
            if(!vtak.hudbaPoz ){
                hudbaPozadie.pause();
                ctx.drawImage(zvukoff,5,5,35,35);
            }

            window.requestAnimationFrame(loopHry);
        }



    }

    //Vrátime dve hodnoty .top,.bottom

    function generovanieBudov(ctx) {
        let dlzkaTop = Math.round(Math.random()*200+50); //náhodné číslo okolo 300 //HORNá budova // výška
                let dlzaBottom = 600 - vyskaPrechodu - dlzkaTop;        //spodna budova hodnoty - generácoa
        let rBudova = { };
        rBudova.top = new Budova(600, 0 , dlzkaTop, rychlost, ctx); // Generovanie vrchnej budovy
        rBudova.bottom = new Budova(600, 600 - dlzaBottom, dlzaBottom, rychlost, ctx); // Generovanie spodnej budovy
        return rBudova;
    }


    function generovanieKoruniek(ctx) {
        let dlzkaTop = Math.round(Math.random()*333+150); //náhodné číslo okolo 300 //HORNá budova // výška
        let rKoruna = { };
        rKoruna = new Koruna(780, dlzkaTop , rychlost, ctx); // Generovanie vrchnej budovy
        return rKoruna;
    }

    function gameOverText(vtak) {
        ctx.drawImage(gameovertext,40,30,416,114);
        ctx.drawImage(gameovermenu,150,300,186,140);
        ctx.font = "30px Helvetica";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Tvoje skóre: " + SkoreKorunky, 242.2, 250);

        document.addEventListener('click', (event)=>{
            var rect = canvas.getBoundingClientRect();
            let x = event.clientX-rect.left;
            let y = event.clientY - rect.top;
            if (y>=300 && y<370 && x>150 && x<320){ window.location.href="menu.html"; }
            if (y>=375 && y<445 && x>150 && x<320){ window.location.href="index.html"; }

        })

    }
    
    function detectCollision(vtak,budovy) {
        for(var i = 0; i < budovy.length; i++ )  {
            let e = budovy[i];

            let highPipe = e.ypos <=0;
            let x0 = e.xpos, x1 = e.xpos + 100; // pipe lavý roh, pipe pravý roh
            if(highPipe){ //Vrchná pipe
                let y0 = e.ypos + e.length+23; //vrch
                let a = vtak.x; //pre kontrolu bokov
                let b = vtak.y - vtak.height/2; //pre kontrolu vrchu

                if(a>x0 && a < x1 && b < y0){
                    return  true;
                }
            }
            else { //Spodná  pipe
                let y2 = e.ypos+20; // spodok
                let a = vtak.x; //pre kontrolu bokob
                let b = vtak.y + vtak.height/2; //
                if(a > x0 && a <x1 && b > y2){
                    return true;
                }
            }

        }

        return false;
    }

    function detekciaKorunky(vtak,korunky) {


        for(var i = 0; i < korunky.length; i++ ) {
            let e = korunky[i];
            let x0 = e.xpos;
            let x1 = e.xpos+50;
            let a  = vtak.x;
            let y = e.ypos;
            let y1 = e.ypos+100;
            let b = vtak.y - vtak.height/2;



            if( a > x0 && a< x1 && b > y && b < y1 ){
                    return true;
            }
        }
    }




};









// Dorobiť animáciu vtáka nech mu lietajú krídla

const Vtak = function (x,y,ctx) {
    this.x =x;
    this.y =y;
    this.ctx = ctx;
    this.velY = 0;
    this.width= 61; //
    this.height = 48; // ROZMERY

    this.vtaky = [document.getElementById('vtak1'),
        document.getElementById('vtak2'),
        document.getElementById('vtak3'),
    ];

    this.skokzvuk = document.getElementById('skok');
    this.gameover = false;
    this.hudbaPoz = true;

    this.deadvtak = false;

    this.vtakyIncrement = 0;
    this.vtakyIndex = 0;

    var stop = this;
    var skok = this;


    document.addEventListener('keydown',function (klavesa) {

        if(klavesa.keyCode === 32 || klavesa.keyCode === 87){ //ovládanie pomocou MEDZERNIKA + treba pridať W alebo myš.
            skok.velY = -13;
            if(stop.hudbaPoz){
                skok.skokzvuk.play();
            }

        }

        if(klavesa.keyCode === 88){
            stop.hudbaPoz = !stop.hudbaPoz;
        }

    });

};

Vtak.prototype.update = function () {

    this.vtakyIncrement++;

    if(this.vtakyIncrement % 20 === 0){
        this.vtakyIndex +=1;
        if(this.vtakyIndex === 2){
            this.vtakyIndex = 0;
        }
    }

    this.y += this.velY; //
    this.velY += 1; // padanie vtáka

    if(this.y>600){
        this.gameover = true;
    }


};

Vtak.prototype.render = function () {

    let renderX = this.x - this.width;
    let renderY = this.y - this.height;

    this.ctx.drawImage(this.vtaky[this.vtakyIndex],renderX,renderY);

};


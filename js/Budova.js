const Budova = function (xpos,ypos,length,speed,ctx) {


    this.ypos = ypos;
    this.xpos = xpos;

    this.komin = document.getElementById('komin') //61x48


    this.length = length;
    this.ctx=ctx;
    this.speed = speed;


};


Budova.prototype.update = function () {

    this.xpos -= this.speed; //Pohyb "Budov"- fungovanie podobné ako pozadie
                            //rýchlosť posúvania sa zadávame pri volaní funkcie v main.js
};

Budova.prototype.render = function () {

        this.ctx.fillStyle = "green";
        this.ctx.drawImage(this.komin,this.xpos,this.ypos,100,this.length);
        this.ctx.fillStyle = "green";

};


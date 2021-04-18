
const Prostredie = function (c, ctx) {
    this.c = c;
    this.ctx = ctx;
    this.pozPos = 0;
    this.pozSpeed = 1.33; // Rýchlosť pozadia
    this.pozWidth = 765;
    this.pozImg = document.getElementById('poz');
};

//-----------------------GENEROVANIE POZADIA ZA SEBOU ------------------------------//

Prostredie.prototype.update= function () {
    //this.hudbaPoz.play();

    this.pozPos -= this.pozSpeed;
    if(this.pozPos < -this.pozWidth)
        this.pozPos = 0;

};

Prostredie.prototype.render = function () {
    for(let i = 0; i <= this.c.width/this.pozWidth+1;i++ ) {
        this.ctx.drawImage(this.pozImg, this.pozPos+i*this.pozWidth, 0);
    }
};
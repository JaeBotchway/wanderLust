
class Calculator{
    constructor(a,b){
        this.a = a;
        this.b = b;
    }
    
    add(){
        return this.a + this.b;
    }
    
    product(){
        return this.a * this.b;
    }
    }
    module.exports = Calculator; 
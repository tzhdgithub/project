define(["jquery","HappyImage.min"],function($){
    function buyTap(){
        $(".site-buy .buy-left").HappyImage({
            effect: "slide"
        });
    }   
    return{
        buyTap
    }
})
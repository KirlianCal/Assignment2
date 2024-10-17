function addToCart(event){
    let button=event.target;
    let item=button.parentElement.parentElement;
    let title=item.getElementsByClassName("shop-item-title")[0].innerText;
    let price=item.getElementsByClassName("shop-item-price")[0].innerText;
    let img=item.getElementsByClassName("shop-item-image")[0].src;
    createItem(title,price,img);
    updateCart();
}
function createItem(title,price,img){
    let cartRow=document.createElement("div");
    cartRow.classList.add("cart-row");
    let cartItem=document.getElementsByClassName("cart-items")[0];
    let cartItemName=cartItem.getElementsByClassName("cart-item-title");
    for(let i=0;i<cartItemName.length;i++){
        if (cartItemName[i].innerText==title){
            return;
        }
    }
    let rowContents=`
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${img}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `
    cartRow.innerHTML=rowContents;
    cartItem.append(cartRow);
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click",removeFromCart);
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change",quantityChange);
}
function quantityChange(event){
    let element=event.target;
    if(isNaN(element.value)||element.value<=0){
        element.value=1;
    }
    updateCart();
}
function removeFromCart(event){
    let element=event.target;
    element.parentElement.parentElement.remove();
    updateCart();
}
function purchaseClear(){
    let cartItem=document.getElementsByClassName("cart-items")[0]
    while(cartItem.hasChildNodes()){
        cartItem.removeChild(cartItem.firstChild);
    }
    updateCart();
}
function updateCart(){
    let cartContainer=document.getElementsByClassName("cart-items")[0];
    let cartRows=cartContainer.getElementsByClassName("cart-row");
    let total=0;
    for(let i=0;i<cartRows.length;i++){
        let row=cartRows[i];
        let priceEle=row.getElementsByClassName("cart-price")[0];
        let quantityEle=row.getElementsByClassName("cart-quantity-input")[0];
        let price=parseFloat(priceEle.innerText.replace("$",""));
        let quantity=quantityEle.value;
        total=total+(price*quantity);
    }
    total=Math.round(total*100)/100;
    document.getElementsByClassName("cart-total-price")[0].innerText="$"+total;
}
function eventManager(){
    let add=document.getElementsByClassName("shop-item-button");
    for(let i=0;i<add.length;i++){
        let temp=add[i];
        temp.addEventListener("click",addToCart);
    }
    let quantity=document.getElementsByClassName("cart-quantity-input");
    for(let i=0;i<quantity.length;i++){
        var temp=quantity[i];
        temp.addEventListener("change",quantityChange);
    }
    let remove=document.getElementsByClassName("btn-danger");
    for(let i=0;i<remove.length;i++){
        let temp=remove[i];
        temp.addEventListener("click",removeFromCart);
    }
    document.getElementsByClassName("btn-purchase")[0].addEventListener("click",purchaseClear)
}
eventManager();
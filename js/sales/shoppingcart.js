////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Page & Control Initializers
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$.mobile.loading("show");
$(function () {
    document.addEventListener("deviceready", initialize(), false);
});
$.mobile.loading("hide");

function initialize() {
    try {
        // RULE: Do Not Show the Checkout button or Currency dropdown if the cart is empty.
        $("#btnCheckout").hide();
        $("#CurrencyContainer").hide();

        //KnockoutJS Binding
        ko.applyBindings(new ShoppingCartViewModel());

        //$("#Categories a").click(function (e) {
        //    // NOTE: The CategoryID  is stored in the "data-val" attribute of each category list item.
        //    var cartID = $(this).attr("data-val");
        //    ShowCategoryItems(catID);
        //});

        // Debugging: This is for Demo purposes only!
        ShoppingCartRefresh(0);
    }
    catch (err) {
        ex.Log(err, "ShoppingCart.initialize()");
    }
}

function ShoppingCartViewModel() {
    try {
        var self = this;
        self.Categories = da.Categories(1001);
        self.Currencies = da.Currencies();
        self.SelectedCurrency =  ko.observable("GBP");
    }
    catch (err) {
        ex.Log(err, "ShoppingCart.ShoppingCartViewModel()");
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////
// NAME: CategoryItemsShow()
// DEFINE:  
//////////////////////////////////////////////////////////////////////////////////////////////////
function CategoryItemsShow(categoryID) {

}

//////////////////////////////////////////////////////////////////////////////////////////////////
// NAME: ShoppingCartRefresh()
// DEFINE:  Loads/Refresh the shopping cart.
//////////////////////////////////////////////////////////////////////////////////////////////////
function ShoppingCartRefresh(shoppingCartID) {
    $.mobile.loading("show");
    try{
        var ShoppingCart = da.ShopppingCart(shoppingCartID);

        // RULE: Do Not Show the Checkout button or Currency dropdown if the cart is empty.
        if (ShoppingCart.Items.length === 0) {
            $("#ShoppingCart").html("<h1>Empty</h1>");
            $("#btnCheckout").hide();
            $("#CurrencyContainer").hide();
        }
        else{
            $("#ShoppingCart").html($("#CartTemplate").tmpl(ShoppingCart));
            $("#btnCheckout").show();
            $("#CurrencyContainer").show();
        }
    }
    catch (err) {
        ex.Log(err, "ShopppingCart.ShoppingCartRefresh(CartID:" + cartID + ")");
    }
    $.mobile.loading("hide");
}

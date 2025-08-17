import HomePage from "./HomePage";
describe("End to End Ecommerce Test Suite", () => {
    let loginCred;
    before(() => {
        cy.fixture("loginCred").then((data) => {
            loginCred = data;
        });
    });

    it("Ecommerce Test Case 1", () => {

        const homepage = new HomePage();

        // Visit the login page and perform login
        homepage.goto("https://rahulshettyacademy.com/loginpagePractise/#/");

        // Using the login credentials from fixture
        homepage.login(loginCred.username, loginCred.password);

        //Validate the login
        homepage.loginValidation();

        //item validation
        homepage.items().should("exist");
        homepage.items().should("have.length", 4);
        homepage.items().its("length").then((length) => {
            cy.log("Number of cards: " + length);
        });

        //Add items to the cart
        homepage.additemsToCart();

        //checkout button validation
        homepage.checkoutButtonCheck().should("be.visible");
        homepage.checkoutButtonClick();

        //Total amount Validation
        homepage.amountValidation();

        // Checkout Page
        homepage.checkoutPage();

        //Purchase Page
        homepage.purchasePage();

    });
});


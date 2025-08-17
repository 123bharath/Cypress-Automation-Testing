class HomePage {

    goto(url) {
        cy.visit(url);
    }

    login(username, password) {
        cy.get("#username").type(username);
        cy.get("#password").type(password);
        cy.get("#terms").check();
        cy.get("[type='submit']").click();
    }

    loginValidation() {
        cy.url().should("include", "shop");
    }
    items() {

        // cy.get("app-card").then((length) => {
        //     cy.log("Number of cards: " + length);
        // });
        return cy.get("app-card");
    }

    additemsToCart() {


        // cy.get("app-card").contains("Nokia Edge").parent().parent().parent().find("button").click();
        // cy.get("app-card").contains("Nokia Edge").then(($el) => {
        //     cy.log("Filtered Nokia Edge Card- 1: " + $el.prop("outerHTML"));
        // });

        // cy.get("app-card").filter(":contains('Nokia Edge')").then(($el) => {
        //     cy.log("Filtered Nokia Edge Card- 2: " + $el.prop("outerHTML"));
        // });

        cy.get("app-card").filter(":contains('Nokia Edge')").find("button").click();
        cy.get("app-card").eq(0).find("button", "Add").click();
        cy.get("app-card").eq(0).find("button", "Add").click();

    }
    checkoutButtonCheck() {
        return cy.get("#navbarResponsive");
    }
    checkoutButtonClick() {

        cy.get("#navbarResponsive").contains("Checkout").click();
    }
    amountValidation() {

        //Variables
        let cartLength = 0;
        let totalAmount = 0;
        let shownAmount = 0;

        cy.get("tr td:nth-child(4)").then(($el) => {
            cartLength = $el.length - 2;
            cy.log("Cart Length: " + cartLength);

            cy.wrap($el).each(($el, index, $list) => {
                cy.log("Cart Length Check in other method of each: " + cartLength);
                if (cartLength === index) {
                    return false; // Break the loop when reaching the last row
                }
                const amount = Number($el.text().split(" ")[1].trim()); // Extract the amount from the text
                cy.log("Amount: " + amount);
                totalAmount = totalAmount + amount;
                cy.log("Amount: " + amount + ", Total Amount: " + totalAmount);


            });
        }).then(() => {
            cy.get(".text-right h3").then(($el) => {
                shownAmount = Number($el.text().split(" ")[1].trim());
                expect(totalAmount).to.equal(shownAmount);
                cy.wrap(totalAmount).should("eq", shownAmount);
            });
        });
    }
    checkoutPage() {
        cy.get(".btn-success").contains("Checkout").click();
    }
    purchasePage() {
        cy.get("#country").type("Ind");
        cy.get(".container .suggestions", { "timeout": 10000 }).should("be.visible").its("length").then((length) => {
            cy.log("Number of suggestions: " + length);
        });
        cy.get(".container .suggestions").find("ul li").each(($el, index, $list) => {
            if ($el.text().trim() === "India") {
                cy.wrap($el).click();
            }
        });
        // cy.get(".checkbox").find(".checkbox2").check();
        cy.get('label[for="checkbox2"]').click();

        cy.get(".btn-success").contains("Purchase").click();
        cy.get(".alert-success").should("be.visible");
        cy.get(".alert-success").should("contain", "Success!");
    }
}
export default HomePage;
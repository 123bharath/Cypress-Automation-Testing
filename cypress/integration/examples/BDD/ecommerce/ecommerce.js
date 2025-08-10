import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let opentab = "";

Given("I open the Automation Practice page", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
});

When('I click on the "Open Tab" button', () => {
    cy.get("#opentab")
        .invoke("removeAttr", "target")
        .then(($el) => {
            opentab = $el.prop("href"); // store href
        });

    cy.get("#opentab").click();
});

Then("the page should open in the same tab", () => {
    cy.origin(opentab, { args: { opentab } }, ({ opentab }) => {
        cy.location("href").should("include", opentab);
    });
});

Then('the title should include {string}', (expectedTitle) => {
    cy.origin(opentab, { args: { expectedTitle } }, ({ expectedTitle }) => {
        cy.title().should("include", expectedTitle);
    });
});

Then('the URL should include {string}', (expectedUrlPart) => {
    cy.origin(opentab, { args: { expectedUrlPart } }, ({ expectedUrlPart }) => {
        cy.url().should("include", expectedUrlPart);
    });
});

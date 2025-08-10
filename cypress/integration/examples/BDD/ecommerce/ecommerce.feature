Feature: Handle window.open in Cypress

  Scenario: Open new window in the same tab
    Given I open the Automation Practice page
    When I click on the "Open Tab" button
    Then the page should open in the same tab
    And the title should include "QAClick Academy"
    And the URL should include "qaclickacademy.com"

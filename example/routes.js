/**
 * Export Routes
 */

const URLConstructor = require("../src/URLConstructor");

let ExampleURLConstructor = new URLConstructor();

// Configure Constructor
ExampleURLConstructor.setBase("http://examplesite.org");

/**
 * Define Routes
 */

// Dashboard Route
let dashboard = ExampleURLConstructor.addRoute("home", "/:username/dashboard");

// Account Settings Route
let settings = ExampleURLConstructor.addRoute(
  "account-settings",
  "/:username/settings"
);

// Age Calculator
let ageCalculator = ExampleURLConstructor.addRoute(
  "age-Calculator",
  "/age-calculator/:dob"
);

// Logout Route
let logout = ExampleURLConstructor.addRoute("logout", "/?logout=1");

module.exports = { dashboard, settings, ageCalculator, logout };

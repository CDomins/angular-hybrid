import ngRedux from "ng-redux";
import { store } from "../../../app/store/store.js";
// Main App Module
(function () {
  "use strict";

  angular
    .module("taskApp", ["ngRedux"])
    .config([
      "$ngReduxProvider",
      function ($ngReduxProvider) {
        $ngReduxProvider.provideStore(store);
        // App configuration
        console.log("TaskApp initialized");
      },
    ])
    .run(function () {
      // App run block
      console.log("TaskApp running");
    });
})();

sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        sampleFunction: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});

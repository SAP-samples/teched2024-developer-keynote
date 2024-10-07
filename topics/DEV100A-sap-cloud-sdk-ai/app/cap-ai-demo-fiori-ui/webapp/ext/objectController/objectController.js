sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {

        onOpenDialog: function (oEvent) {
            if (!this.pDialog) {
                this.pDialog = this.loadFragment({
                    name: "capaidemofioriui.ext.fragment.imageDialog",
                })
            }

            this.pDialog.then(function (oDialog) {
                oDialog.open()
            })
        },

        onCloseDialog: function (oEvent) {
            oEvent.getSource().getParent().close()
        },

        displayImage: function(oEvent) {
            if (!this.pDialog) {
                this.pDialog = this.loadFragment({
                    name: "capaidemofioriui.ext.fragment.imageDialog",
                })
            }
            this.pDialog.then(function (oDialog) {
                oDialog.open()
            })
        }
    };
});

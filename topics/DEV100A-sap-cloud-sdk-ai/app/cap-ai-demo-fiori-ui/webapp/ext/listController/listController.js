sap.ui.define([
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/odata/v4/ODataModel",
    "sap/ui/core/syncStyleClass",
    "sap/ui/core/BusyIndicator"
], function (MessageBox, MessageToast, ODataModel, syncStyleClass, BusyIndicator) {
    'use strict';

    return {
        startBusy: function () {
            if (!this._pBusyDialog) {
                this._pBusyDialog = Fragment.load({
                    name: "capaidemofioriui.ext.fragment.busyDialog",
                    controller: this
                }).then(function (oBusyDialog) {
                    this.getView().addDependent(oBusyDialog)
                    syncStyleClass("sapUiSizeCompact", this.getView(), oBusyDialog)
                    return oBusyDialog
                }.bind(this))
            }

            this._pBusyDialog.then(function (oBusyDialog) {
                oBusyDialog.open()
            }.bind(this))
        },
        endBusy: function (oController) {
            if (oController._pBusyDialog) {
                oController._pBusyDialog.then(function (oBusyDialog) {
                    oBusyDialog.close()
                })
            }
        },

        onOpenDialog: function (oEvent) {
            if (!this.pDialog) {
                this.pDialog = this.loadFragment({
                    name: "capaidemofioriui.ext.fragment.requestDialog",
                })
            }

            this.pDialog.then(function (oDialog) {
                oDialog.open()
            })
        },

        onCloseDialog: function (oEvent) {
            oEvent.getSource().getParent().close()
        },

        handleNewRAGRequest: function (oEvent) {
            if (!this.pDialog) {
                this.pDialog = this.loadFragment({
                    name: "capaidemofioriui.ext.fragment.requestDialog",
                })
            }
            this.pDialog.then(function (oDialog) {
                oDialog.open()
            })


        },

        onSubmitDialog: async function (oEvent) {
            BusyIndicator.show()
            oEvent.preventDefault()
            const dialogFields = oEvent.getSource().getParent().getContent()
            let query = ''
            let choosenScenario = ''
            for (const element of dialogFields) {
                switch (element.sId) {
                    case 'requestInput':
                        query = element._getInputValue()
                        break;
                    case 'scenarioCombo':
                        if (element.isA("sap.m.ComboBox")) {
                            choosenScenario = element.getSelectedKey()
                        }
                        break;
                    default:
                        break;
                }
            }
            const oModel = oEvent.getSource().getParent().getModel()  
            const oOperation = oModel.bindContext(`/getRagResponse(...)`)    
            oOperation.setParameter("user_query", query)
            oOperation.setParameter("scenario", choosenScenario)
            oOperation.execute().then(async function () {
                const oResults = oOperation.getBoundContext().getObject()
                if (oResults && oResults.value[0] && oResults.value) {
                    MessageBox.information(oResults.value)
                }
                await oModel.refresh()
                BusyIndicator.hide()

            }.bind(this), function (oError) {
                BusyIndicator.hide()
                MessageBox.error(oError.message)
            })

            oEvent.getSource().getParent().close()
        }
    }
})

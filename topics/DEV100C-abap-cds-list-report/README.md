# ABAP CDS to Fiori List Report

## Prerequisites
- You need to have access to an SAP BTP, ABAP environment, or SAP S/4HANA Cloud, ABAP environment or SAP S/4HANA (release 2022 or higher) system.
For example, you can create free [trial user](https://developers.sap.com/tutorials/abap-environment-trial-onboarding.html) on SAP BTP, ABAP environment.
- You have downloaded and installed the [latest ABAP Development Tools (ADT)](https://tools.hana.ondemand.com/#abap) on the latest Eclipse© platform.
- You have created an [ABAP Cloud project](https://developers.sap.com/tutorials/abap-environment-create-abap-cloud-project.html)
- Make sure, your system has the ABAP flight reference scenario. If your system hasn’t this scenario. You can download it [here](https://github.com/SAP-samples/abap-platform-refscen-flight). The trial systems have the flight scenario included.

## Introduction
You find the code snippets of CDS View entity and Metadata Extension file to create a Fiori List Report from ADT

### Steps
1. Create Package.  
In ADT, go to the Project Explorer, right-click on the package ZLOCAL, and select New > ABAP Package from the context menu. Maintain the required information and click finish

![Package](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100C-abap-cds-list-report/images/package.png)

2. Create database table to store the Travel data. A Travel entity defines general travel data, such as the description, overall status of the travel booking, and the price of travel.  
Select a transport request, and click Finish to create the database table.
  
![Table](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100C-abap-cds-list-report/images/table.png)  
   
3. Replace the default code with the code snippet provided and rename to the table that you have provided.

<pre lang="ABAP">
@EndUserText.label : 'Database table for travel data'
@AbapCatalog.enhancement.category : #NOT_EXTENSIBLE
@AbapCatalog.tableCategory : #TRANSPARENT
@AbapCatalog.deliveryClass : #A
@AbapCatalog.dataMaintenance : #RESTRICTED
define table zdev100c_tra_xxx {

  key client    : abap.clnt not null;
  key travel_id : /dmo/travel_id not null;
  description   : /dmo/description;
  @Semantics.amount.currencyCode : '/dmo/travel_data.currency_code'
  total_price   : /dmo/total_price;
  currency_code : /dmo/currency_code;
  status        : abap.char(20);

}
</pre>
Save and activate the changes.  






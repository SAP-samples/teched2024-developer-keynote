# ABAP CDS to Fiori List Report

## Prerequisites
- You need to have access to an SAP BTP, ABAP environment, or SAP S/4HANA Cloud, ABAP environment or SAP S/4HANA (release 2022 or higher) system.
For example, you can create free [trial user](https://developers.sap.com/tutorials/abap-environment-trial-onboarding.html) on SAP BTP, ABAP environment.
- You have downloaded and installed the [latest ABAP Development Tools (ADT)](https://tools.hana.ondemand.com/#abap) on the latest Eclipse© platform.
- You have created an [ABAP Cloud project](https://developers.sap.com/tutorials/abap-environment-create-abap-cloud-project.html)
- Make sure, your system has the ABAP flight reference scenario. If your system hasn’t this scenario. You can download it [here](https://github.com/SAP-samples/abap-platform-refscen-flight). The trial systems have the flight scenario included.

## Introduction
You find the code snippets of CDS View entity and Metadata Extension file to create a Fiori List Report from ADT

### Create Package.  
1. In ADT, go to the Project Explorer, right-click on the package ZLOCAL, and select New > ABAP Package from the context menu.
2. Maintain the required information and click finish

![Package](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100C-abap-cds-list-report/images/package.png)

### Create database table 
1. Create database table to store the Travel data. A Travel entity defines general travel data, such as the description, overall status of the travel booking, and the price of travel.  
2. Select a transport request, and click Finish to create the database table.
  
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
4. Save and activate the changes.  

### Create data generator class
1. Create an ABAP class to generate demo travel data.   
Right-click your ABAP package and select New > ABAP Class from the context menu.    
Maintain the required information, select a transport request and click Finish to create the class.    

![Class](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100C-abap-cds-list-report/images/class.png)    

2. Replace the default code with the below code snippet and replace the table name that you have specified.
<pre lang="ABAP">
CLASS zcl_dev100c_tra_xxx DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.
    INTERFACES if_oo_adt_classrun.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.

CLASS zcl_dev100c_tra_xxx IMPLEMENTATION.
  METHOD if_oo_adt_classrun~main.
    INSERT ZDEV100C_TRA_XXX FROM ( SELECT travel_id, description, total_price, currency_code,
      CASE
        WHEN status = 'N' THEN 'O'
        WHEN status = 'P' THEN 'O'
        WHEN status = 'B' THEN 'A'
        ELSE 'X'
      END
     FROM /dmo/travel ).
     out->write( 'Travel Data Succefully Generated' ).
  ENDMETHOD.
ENDCLASS.
</pre>  
3. Save and activate the changes.
4. Run your console application. For that, select your ABAP class class, select the run button > Run As > ABAP Application (Console) F9 or press F9. A message will be displayed in ABAP Console.
5. Open your database table and press F8 to start the data preview and display the filled database entries, i.e. travel data.  

![Table Preview](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100C-abap-cds-list-report/images/tablepreview.png)  

### Create CDS View Entity
1. Right-click your database table and select New Data Definition from the context menu.    
2. Maintain the required information, select a transport request and click Finish to create a CDS View Entity which is the data model.  

![View](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100C-abap-cds-list-report/images/view.png)   

3. Replace the default code with the below code snippet and replace the table name that you have specified.  

<pre lang="ABAP">
@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'CDS View for Travel'
@Metadata.ignorePropagatedAnnotations: true
@Metadata.allowExtensions: true
@ObjectModel.usageType:{
  serviceQuality: #X,
  sizeCategory: #S,
  dataClass: #MIXED
 }
define view entity ZDEV100C_CDS_XXX
  as select from zdev100c_tra_xxx
  association [0..1] to /DMO/I_Overall_Status_VH_Text as _Status on $projection.Status = _Status.OverallStatus
{

  key travel_id                                                                as TravelId,
      description                                                              as Description,
      @Semantics.amount.currencyCode: 'CurrencyCode'
      total_price                                                              as TotalPrice,
      currency_code                                                            as CurrencyCode,
      concat_with_space (cast(total_price as abap.char( 20) ),currency_code,1) as AmountInCurrency,
      @ObjectModel.text.element: [ 'StatusText' ]
      @Consumption.valueHelpDefinition: [{ entity: { name: '/DMO/I_Overall_Status_VH',element: 'OverallStatus' } }]
      status                                                                   as Status,
      _Status.Text                                                             as StatusText,

      case
      when status = 'A' then 3
      when status = 'O' then 2
      else 1 end                                                               as Criticality
}
</pre>
4. Save and activate the changes.
5. Preview the data preview by pressing F8

### Maintain metadata extension
1. Right-click your data definition and select New Metadata Extension from the context menu.    
2. Maintain the required information, select a transport request and click Finish to create a metadata extension of the CDS View Entity   

![Metadata](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100C-abap-cds-list-report/images/metadata.png) 

3. Replace the default code with the below code snippet 
 <pre lang ="ABAP">
 @Metadata.layer: #CORE
@UI: {
    headerInfo: {
        typeName: 'Travel',
        typeNamePlural: 'Travels',
        title: {
            type: #STANDARD, value: 'Description'} }

    }
@Search.searchable: true
annotate view ZDEV100C_CDS_XXX with
{
  @UI.facet: [
        {
            id: 'Travel',
            purpose: #STANDARD,
            type: #IDENTIFICATION_REFERENCE,
            position: 10
        }]
  @UI: { lineItem:       [ { position: 10}],
         identification: [ { position: 10 } ],
         selectionField: [ { position: 10 } ] }
  TravelId;
  @UI: { lineItem:       [ { position: 20}],
        identification: [ { position: 20 } ],
        selectionField: [ { position: 20 } ] }
  @Search.defaultSearchElement
  @Search.fuzzinessThreshold: 0.9
  Description;
  @UI: { lineItem:       [ { position: 30}],
       identification: [ { position: 30, label: 'Cost' } ]}
  TotalPrice;
  @UI.hidden: true
  CurrencyCode;
  @UI: { lineItem: [{ position: 40 , criticality: 'Criticality'}],
         identification: [{ position: 40, criticality: 'Criticality', label: 'Trip Status' }],
         selectionField: [{ position: 30 }],
         textArrangement: #TEXT_ONLY}
  Status;
  @UI.hidden: true
  StatusText;
  @UI.hidden: true
  Criticality;
}
</pre>
4. Save and activate the changes.

### Service Definition
1. Right-click your data definition and select New Service Definition from the context menu.    
2. Maintain the required information, select a transport request and click Finish    

![Definition](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100C-abap-cds-list-report/images/definition.png)  

3. Replace the default code with the below code snippet 
 <pre lang ="ABAP">
 @EndUserText.label: 'Service definition for travel'
define service ZDEVC100_TRA_XXX {
  expose ZDEV100C_CDS_XXX;
}
</pre>  

### Service Binding
1. Right-click your Service Definition and select New Service Binding from the context menu.
2. Maintain the Binding Type as OData V4 - UI, select a transport request and click Finish   

![Binding](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100C-abap-cds-list-report/images/binding.png)  

3. Activate the Service and Publish.

### Preview the List Report
1. Open the Service Binding and click on preview to the preview the data model in a Fiori List Report

![Preview](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100C-abap-cds-list-report/images/preview.png)   

2. Apply filter on the Status and press Go  

![List](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100C-abap-cds-list-report/images/filter.png)

3. You can check the datils of each record in the Object Page

### Create Fiori Project

You can choose to either launch the Application Generator from SAP Fiori tools in SAP Business Application Studio (BAS) in your browser or directly launch Visual Studio Code locally if that is your preferred integrated development environment (IDE).   
The first step is to configure the integration between ADT and SAP Fiori tools.  This is a one-time setup within ADT for each system you want to integrate.   
Check the [blog post](https://community.sap.com/t5/technology-blogs-by-sap/sap-fiori-tools-may-2024-release-adds-closer-integration-with-abap/ba-p/13720761)  on how to configure for the integration between ADT and SAP Fiori tools  

![BAS](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100C-abap-cds-list-report/images/bas.png)

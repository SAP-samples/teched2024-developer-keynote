namespace teched2024;

using {cuid} from '@sap/cds/common';

entity CustomerMaterialChanges {
    key id                   : String;
        type                 : String;
        source               : String;
        time                 : DateTime;
        xsapcustomer         : String;
        xsapcustomermaterial : String;
        datacontenttype      : String;
        data                 : Composition of one CustomerMaterialData;
}

entity CustomerMaterialData : cuid {
    SalesOrganization              : String;
    DistributionChannel            : String;
    Customer                       : String;
    Product                        : String;
    CustomerID                     : String;
    MaterialByCustomer             : String;
    MaterialDescriptionByCustomer  : String;
    Plant                          : String;
    DeliveryPriority               : String;
    BaseUnit                       : String;
    PartialDeliveryIsAllowed       : String;
    MaxNmbrOfPartialDelivery       : Integer;
    UnderdelivTolrtdLmtRatioInPct  : Integer;
    OverdelivTolrtdLmtRatioInPct   : Integer;
    UnlimitedOverdeliveryIsAllowed : Boolean;
    CustomerMaterialItemUsage      : String;
    SalesUnit                      : String;
    SalesQtyToBaseQtyDnmntr        : Integer;
    SalesQtyToBaseQtyNmrtr         : Integer;
}

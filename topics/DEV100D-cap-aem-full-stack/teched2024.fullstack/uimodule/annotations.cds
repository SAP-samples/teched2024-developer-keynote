using CatalogService from '../server/srv/cat-service';

annotate CatalogService.CustomerMaterialChanges with @(UI: {
    HeaderInfo    : {
        TypeName      : 'Customer Material Change',
        TypeNamePlural: 'Customer Material Changes',
        Title         : {Value: xsapcustomer}
    },
    Identification: [{Value: id}],
    LineItem      : {$value: [
        {
            $Type            : 'UI.DataField',
            Value            : xsapcustomermaterial,
            ![@UI.Importance]: #High
        },
        {
            $Type            : 'UI.DataField',
            Value            : xsapcustomer,
            ![@UI.Importance]: #Medium
        },
        {
            $Type            : 'UI.DataField',
            Value            : data.PartialDeliveryIsAllowed,
            ![@UI.Importance]: #Low
        },
        {
            $Type            : 'UI.DataField',
            Value            : data.MaxNmbrOfPartialDelivery,
            ![@UI.Importance]: #Low
        },
        {
            $Type            : 'UI.DataField',
            Value            : id,
            ![@UI.Importance]: #Low
        }
    ]}
});

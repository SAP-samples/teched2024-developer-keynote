using UIDocumentationHelperService as service from '../../srv/ui-documentation-helper';

annotate service.RAGResponses with @(UI.SelectionFields: [
    scenario,
    user_query,
    rag_response,
    createdAt,
    createdBy
]);

annotate service.RAGResponses with @(UI.PresentationVariant: {
    $Type    : 'UI.PresentationVariantType',
    SortOrder: [{
        Property  : createdAt,
        Descending: true,
    }],

});

annotate service.RAGResponses with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: scenario,
            },
            {
                $Type: 'UI.DataField',
                Value: user_query,
            },
            {
                $Type: 'UI.DataField',
                Value: rag_response,
            },
            {
                $Type: 'UI.DataField',
                Value: image,
            },
            {
                $Type: 'UI.DataField',
                Value: createdBy,
            },
            {
                $Type: 'UI.DataField',
                Value: createdAt,
            },
            {
                $Type: 'UI.DataField',
                Value: modifiedBy,
            },
            {
                $Type: 'UI.DataField',
                Value: modifiedAt,
            }
        ],
    },
    UI.Facets                    : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : 'General Information',
        Target: '@UI.FieldGroup#GeneratedGroup',
    }, ],
    UI.LineItem                  : [
        {
            $Type: 'UI.DataField',
            Value: scenario,
        },
        {
            $Type: 'UI.DataField',
            Value: user_query,
        },
        {
            $Type: 'UI.DataField',
            Value: rag_response,
        },
        {
            $Type: 'UI.DataField',
            Value: createdAt,
        },
        {
            $Type: 'UI.DataField',
            Value: image
        },
        {
            $Type: 'UI.DataField',
            Value: createdBy,
        }

    ],
);


annotate service.RAGResponses with @(UI.HeaderInfo: {
    $Type         : 'UI.HeaderInfoType',
    TypeName      : '{i18n>response}',
    TypeNamePlural: '{i18n>responses}',
    Title         : {
        $Type: 'UI.DataField',
        Value: user_query,
    },
    Description   : {
        $Type: 'UI.DataField',
        Value: scenario,
    }
});

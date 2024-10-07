namespace sap.uidocumentationhelper;

using {
    cuid,
    managed
} from '@sap/cds/common';

type scenarioType : String enum {
    s_text;
    s_image;
    s_backup;
    s_test;
};

entity DocumentSplits : cuid, managed {
    metadata      : LargeString;
    text_chunks   : LargeString;
    embedding     : Vector(1536);

    @assert.range
    scenario      : scenarioType;
    image         : LargeString;
    image_context : LargeString;
}

entity scenarios {
    key scenario     : scenarioType;
        scenarioDesc : localized String;
}

entity RAGResponses : cuid, managed {
    user_query   : String;
    rag_response : String;
    scenario     : scenarioType;
    scenarioDesc : Association to scenarios
                       on scenarioDesc.scenario = scenario;
    image        : LargeBinary @Core.MediaType: 'image/png';
}

annotate RAGResponses with @(
    title             : '{i18n>responses}',
    Common.Label      : '{i18n>responses}',
    Common.SemanticKey: [user_query]
) {
    ID           @(Common.Text: user_query);
    user_query   @(title: '{i18n>user_queryText}');
    rag_response @(title: '{i18n>rag_responseText}');
    scenario     @(
        title                          : '{i18n>scenario}',
        assert.enum,
        Common.Text                    : scenarioDesc.scenarioDesc,
        Common.TextArrangement         : #TextOnly,
        Common.ValueListWithFixedValues: true,
        Common.ValueList               : {
            CollectionPath: 'scenarios',
            Parameters    : [
                {
                    $Type            : 'Common.ValueListParameterInOut',
                    LocalDataProperty: 'scenario',
                    ValueListProperty: 'scenario'
                },
                {
                    $Type            : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'scenarioDesc'
                }
            ]
        }
    );
    image        @(
        title     : '{i18n>image}',
        UI.IsImage: true
    );
};

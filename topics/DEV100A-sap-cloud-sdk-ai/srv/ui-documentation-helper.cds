using {sap.uidocumentationhelper as db} from '../db/schema';

service UIDocumentationHelperService {
    entity DocumentSplits as
        projection on db.DocumentSplits
        excluding {
            embedding
        };

    entity RAGResponses   as projection on db.RAGResponses;
    entity scenarios      as projection on db.scenarios;
    function getRagResponse(user_query : String, scenario : String) returns String;
    function deleteRAGEntries(scenario : String)                    returns String;
}

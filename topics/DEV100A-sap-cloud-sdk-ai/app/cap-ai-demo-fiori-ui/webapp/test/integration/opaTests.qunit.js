sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'capaidemofioriui/test/integration/FirstJourney',
		'capaidemofioriui/test/integration/pages/RAGResponsesList',
		'capaidemofioriui/test/integration/pages/RAGResponsesObjectPage'
    ],
    function(JourneyRunner, opaJourney, RAGResponsesList, RAGResponsesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('capaidemofioriui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheRAGResponsesList: RAGResponsesList,
					onTheRAGResponsesObjectPage: RAGResponsesObjectPage
                }
            },
            opaJourney.run
        );
    }
);
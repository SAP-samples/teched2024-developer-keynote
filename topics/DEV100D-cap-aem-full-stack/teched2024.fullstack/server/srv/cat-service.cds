using from '../../uimodule/annotations';
using teched2024 from '../db/schema'; 

service CatalogService {
	entity CustomerMaterialChanges as projection on teched2024.CustomerMaterialChanges;
}

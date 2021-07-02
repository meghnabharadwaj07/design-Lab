"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cosmos_1 = require("@azure/cosmos");
class DonorClient {
    constructor() {
        this.databaseId = process.env.DATABASE_NAME;
        this.containerName = 'donor';
        this.createUpdateProfile = (donor) => __awaiter(this, void 0, void 0, function* () {
            const startTime = Date.now();
            const { item } = yield this.client
                .database(this.databaseId)
                .container(this.containerName)
                .items.upsert(donor);
            return item;
        });
        this.client = new cosmos_1.CosmosClient({
            endpoint: process.env.COSMOSDB_ENDPOINT,
            key: process.env.COSMOSDB_KEY
        });
    }
}
exports.default = DonorClient;
//# sourceMappingURL=DonorClient.js.map
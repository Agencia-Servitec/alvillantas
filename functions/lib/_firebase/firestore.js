"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeIfNotAlreadyTriggered = exports.fetchDocument = exports.fetchCollection = exports.querySnapshotToArray = void 0;
const admin = __importStar(require("firebase-admin"));
const querySnapshotToArray = (querySnapshot) => {
    const documents = [];
    querySnapshot.forEach((documentSnapshot) => {
        const document = documentSnapshot.data();
        documents.push(Object.assign(Object.assign({}, document), { id: documentSnapshot.id }));
    });
    return documents;
};
exports.querySnapshotToArray = querySnapshotToArray;
const fetchCollection = async (query) => {
    const querySnapshot = await query.get();
    return (0, exports.querySnapshotToArray)(querySnapshot);
};
exports.fetchCollection = fetchCollection;
const fetchDocument = async (query) => {
    const documentSnapshot = (await query.get());
    return documentSnapshot.data();
};
exports.fetchDocument = fetchDocument;
const executeIfNotAlreadyTriggered = (eventId, callback) => {
    const eventIdRef = admin
        .firestore()
        .collection("functionsEventIds")
        .doc(eventId);
    return admin.firestore().runTransaction(async (transaction) => {
        const documentSnapshot = await transaction.get(eventIdRef);
        if (documentSnapshot.exists) {
            throw Error("Trying to send double event! Error from Google Firestore (still in Beta release)");
        }
        else {
            transaction.set(eventIdRef, {});
            callback();
        }
    });
};
exports.executeIfNotAlreadyTriggered = executeIfNotAlreadyTriggered;
//# sourceMappingURL=firestore.js.map
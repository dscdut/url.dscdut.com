module.exports.firstDocument = firestoreResponse => {
    let foundDoc;
    firestoreResponse.forEach(doc => {
        foundDoc = {
            id: doc.id,
            ...doc.data(),
        };
    });
    return foundDoc;
};

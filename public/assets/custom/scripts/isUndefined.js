function isUndefined(value) {
    // Obtain `undefined` value that's
    // guaranteed to not have been re-assigned
    const undefined = void(0);
    return value === undefined;
}

function isUndefinedOrNull(value) {
    // Obtain `undefined` value that's
    // guaranteed to not have been re-assigned
    const undefined = void(0);
    const nulo = null;
    return value === undefined || value === nulo;
}

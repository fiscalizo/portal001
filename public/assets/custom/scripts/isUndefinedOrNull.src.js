function isUndefinedOrNull(value) {
    let undefined = void(0);
    let nulo = null;
    return value === undefined || value === nulo;
}
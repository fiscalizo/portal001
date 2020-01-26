const fillRadioList = (key, val) => $('input[name=' + key + '][value=' + val + ']').prop('checked', true);
const fillInput = (key, val) => $('input[name=' + key + ']').val(val);
const fillTextArea = (key, val) => $('textarea[name=' + key + ']').val(val);

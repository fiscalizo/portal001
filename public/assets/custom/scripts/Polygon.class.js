// https://www.phpied.com/3-ways-to-define-a-javascript-class/
// 3. Singleton using a function
// para funcionar no webview
const apple = new function() {
    this.type = "macintosh";
    this.color = "red";
    this.getInfo = function () {
        return this.color + ' ' + this.type + ' apple';
    };

    this.init = function (a,b,c) {
        this.type = a;
        this.color = b;
    };
};
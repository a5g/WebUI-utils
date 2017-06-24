var SelectWrapper = function (selectElement) {
    this.webElement = selectElement;

    this.getOptions = function () {
        return this.webElement.all(by.tagName('option'));
    };

    this.getAllOptions = function () {
        var deferred = protractor.promise.defer();
        this.webElement.all(by.css('option')).then(function (options) {
            var items = new Array();
            options.forEach(function (option, index) {
                option.getText().then(function (text) {
                    items.push(text);
                });
            });

            return items;
        }).then(function (data) {
            deferred.fulfill(data);
        })

        return deferred.promise;
    };

    this.getSelectedOptions = function () {
        var deferred = protractor.promise.defer();
        this.webElement.all(by.css('option[selected="selected"]')).then(function (options) {
            var items = new Array();
            options.forEach(function (option, index) {
                option.getText().then(function (text) {
                    items.push(text);
                });
            });

            return items;
        }).then(function (data) {
            deferred.fulfill(data);
        })

        return deferred.promise;
    };

    this.getSelectedOptionText = function () {
        var select = this.webElement;

        return select.getAttribute('value')
            .then(function (i) {
                return select.element(by.css('option[value="' + i + '"]')).getText();
            });
    };

    this.selectByValue = function (value) {
        return this.webElement.all(by.css('option[value="' + value + '"]')).click();
    };

    this.selectByPartialText = function (text) {
        return this.webElement.all(by.cssContainingText('option', text)).click();
    };

    this.selectByText = function (text) {
        return this.webElement.all(by.xpath('option[.="' + text + '"]')).click();
    };

};

module.exports = SelectWrapper;
function render(template, context) {

    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {  
            return word.replace('\\', '');
        }

        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;

        for (i = 0, length = variables.length, variable = variables[i]; i < length; ++i) {
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }

        return currentObject;
    })
}

String.prototype.render = function (context) {
    return render(this, context);
};

var msg = "{ greeting }! My name is { author.name }.".render({
    greeting: "Hello",
    author: {
        name: "xxx"
    }
});

console.log(msg);

$(button).click(function (e) { 
    $(button).text("Done");
    var text = $(input).val();
    text = Array.from(text);

    tree = new Node("3");
    dictionary = new Array;
    extraNode = null;
    lastModified = null;

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    text.forEach(element => {
        tree.addNewNode(element);
        console.log();
        // console.log(dictionary);
    });
    tree.printTreee2(tree);
    // console.log(tree)
    
});

var tree = new Node(2);

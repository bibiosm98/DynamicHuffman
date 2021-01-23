var dictionary = new Array;
var extraNode = null;
var lastModified = null;

let Left = "L"
let Right = "R"

class Node
{
    constructor(data) 
    {
        this.left = null;
        this.right = null;
        this.data = data;
        this.root = null;
        this.counter = 0;
        this.side = null;
    }
    // constructor(tree,flag) 
    // {
    //     this.left = new Node(tree.left, flag);
    //     this.right = new Node(tree.right, flag);
    //     this.data = tree.data;
    //     this.root = tree.root;
    //     this.counter = tree.counter;
    //     this.side = tree.side;
    // }
    
    addNewNode(char){
        // console.log("Adding new Node with char:" + char);
        var node = this;
        var root = this;

        if(node.left == null && node.right==null){
            node.left = new Node();
            node.right = new Node(char);
            node.right.counter = 1;
            
            node.left.side = Left
            node.right.side = Right

            node.left.root = root;
            node.right.root = root;

            node.counter = 0;
            node.data = "";
            extraNode = node.left;
            lastModified = node.right;
            dictionary.push(char)
            this.updateCounters(0);
            this.rebuildTree(lastModified);
        }else{
            if(dictionary.includes(char)){
                this.increment(char);
                this.updateCounters(0);
                this.rebuildTree(lastModified);
            }else{
                extraNode.addNewNode(char);
                this.updateCounters(0);
            }
        }
    }

    increment(char){
        if(this.data == char){
            // console.log("increment" + char)
            this.counter = this.counter + 1;
            lastModified = this;
            return;
        }
        if(this.left !== null) this.left.increment(char);
        if(this.right !== null) this.right.increment(char);
    }

    updateCounters(ctr){
        let i = 0, j=0;
        if(this.left !== null){
            this.left.updateCounters(ctr+1);
            i = this.left.counter;
        }
        if(this.right !== null){
            // console.log("update")
            this.right.updateCounters(ctr+1);
            j = this.right.counter;
        }
        if(this.left !== null && this.right !== null){
            // console.log("ctr = " + ctr + "  update = " + (i +j) + " " + this.data)
            this.counter = i + j
        }
    }

    rebuildTree(node){
        if(node.root == null){return;}
        if(node.root.root == null){return;}
        if(node.root.root.right.counter < node.counter){
            // let tree2 = new Node(node.data)
            // let tree1 = new Node(node.root.root.right.data)
            // tree1.counter = node.root.root.right.counter
            // tree2.counter = node.counter;
            
            // tree2.side = Right
            // tree1.side = Right   // SIDE_DOWN
            
            // node.root.root.right = tree2
            // node.root.right = tree1
            // // console.log(node.data)
            // this.updateCounters(0);
        }
        this.updateCounters(0);

        this.checkDiagonally(node)
        this.updateCounters(0);
        if(node.root == null){return;}
        while(node.root !== null){
            node = node.root
        }
        this.checkVertical(node)
    }

    checkDiagonally(node){
        // console.log("checkDiagonally" + node.counter + "  , " + node.data)
        if(node.root == null) return
        if(node.root.root == null) return
        // if(node.right == null) return
        if(node.root.side == Left){
            if(node.root.root.right.counter < node.counter){
                console.log("checkDiagonally HERE")
                let treeLeft = node.root.right;
                let treeRight = node.root.root.right;

                node.root.root.right = treeLeft;
                node.root.right = treeRight;
            }
        }else{ // node.root.side == Right
            console.log("SIDE = " + node.root.side)
            if(node.root.root.left.counter < node.counter){
                console.log("checkDiagonally HERE")
                let treeLeft = node.root.root.left;
                let treeRight = node.root.left;

                node.root.left = treeLeft;
                node.root.root.left = treeRight;
            }
        }
        
        this.checkDiagonally(node.root);
    }

    checkVertical(node){
        // console.log("CheckRight" + node.counter)
        if(node.left == null) return
        if(node.right == null) return
        if(node.left.counter > node.right.counter){
            console.log("HERE")
            let treeLeft = node.left
            let treeRight = node.right

            node.left = treeRight;
            node.left.side = Left;

            node.right = treeLeft;
            node.right.side = Right;
        }
        
        this.checkVertical(node.left);
        this.checkVertical(node.right);
    }

    printTreee(node){
        t = new Tree();
        this.printTree(node);
        t.bfs()
    } 
    printTreee2(node){
        t = new Tree();
        t.addTree(node);
        t.bfs()
    }
    printTree(node){
        t.add(node.data);
        if(node.left !== null) this.printTree(node.left)
        if(node.left !== null) this.printTree(node.right)
    }
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

const LEFT = 0
const RIGHT = 1

class Node2 {
    constructor(value) {
        this.counter = null
        this.value = value
        this.children = []
        this.parent = null
        this.pos = { x: 0, y: 0 }
        this.r = 20
    }

    get left() {
        return this.children[LEFT]
    }

    set left(value) {
        value.parent = this
        this.children[LEFT] = value
    }

    get right() {
        return this.children[RIGHT]
    }

    set right(value) {
        value.parent = this
        this.children[RIGHT] = value
    }

    set position(position) {
        this.pos = position
    }

    get position() {
        return this.pos
    }

    get radius() {
        return this.r
    }
 
}

class Tree {
    constructor() {
        this.root = null;
        this.startPosition = { x: 700, y: 44 }
        this.side
        this.axisX = 250
        this.axisY = 80
    }

    getPosition({ x, y }, isLeft = false) {
        return { x: isLeft ? x - this.axisX + y : x + this.axisX - y, y: y + this.axisY }
    }

    add(value) {
        const newNode = new Node2(value);
        if (this.root == null) {
            newNode.position = this.startPosition
            this.root = newNode
        }
        else {
            let node = this.root
            while (node) {
                if (node.value == value)
                    break;
                if (value > node.value) {
                    if (node.right == null) {
                        newNode.position = this.getPosition(node.position)
                        node.right = newNode
                        break;
                    }
                    node = node.right
                }
                else {
                    if (node.left == null) {
                        newNode.position = this.getPosition(node.position, true)
                        node.left = newNode
                        break;
                    }
                    node = node.left
                }
            }
        }
    }

    addTree(tree, node){
        if (this.root == null) {
            // console.log("addTree")
            const newNode = new Node2("");
            newNode.position = this.startPosition
            this.root = newNode
            node = this.root
            node.counter = tree.counter
        }
        if(tree.left != null){
            // console.log("addTree left")
            let newNode2 = new Node2(tree.left.data);
            newNode2.position = this.getPosition(node.position, true)
            newNode2.side = tree.left.side
            node.left = newNode2;
            newNode2.counter = tree.left.counter
            this.addTree(tree.left, newNode2);
        }
        if(tree.right !== null){
            // console.log("addTree right")
            let newNode2 = new Node2(tree.right.data);
            newNode2.position = this.getPosition(node.position)
            node.right = newNode2;
            newNode2.side = tree.right.side
            newNode2.counter = tree.right.counter
            this.addTree(tree.right, newNode2);
        }
    }

    all(node) {
        if (node === undefined)
            return
        else {
            console.log(node.value)
            this.all(node.left)
            this.all(node.right)
        }
    }

    getAll() {
        this.all(this.root)
    }

    bfs() {
        var queue = [];
        const black = "#000"

        queue.push(this.root);

        while (queue.length !== 0) {
            const node = queue.shift();
            const { x, y } = node.position

            const color = "#ffffffff";// + ((1 << 24) * Math.random() | 0).toString(16)
            ctx.beginPath();
            ctx.arc(x, y, node.radius, 0, 2 * Math.PI)
            ctx.strokeStyle = black
            ctx.fillStyle = color
            ctx.fill()
            ctx.font = '25pt Calibri';
            ctx.stroke()
            ctx.strokeStyle = black
            if(node.value == undefined) node.value = "--"
            // ctx.strokeText("'"+node.value+"' : " + node.counter, x, y)
            ctx.strokeText("'"+node.value+"' : " + node.counter + " | " + node.side, x, y)


            node.children.forEach(child => {

                const { x: x1, y: y1 } = child.position;
                ctx.beginPath();
                ctx.moveTo(x, y + child.radius);
                ctx.lineTo(x1, y1 - child.radius)
                ctx.stroke();
                queue.push(child)
            });

        }
    }

}

var t = new Tree();
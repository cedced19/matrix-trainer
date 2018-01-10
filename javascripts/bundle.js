const matrixGenerator = require('int-matrix-generator');
const randomInt = require('random-int');
const { Matrix } = require('ml-matrix');
const ejs = require('ejs');

const exoContainer = document.getElementById('exo-container');

function templateMatrix (M) {
    return ejs.render(`<table class="matrix">
        <% for(var i=0; i<M.length; i++) {%>
            <tr>
                <% for(var j=0; j<M[i].length; j++) {%>
                    <td><%= M[i][j] %></td>
                <% } %>
            </tr>
        <% } %>
    </table>`, { M }, {});
}


function generateMatrixsToMultiple () {
    var a = randomInt(1, 3);
    var b = randomInt(1, 4);
    var c = randomInt(1, 3);
    var A = new Matrix(matrixGenerator(a, b, -10, 10));
    var B = new Matrix(matrixGenerator(b, c, -10, 10));
    var C = A.mmul(B);
    return {
        A: templateMatrix(A),
        B: templateMatrix(B),
        C: templateMatrix(C)
    }
}

function generateMatrixsToAdd () {
    var a = randomInt(1, 4);
    var b = randomInt(1, 4);
    var A = new Matrix(matrixGenerator(a, b, -10, 10));
    var B = new Matrix(matrixGenerator(a, b, -10, 10));
    var C = Matrix.add(A, B);
    return {
        A: templateMatrix(A),
        B: templateMatrix(B),
        C: templateMatrix(C)
    }
}

function displayExercise (ex, op) {
    var child = document.createElement('div');
    child.innerHTML = `${ex.A}<span class="operation">${op}</span>${ex.B}<span class="operation">=</span>${ex.C}`;
    exoContainer.appendChild(child)
}

function main () {
    while (exoContainer.firstChild) {
        exoContainer.removeChild(exoContainer.firstChild);
    }
    displayExercise(generateMatrixsToMultiple(), '×');
    displayExercise(generateMatrixsToAdd(), '+');
}

document.getElementById('btn').onclick = main;

main();
const crypto = require('crypto');
const args = process.argv.slice(2); 

if (args.length === 0) {
    console.error('Error: Insufficient arguments.');
    console.log('Usage: node index.js <operation> [operands]');
    process.exit(1);
}
const operation = args[0];

switch(operation) {
    case 'add':
        performBinaryOperation((a, b) => a + b);
        break;

    case 'sub':
        performBinaryOperation((a, b) => a - b);
        break;

    case 'mult':
        performBinaryOperation((a, b) => a * b);
        break;

    case 'divide':
        performBinaryOperation((a, b) => {
            if (b === 0) {
                console.error('Error: Division by zero.');
                process.exit(1);
            }
            return a / b;
        });
        break;

    case 'sin':
        performUnaryOperation(Math.sin);
        break;

    case 'cos':
        performUnaryOperation(Math.cos);
        break;

    case 'tan':
        performUnaryOperation(Math.tan);
        break;

    case 'random':
        if (args.length !== 2) {
            console.error('Error: Provide length for random number generation.');
            process.exit(1);
        }
        const length = parseInt(args[1], 10);
        if (isNaN(length) || length <= 0) {
            console.error('Error: Invalid length for random number generation.');
            process.exit(1);
        }
        const randomBytes = crypto.randomBytes(Math.ceil(length / 2)).toString('hex');
        console.log(`Random Number: ${randomBytes.slice(0, length)}`);
        break;

    default:
        console.error('Error: Invalid operation.');
        console.log('Supported operations: add, sub, mult, divide, sin, cos, tan, random');
        process.exit(1);
}

function performBinaryOperation(operationFn) {
    if (args.length !== 3) {
        console.error(`Error: Invalid number of operands for ${operation} operation.`);
        console.log(`Usage: node index.js ${operation} <operand1> <operand2>`);
        process.exit(1);
    }
    const operand1 = parseFloat(args[1]);
    const operand2 = parseFloat(args[2]);
    if (isNaN(operand1) || isNaN(operand2)) {
        console.error('Error: Invalid operands for binary operation.');
        process.exit(1);
    }
    const result = operationFn(operand1, operand2);
    console.log(`Result: ${result}`);
}
function performUnaryOperation(operationFn) {
    if (args.length !== 2) {
        console.error(`Error: Invalid number of operands for ${operation} operation.`);
        console.log(`Usage: node index.js ${operation} <operand>`);
        process.exit(1);
    }
    const operand = parseFloat(args[1]);
    if (isNaN(operand)) {
        console.error('Error: Invalid operand for unary operation.');
        process.exit(1);
    }
    const result = operationFn(operand);
    console.log(`Result: ${result}`);
}

'use strict';

// Import gRPC, read console lines and the proto-loader
let grpc = require("grpc");
let protoLoader = require("@grpc/proto-loader");
let readline = require('readline');

// Require the methods to be implemented
const implementation = require('./employeeImplementation');

// Interface to read terminal Lines
let reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const PROTO_PATH = './proto/vacaciones.proto';

// Load the proto content and then we create the definition of it. So that we can go ahead and use it.
let proto = grpc.loadPackageDefinition(
    protoLoader.loadSync(PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

// Connects to the Employee Service on the server at localhost:50051
const EmployeeService = proto.work_leave.EmployeeLeaveDaysService
const employee = new EmployeeService('localhost:50051',
    grpc.credentials.createInsecure());

let nmb;
// Ask for a service
const question1 = () => {
    return new Promise((resolve, reject) => {
        reader.question("INGRESE UN DÍGITO \n1: Añadir un empleado \n2: Lista de empleados \n3: Pedir vacaciones\n> ", answer => {
            nmb = answer;
            resolve()
        })
    })
}
// Execute the request
const main = async () => {
    await question1()
    switch (nmb) {
        case '1':
            implementation.insert(employee);
            break;
        case '2':
            implementation.list(employee);
            break;
        case '3':
            implementation.eligibleForLeave(employee);
            break;
        default:
            main()
            break;
    }
}
main()

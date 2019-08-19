'use strict';

let grpc = require("grpc");
let protoLoader = require("@grpc/proto-loader");
let readline = require('readline');

const implementation = require('./employeeImplementation');

//Read terminal Lines
let reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const PROTO_PATH = './proto/vacaciones.proto';
//Load the protobuf
let proto = grpc.loadPackageDefinition(
    protoLoader.loadSync(PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

const EmployeeService = proto.work_leave.EmployeeLeaveDaysService
const employee = new EmployeeService('localhost:50051',
    grpc.credentials.createInsecure());

let nmb;
const question1 = () => {
    return new Promise((resolve, reject) => {
        reader.question("INGRESA UN DÍGITO \n1: Añadir un empleado \n2: Lista de empleados \n3: Pedir vacaciones\n> ", answer => {
            nmb = answer;
            resolve()
        })
    })
}
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

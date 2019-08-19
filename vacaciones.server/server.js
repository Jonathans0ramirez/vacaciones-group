'use strict';

// Import gRPC and the proto-loader
const grpc = require('grpc');
let protoLoader = require("@grpc/proto-loader");

// Load the proto content and then we create the definition of it. So that we can go ahead and use it.
const PROTO_PATH = './proto/vacaciones.proto';
const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
  })
);

// Require the methods to be implemented
const implementation = require('./serverImplementation');

// Simply start the grpc server
const server = new grpc.Server();

// Define the callable methods that correspond to the methods defined in the protofile
server.addService(proto.work_leave.EmployeeLeaveDaysService.service, {
    eligibleForLeave: implementation.eligibleForLeave,
    grantLeave: implementation.grantLeave,
    insert: implementation.insert,
    list: implementation.list
});
server.bind('127.0.0.1:50051',
  grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()
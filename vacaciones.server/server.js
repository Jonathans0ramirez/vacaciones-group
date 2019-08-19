'use strict';

const grpc = require('grpc');
let protoLoader = require("@grpc/proto-loader");
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
const server = new grpc.Server();

const implementation = require('./serverImplementation');

//define the callable methods that correspond to the methods defined in the protofile
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
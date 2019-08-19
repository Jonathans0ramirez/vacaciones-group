// Import gRPC
const grpc = require('grpc')

// Import the testing employees data.
const data = require('./employees')

// Logic for each of the services exposed by the server to the client.
module.exports = {
    eligibleForLeave: (call, callback) => {
        let employee = data.employees.find((n) => n.employee_id == call.request.employee_id)
        if (employee) {
            if (employee.requested_leave_days > 0) {
                if (employee.accrued_leave_days > employee.requested_leave_days) {
                    callback(null, { eligible: true });
                } else {
                    callback(null, { eligible: false });

                } -1
            } else {
                callback(new Error('Invalid requested days'));
            }
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            })
        }
    },
    grantLeave: (call, callback) => {
        let employee = data.employees.find((n) => n.employee_id == call.request.employee_id)
        if (employee) {
            let granted_leave_days = employee.requested_leave_days;
            let accrued_leave_days = employee.accrued_leave_days - granted_leave_days;
            callback(null, {
                granted: true,
                granted_leave_days,
                accrued_leave_days
            })
        }
    },
    insert: (call, callback) => {
        let employee = call.request
        employee.employee_id = ((data.employees.length) + 1)
        data.employees.push(employee)
        callback(null, employee)
    },
    list: (_, callback) => {
        callback(null, data)
    }
}
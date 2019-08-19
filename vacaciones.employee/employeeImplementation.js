const fs = require('fs');
const grpc = require('grpc');
let readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

module.exports = {
    eligibleForLeave(employee) {
        let id
        const question1 = () => {
            return new Promise((resolve, reject) => {
                rl.question("Por favor ingresa tu id: ", IdAnswer => {
                    id = IdAnswer
                    resolve()
                })
            })
        }
        const main = async () => {
            await question1()
            let newEmployee = {
                employee_id: parseInt(id)
            }

            employee.eligibleForLeave(newEmployee, (error, employeeData) => {
                if (!error) {
                    console.log('Empleado encontrado. \nGenerando resultados...\n', employeeData)
                    if (employeeData) {
                        console.log("Generando Permiso...");
                        this.grantLeave(employee, newEmployee.employee_id)
                    }
                } else {
                    console.error(error)
                }
            })
            rl.close()
        }
        main()
    },
    grantLeave(employee, id) {
        let newEmployee = {
            employee_id: id
        }
        employee.grantLeave(newEmployee, (error, employee) => {
            if (!error) {
                console.log('\n', employee)
            } else {
                console.error(error)
            }
        })
        rl.close()
    },
    insert: function (employee) {
        let username;
        let accdays;
        let reqdays;

        const question1 = () => {
            return new Promise((resolve, reject) => {
                rl.question("Por favor ingresa tu nombre: ", NameAnswer => {
                    username = NameAnswer
                    resolve()
                })
            })
        }
        const question2 = () => {
            return new Promise((resolve, reject) => {
                rl.question("Por favor ingresa tus días de trabajo acumulado: ", AccAnswer => {
                    accdays = AccAnswer
                    resolve()
                })
            })
        }
        const question3 = () => {
            return new Promise((resolve, reject) => {
                rl.question("Por favor ingresa la cantidad de días solicitados de descanso: ", ReqAnswer => {
                    reqdays = ReqAnswer
                    resolve()
                })
            })
        }

        const main = async () => {
            await question1()
            await question2()
            await question3()
            let newEmployee = {
                name: username,
                accrued_leave_days: parseInt(accdays),
                requested_leave_days: parseInt(reqdays),
            }

            employee.insert(newEmployee, (error, employee) => {
                if (!error) {
                    console.log('Nuevo empleado ingresado', employee)
                } else {
                    console.error(error)
                }
            })
            rl.close()
        }

        main()


    },
    list: function (employee) {
        console.log('Listando...')
        employee.list({}, (error, employees) => {
            if (!error) {
                console.log('\n', employees)
            }
        })
        rl.close();
    }
}
// Import read console lines
let readline = require('readline');

// Interface to read terminal Lines
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

// Logic for each of the services required by the client [employee].
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
                    console.log('---Empleado encontrado---\n\nGenerando resultados...\n', employeeData)
                    if (employeeData.eligible) {
                        console.log("\nGenerando Permiso...");
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
                console.log(employee)
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
                rl.question("Ingresa tu nombre: ", NameAnswer => {
                    username = NameAnswer
                    resolve()
                })
            })
        }
        const question2 = () => {
            return new Promise((resolve, reject) => {
                rl.question("Ingresa tus días de trabajo acumulado: ", AccAnswer => {
                    accdays = AccAnswer
                    resolve()
                })
            })
        }
        const question3 = () => {
            return new Promise((resolve, reject) => {
                rl.question("Ingresa la cantidad de días de vacaciones solicitados: ", ReqAnswer => {
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
                    console.log('Nuevo empleado ingresado \n\n', employee)
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
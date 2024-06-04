const createEmployeeRecord = (employee) => {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: parseInt(employee[3], 10),
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = (employees) => {
  return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(dateStamp) {
  const [date, time] = dateStamp.split(' ')
  const checkIn = {
    type: 'TimeIn',
    hour: parseInt(time, 10),
    date
  }

  this.timeInEvents.push(checkIn)

  return this
}

function createTimeOutEvent(dateStamp) {
  const [date, time] = dateStamp.split(' ')
  const checkOut = {
    type: 'TimeOut',
    hour: parseInt(time, 10),
    date
  }

  this.timeOutEvents.push(checkOut)

  return this
}

function hoursWorkedOnDate(dateStamp){
 const checkInTime =  this.timeInEvents.find(event => event.date === dateStamp).hour
 const checkOutTime =  this.timeOutEvents.find(event => event.date === dateStamp).hour
 return (checkOutTime - checkInTime) / 100
}

function wagesEarnedOnDate(dateStamp){
  return hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(employeeRecords, firstName){
  return employeeRecords.find(employee => employee.firstName === firstName)
}

function calculatePayroll(employeeRecords){
  return employeeRecords.reduce((total, employeeRecord) => {
     return total + allWagesFor.call(employeeRecord)
  }, 0)
}

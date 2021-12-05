$(document).ready(function () {

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAbRQf3kHM7lo1m4vpfJaJO_elZjdQKybE",
        authDomain: "employee-sheet-5ee02.firebaseapp.com",
        databaseURL: "https://employee-sheet-5ee02-default-rtdb.firebaseio.com/",
        projectId: "employee-sheet-5ee02",
        storageBucket: "employee-sheet-5ee02.appspot.com",
        messagingSenderId: "914320712511",
        appId: "1:914320712511:web:2ff6e412c394d85e93698a"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)

    //FIREBASE
    // Get a reference to the database service
    let database = firebase.database();

    let employees = database.ref('/employees');


    employees.on('value', (snapshot) => {
        let employeeData = snapshot.val()

        if (!employeeData) {
            return
        }

        let employeeTable = $('#employe-sheet tbody')

        let employeeIDs = Object.keys(employeeData);
        let normalData = Object.values(employeeData)
        console.log(Object.keys(employeeData));

        for (let i; i < employeeIDs.length; i++) {

        }


        employeeTable.html(Object.values(employeeData).map((item, index) => `
                <tr>
                    <th scope="row">${index+1}</th>
                    <td>${item.employee_name}</td>
                    <td>${item.role}</td>
                    <td>${item.start_date}</td>
                    <td>${item.months_worked}</td>
                    <td>${item.monthly_rate}</td>
                    <td>${item.total_billed}</td>
                    <td onclick="console.log(${item.empId})">Edit</td>
                </tr>
            `))

    })

    //Submit form
    $('#form-submit').on('click', function (e) {
        e.preventDefault();
        let employee_name = $("#employee_name").val().trim(),
            role = $("#role").val().trim(),
            start_date = $("#start_date").val().trim(),
            monthly_rate = $("#monthly_rate").val().trim(),
            months_worked = moment().diff(moment(start_date, "DD/MM/YYYY"), "months"),
            total_billed = months_worked * monthly_rate

        let employeeForm = {
            employee_name,
            role,
            start_date,
            monthly_rate,
            months_worked,
            total_billed
        }
        employees.push(employeeForm)

        $('#formEmp input').val('')
    })

})
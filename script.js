


var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpbdIML = '/api/iml';
var studentDatabaseName = 'SCHOOL-DB';
var studentRelationName = 'STUDENT-TABLE';
var connectionToken = '90931344|-31949323021103845|90950162';

$('#rollNo').focus();



// Function for save record number into localstorage
function saveRecNoToLocalStorage(jsonObject) {
    var lvData = JSON.parse(jsonObject.data);
    localStorage.setItem('recordNo', lvData.rec_no);
}

// Function for disable all element on page except roll number input feild
function disableAllFeildExceptRollno() {
    $('#fullName').prop('disabled', true);
    $('#class').prop('disabled', true);
    $('#birthDate').prop('disabled', true);
    $('#inputAddress').prop('disabled', true);
    $('#enrollmentDate').prop('disabled', true);
    $('#resetBtn').prop('disabled', true);
    $('#saveBtn').prop('disabled', true);
    $('#updateBtn').prop('disabled', true);
}


//Function for reset form data and disable all other feild except roll number
function resetForm() {
    $('#rollNo').val("");
    $('#fullName').val("");
    $('#class').val("");
    $('#birthDate').val("");
    $('#inputAddress').val("");
    $('#enrollmentDate').val("");

    $('#rollNo').prop('disabled', false);
    disableAllFeildExceptRollno();
    $('#rollNo').focus();


}

//Function for fill data if student already is present in database
function fillData(jsonObject) {
    if (jsonObject === "") {
        $('#fullName').val("");
        $('#class').val("");
        $('#birthDate').val("");
        $('#inputAddress').val("");
        $('#enrollmentDate').val("");
    } else {
        // student record number saved to localstorage
        saveRecNoToLocalStorage(jsonObject);
        
        // parse json object into JSON
        var data = JSON.parse(jsonObject.data).record;
        
        $('#fullName').val(data.name);
        $('#class').val(data.className);
        $('#birthDate').val(data.birthDate);
        $('#inputAddress').val(data.address);
        $('#enrollmentDate').val(data.enrollmentData);
    }
}


//Function to check validity of Enrollment Number
function validateEnrollmentDate() {
    var inputBirthDate = $('#birthDate').val();
    var inputEnrollmentDate = $('#enrollmentDate').val();
    inputBirthDate = new Date(inputBirthDate);
    inputEnrollmentDate = new Date(inputEnrollmentDate);
    
    //Enrollment date should be greater than Birth date
    return inputBirthDate.getTime() < inputEnrollmentDate.getTime();

}

//Function to check validity of user input data
function validateFormData() {
    var rollNo, name, className, birthDate, address, enrollmentData;
    rollNo = $('#rollNo').val();
    name = $('#fullName').val();
    className = $('#class').val();
    birthDate = $('#birthDate').val();
    address = $('#inputAddress').val();
    enrollmentData = $('#enrollmentDate').val();

    if (rollNo === '') {
        alert('Roll NO Missing');
        $('#rollNo').focus();
        return "";
    }

    if (rollNo <= 0) {
        alert('Invalid Roll-No');
        $('#rollNo').focus();
        return "";
    }
    if(name===''){
        alert('Name Missing');
        $('#fullName').focus();
        return "";
    }
    if (className === '') {
        alert('Class Name is Missing');
        $('#class').focus();
        return "";
    }
    if (className <= 0 && className > 12) {
        alert('Invalid Class Name');
        $('#class').focus();
        return "";
    }
    if (birthDate === '') {
        alert( 'Birth Date Is Missing');
        $('#birthDate').focus();
        return "";
    }
    if (address === '') {
        alert('Address Is Missing');
        $('#address').focus();
        return "";
    }
    if (enrollmentData === '') {
        alert('Enrollment Data Is Missing');
        $('#enrollmentDate').focus();
        return "";
    }

    if (!validateEnrollmentDate()) {
        alert('Invalid Enrollment Date(i.e Enrollment Date should be greater than Birth Date)');
        $('#enrollmentDate').focus();
        return "";
    }

    // if data is valid then create a JSON object otherwise return empty string( which denote that data is not valid )
    var jsonStrObj = {
        id: rollNo,
        name: name,
        className: className,
        birthDate: birthDate,
        address: address,
        enrollmentData: enrollmentData
    };
    
    //Convert JSON object into string 
    return JSON.stringify(jsonStrObj);
}


//Function to return stringified JSON object whcih contain roll number of student
function getStudentRollnoAsJsonObj() {
    var rollNO = $('#rollNo').val();
    var jsonStr = {
        id: rollNO
    };
    return JSON.stringify(jsonStr);
}


// Function to query details of existing student
function getStudentData() {

     
    if ($('#rollNo').val() === "") { // if roll number is not given then disable all feild
        disableAllFeildExceptRollno();
    } else if ($('#rollNo').val() < 1) { // if roll number is not valid (i.e roll-no <1)
        disableAllFeildExceptRollno();
        alert('Invalid Roll-No');
        $('#rollNo').focus();
    } else { // if roll number is valid
        var studentRollnoJsonObj = getStudentRollnoAsJsonObj(); 
        
        // create GET Request object
        var getRequest = createGET_BY_KEYRequest(connectionToken, studentDatabaseName, studentRelationName, studentRollnoJsonObj);
        
        jQuery.ajaxSetup({async: false});
        // make GET request
        var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
        jQuery.ajaxSetup({async: true});
        
        // Enable all feild
        $('#rollNo').prop('disabled', false);
        $('#fullName').prop('disabled', false);
        $('#class').prop('disabled', false);
        $('#birthDate').prop('disabled', false);
        $('#inputAddress').prop('disabled', false);
        $('#enrollmentDate').prop('disabled', false);

        
        if (resJsonObj.status === 400) { // if student is not exist already with same roll number then enable save and reset btn
            $('#resetBtn').prop('disabled', false);
            $('#saveBtn').prop('disabled', false);
            $('#updateBtn').prop('disabled', true);
            fillData("");
            $('#name').focus();
        } else if (resJsonObj.status === 200) {// if student is exist already with same roll number then enable update and reset btn
            $('#rollNO').prop('disabled', true);
            fillData(resJsonObj);
            $('#resetBtn').prop('disabled', false);
            $('#updateBtn').prop('disabled', false);
            $('#saveBtn').prop('disabled', true);
            $('#name').focus();
        }
    }



}

//Function to make PUT request to save data into database
function saveData() {
    var jsonStrObj = validateFormData();
    
    // If form data is not valid
    if (jsonStrObj === '')
        return '';

    // create PUT Request object
    var putRequest = createPUTRequest(connectionToken, jsonStrObj, studentDatabaseName, studentRelationName);
    jQuery.ajaxSetup({async: false});
    
    //Make PUT Request for saving data into database
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpbdIML);
    jQuery.ajaxSetup({async: true});
    
    if (resJsonObj.status === 400) {// If data is not saved
        alert('Data Is Not Saved ( Message: ' + resJsonObj.message + " )");
    } else if (resJsonObj.status === 200) {// If data is successfully saved
        alert('Data Saved successfully');
    }
    console.log("Data saved");
    //After saving to databse resent from data 
    resetForm();
    
    $('#rollNo').focus();
}



//Function used to make UPDATE Request
function changeData() {
    $('#changeBtn').prop('disabled', true);
    var jsonChg = validateFormData(); // Before making UPDATE Request validate form data
    
    // Create UPDATE Request object
    var updateRequest = createUPDATERecordRequest(connectionToken, jsonChg, studentDatabaseName, studentRelationName, localStorage.getItem("recordNo"));
    jQuery.ajaxSetup({async: false});
    
    //Make UPDATE Request
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpbdIML);
    jQuery.ajaxSetup({async: true});
    
    if (resJsonObj.status === 400) {// If data is not saved
        alert('Data Is Not Update ( Message: ' + resJsonObj.message + " )");
    } else if (resJsonObj.status === 200) {// If data is successfully saved
        alert('Data Update successfully');
    }
    
    //After updating to databse resent from data
    resetForm();
    $('#rollNo').focus();
}
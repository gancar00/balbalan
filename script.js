$(document).ready(function(){

    getEmployees();

    $("#newEmpBtn").on("click", function(e){
        $("#newForm").toggle();
    });

    function getEmployees(){
        $('#empBody').html('');
        $.ajax({
            url: 'http://dummy.restapiexample.com/api/v1/employees',
            method: 'get',
            dataType: 'json',
            data: {
                test: 'data test'
            },
            success: function(data){
                $(data).each(function(i, emp){
                    $('#empBody').append($("<tr>")
                    .append($("<td>").append(emp.id))
                    .append($("<td>").append(emp.employee_name))
                    .append($("<td>").append(emp.employee_salary))
                    .append($("<td>").append(emp.employee_age))   
                    .append($("<td>").append(`
                        <i class="far fa-edit editEmp" data-empId="`+emp.id+`"></i>
                        <i class="fas fa-trash deleteEmp" data-empId="`+emp.id+`"></i>
                    `)));
                });
                loadButtons();
            }
        });
    }

    function getOneEmployee(id){
        $.ajax({
            url: 'http://dummy.restapiexample.com/api/v1/employee/',
            method: 'get',
            dataType: 'json',
            success: function(data){
                $($("updateForm")[0].empId).val(data.id);
                $($("updateForm")[0].updateName).val(data.employee_name);
                $($("updateForm")[0].updateSalary).val(data.employee_salary);
                $($("updateForm")[0].updateAge).val(data.employee_age);
                $("updateForm").show();
            }
        });
    }

    $("#submitEmp").on("click", function(e){
        let data = {
            name: $($("#newForm")[0].empName).val(),
            salary: $($("#newForm")[0].empSalary).val(),
            age: $($("#newForm")[0].empAge).val(),
        }
        postEmployee(data);
        $("#newForm").trigger("reset");
        $("#newForm").toggle();
        e.preventDefault();
    });



    function postEmployee(data){
        $.ajax({
            url: 'http://dummy.restapiexample.com/api/v1/create',
            method: 'POST',
            dataType: 'json',
            data: data,
            success: function(data){
                console.log(data);
                getEmployees();
            }
        });
    }

    function loadButtons(){
        $(".editEmp").click(function(e){
            getOneEmployee($($(this)[0]).data("empId"));
            e.preventDefault();
        });
        $(".deleteEmp").click(function(e){
            deleteEmployee($($(this)[0]).data("empId"));
            e.preventDefault();
        })
    }

    function putEmployee(id, data){
        $.ajax({
            url: 'http://dummy.restapiexample.com/api/v1/update/' + id,
            method: 'PUT',
            dataType: 'json',
            data: data,
            success: function(data){
                console.log(data);
                getEmployees();
                }
            });
    }

        $("#updateEmp").on("click", function(e){
        let data = {
            employee_name: $($("#updateForm")[0].updateName).val(),
            employee_salary: $($("#updateForm")[0].updateSalary).val(),
            employee_age: $($("#updateForm")[0].updateAge).val(),
        }
        putEmployee($($("#updateForm")[0].empId).val(), data);
        $("#updateForm").trigger("reset");
        $("#updateForm").toggle();
        e.preventDefault();
    });

    function deleteEmp(id){
        $.ajax({
            url: 'http://dummy.restapiexample.com/api/v1/update/' + id,
            method: 'DELETE',
            dataType: 'json',
            success: function(data){
                console.log(data);
                getEmployees();
            }
        });
    }

});

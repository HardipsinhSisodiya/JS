var selectRow=null;
function onSubmitForm(){
    event.preventDefault();
    if(validate())
    {
        var formDatanew=readFormData();
        if(selectRow===null)
        {
            insertRecord(formDatanew);
        }
        else
        {
            updateRecord(formDatanew);
        }
        resetform();
    }
}
function readFormData(){
    var formData={};
    formData["Username"]=document.getElementById("exampleInputusername").value;
    formData["exampleInputEmail"]=document.getElementById("exampleInputEmail").value;
    formData["exampleInputPassword"]=document.getElementById("exampleInputPassword").value;
    formData["exampleInputAddress"]=document.getElementById("exampleInputaddress").value;
    formData["exampleInputnumber"]=document.getElementById("exampleInputnumber").value;
    var Gender=document.getElementsByName("flexRadioDefault");
    for(i=0;i<Gender.length;i++)
    {
        if(Gender[i].checked)
        {
            formData["exampleInputGender"]=Gender[i].value;
        }
    }
    var Hobbies=document.getElementsByName("Hobbies");
    var HobbiesData="";
    for(i=0;i<Hobbies.length;i++)
    {
        if(Hobbies[i].checked)
        {
            HobbiesData=HobbiesData+Hobbies[i].value+"/";
        }
    }
    formData["exampleInputHobbies"]=HobbiesData;
    formData["State"]=document.getElementById("dropdownMenu").value;
    return formData;
}
function insertRecord(data){
    var table=document.getElementById("storelist").getElementsByTagName("tbody")[0];
    var newRow=table.insertRow(table.length);
    var cell1=newRow.insertCell(0);
    cell1.innerHTML=data.Username;
    var cell2=newRow.insertCell(1);
    cell2.innerHTML=data.exampleInputEmail;
    var cell3=newRow.insertCell(2);
    cell3.innerHTML=data.exampleInputPassword;
    var cell4=newRow.insertCell(3);
    cell4.innerHTML=data.exampleInputAddress;
    var cell5=newRow.insertCell(4);
    cell5.innerHTML=data.exampleInputnumber;
    var cell6=newRow.insertCell(5);
    cell6.innerHTML=data.exampleInputGender;
    var cell7=newRow.insertCell(6);
    cell7.innerHTML=data.exampleInputHobbies;
    var cell8=newRow.insertCell(7);
    cell8.innerHTML=data.State;
    var cell9=newRow.insertCell(8);
    cell9.innerHTML='<a onClick="onEdit(this)">Edit</a>';
    var cell10=newRow.insertCell(9);
    cell10.innerHTML='<a onClick="onDelete(this)">Delete</a>';
    selectRow=null;
}
function resetform(){
    document.getElementById("myform").reset();
}
function onEdit(td){
    selectRow=td.parentElement.parentElement;
    document.getElementById("exampleInputusername").value=selectRow.cells[0].innerHTML;
    document.getElementById("exampleInputEmail").value=selectRow.cells[1].innerHTML;
    document.getElementById("exampleInputPassword").value=selectRow.cells[2].innerHTML;
    document.getElementById("exampleInputaddress").value=selectRow.cells[3].innerHTML;
    document.getElementById("exampleInputnumber").value=selectRow.cells[4].innerHTML;
    var GenderOldData=document.getElementsByName("flexRadioDefault");
    for(i=0;i<GenderOldData.length;i++)
    {
        if(GenderOldData[i].value==selectRow.cells[5].innerHTML)
        {
            GenderOldData[i].checked=true;
        }
    }
    var HobbiesHTMLData= document.getElementsByName("Hobbies");
    var HobbiesOldData=selectRow.cells[6].innerHTML;
    var HobbiesSingleData=HobbiesOldData.split("/");
    for(i=0;i<HobbiesHTMLData.length;i++)
    {
        for(j=0;j<HobbiesSingleData.length;j++)
        {
            if(HobbiesHTMLData[i].value==HobbiesSingleData[j])
            {
                HobbiesHTMLData[i].checked=true;
            }
        }
    }
    var DropDownData=document.getElementById("dropdownMenu");
    console.log(DropDownData);
    for(i=0;i<DropDownData.length;i++)
    {
        console.log(selectRow.cells[7].innerHTML);
        if(DropDownData[i].value==selectRow.cells[7].innerHTML)
        {
            DropDownData[i].selected=true;
        }
    }    
}
function updateRecord(formData){
    selectRow.cells[0].innerHTML=formData.Username;
    selectRow.cells[1].innerHTML=formData.exampleInputEmail;
    selectRow.cells[2].innerHTML=formData.exampleInputPassword;
    selectRow.cells[3].innerHTML=formData.exampleInputAddress;
    selectRow.cells[4].innerHTML=formData.exampleInputnumber;
    selectRow.cells[5].innerHTML=formData.exampleInputGender;
    selectRow.cells[6].innerHTML=formData.exampleInputHobbies;
    selectRow.cells[7].innerHTML=formData.State;

}
function onDelete(td){
    if(confirm("Are you sure??"))
    {
        row=td.parentElement.parentElement;
        console.log(row);
        document.getElementById("storelist").deleteRow(row.rowIndex);
        resetform();
    } 
}
function validate(){
    isValid=true;
    var blank=false;
    /*.......................Username blank field validation...............................................*/
    if(document.getElementById("exampleInputusername").value=="")
    {
        isValid=false;
        blank=true;
        document.getElementById("UsernameError").classList.remove("d-none");
    }
    else
    {
        if(!document.getElementById("UsernameError").classList.contains("d-none"))
        {
            document.getElementById("UsernameError").classList.add("d-none");
        }
    }
    /*.......................................Username fields length validation......................................*/
    if(document.getElementById("exampleInputusername").value.length<6 & blank==false)
    {
        isValid=false;
        document.getElementById("UsernameLengthError").classList.remove("d-none");
    }
    else
    {
        if(!document.getElementById("UsernameLengthError").classList.contains("d-none"))
        {
            document.getElementById("UsernameLengthError").classList.add("d-none");
        }
    }
    /*......................................Email blank field validation......................................*/
    var ValidEmail=false;
    if(document.getElementById("exampleInputEmail").value=="")
    {
        isValid=false;
        ValidEmail=true;
        document.getElementById("EmailError").classList.remove("d-none");
    }
    else
    {
        if(!document.getElementById("EmailError").classList.contains("d-none"))
        {
            document.getElementById("EmailError").classList.add("d-none");
        }
    }
    /*......................................Email value validation......................................*/
    var mailFormat= /\S+@\S+\.\S+/;
    if(!mailFormat.test(document.getElementById("exampleInputEmail").value) & ValidEmail==false)
    {
        console.log(document.getElementById("exampleInputEmail").value);
        isValid=false;
        document.getElementById("EmailValidationError").classList.remove("d-none");
    }
    else
    {
        if(!document.getElementById("EmailValidationError").classList.contains("d-none"))
        {
            document.getElementById("EmailValidationError").classList.add("d-none");
        }
    }
    /*......................................Password blank field validation......................................*/
    var Passlength=false;
    if(document.getElementById("exampleInputPassword").value=="")
    {
        isValid=false;
        Passlength=true;
        document.getElementById("PasswordError").classList.remove("d-none");
    }
    else
    {
        if(!document.getElementById("PasswordError").classList.contains("d-none"))
        {
            document.getElementById("PasswordError").classList.add("d-none");
        }
    }
    if(document.getElementById("exampleInputPassword").value.length<6 & Passlength==false)
    {
        document.getElementById("PasswordLengthError").classList.remove("d-none");
    }
    else
    {
        if(!document.getElementById("PasswordLengthError").classList.contains("d-none"))
        {
            document.getElementById("PasswordLengthError").classList.add("d-none");
        }
    }
    /*......................................Address blank field validation......................................*/
    var Addresslength=false;
    if(document.getElementById("exampleInputaddress").value=="")
    {
        isValid=false;
        Addresslength=true;
        document.getElementById("AddressError").classList.remove("d-none");
    }
    else
    {
        if(!document.getElementById("AddressError").classList.contains("d-none"))
        {
            document.getElementById("AddressError").classList.add("d-none");
        }
    }
    if(document.getElementById("exampleInputaddress").value.length<6 & Addresslength==false)
    {
        document.getElementById("AddressLengthError").classList.remove("d-none");
    }
    else
    {
        if(!document.getElementById("AddressLengthError").classList.contains("d-none"))
        {
            document.getElementById("AddressLengthError").classList.add("d-none");
        }
    }
    /*......................................Number blank field validation......................................*/
    var Numberlength=false;
    if(document.getElementById("exampleInputnumber").value=="")
    {
        isValid=false;
        Numberlength=true;
        document.getElementById("NumberError").classList.remove("d-none");
    }
    else
    {
        if(!document.getElementById("NumberError").classList.contains("d-none"))
        {
            document.getElementById("NumberError").classList.add("d-none");
        }
    }
    if(document.getElementById("exampleInputnumber").value.length<5 & Numberlength==false)
    {
        document.getElementById("NumberLengthError").classList.remove("d-none");
    }
    else
    {
        if(!document.getElementById("NumberLengthError").classList.contains("d-none"))
        {
            document.getElementById("NumberLengthError").classList.add("d-none");
        }
    }
    /*......................................Gender blank value validation......................................*/
    var GenderData="";
    var Gender=document.getElementsByName("flexRadioDefault");
    for(i=0;i<Gender.length;i++)
    {
        if(Gender[i].checked)
        {
            GenderData=GenderData+Gender[i].value;
        }
    }
    if(GenderData=="")
    {
        isValid=false;
        document.getElementById("GenderError").classList.remove("d-none");
    }
    else
    {
        if(!document.getElementById("GenderError").classList.contains("d-none"))
        {
            document.getElementById("GenderError").classList.add("d-none");
        }
    }
    var Hobbies=document.getElementsByName("Hobbies");
    var HobbiesData="";
    for(i=0;i<Hobbies.length;i++)
    {
        if(Hobbies[i].checked)
        {
            HobbiesData=HobbiesData+Hobbies[i].value+"/";
        }
    }
    if(HobbiesData=="")
    {
        isValid=false;
        document.getElementById("HobbiesError").classList.remove("d-none");
    }
    else
    {
        if(!document.getElementById("HobbiesError").classList.contains("d-none"))
        {
            document.getElementById("HobbiesError").classList.add("d-none");
        }
    }
    return isValid;
}
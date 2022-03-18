const form = document.getElementById("transactionForm");


        form.addEventListener("submit", function(event){

            //console.log(event);
            
            //alert("se detecto el envio del formulario ");
            event.preventDefault();

            let transactionFormData = new FormData(form);

            //console.log(transactionFormData.get("transactionType"));
            //console.log(transactionFormData.get("transactionDescription"));
            //console.log(transactionFormData.get("transactionAmount"));
            //console.log(transactionFormData.get("transactionCategory"));

            let transactionTableRef = document.getElementById("transactionTable");
            let newTransactionRowRef = transactionTableRef.insertRow(-1);
            let transactionObj = convertFormDataToTransactionObj(transactionFormData);
            saveTransactionObj(transactionObj);
            insertRowInTransactionTable(transactionObj);

            form.reset();

        })

        document.addEventListener("DOMContentLoaded", function(event){
            drawCategory();
            let transactionObjectArray = JSON.parse(localStorage.getItem("transactionData"));
            transactionObjectArray.forEach(function(arrayElement){
                insertRowInTransactionTable(arrayElement);
            })
        })

        function drawCategory(){
            let allCategory =[
                "Alquiler", 
                "Comida", 
                "Diversion",
                "Antojo"
            ]
            for(let index = 0; index < allCategory.length; index++){
                insertCategory(allCategory[index]);
            }
        }

        function insertCategory(categoryName){
            const selectElement = document.getElementById("transactionCategory");
            let htmlToInsert = `<option> ${categoryName} </option>`;
            selectElement.insertAdjacentHTML("beforeend", htmlToInsert);
        }

        function getNewTransactionid(){
            let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
            let newTransactionId = JSON.parse(lastTransactionId) + 1;
            localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId));
            return newTransactionId;
        }

        function convertFormDataToTransactionObj(transactionFormData){
            let transactionType = transactionFormData.get("transactionType");
            let transactionDescription = transactionFormData.get("transactionDescription");
            let transactionAmount = transactionFormData.get("transactionAmount");
            let transactionCategory = transactionFormData.get("transactionCategory");
            let transactionId = getNewTransactionid();
            return{
                "transactionType" : transactionType,
                "transactionDescription" : transactionDescription,
                "transactionAmount": transactionAmount,
                "transactionCategory": transactionCategory,
                "transactionId" : transactionId
            }
        }

        function insertRowInTransactionTable(transactionObj){

            let transactionTableRef = document.getElementById("transactionTable");

            let newTransactionRowRef = transactionTableRef.insertRow(-1);
            newTransactionRowRef.setAttribute("data-transaction-id", transactionObj["transactionId"]);

            let newTypeCellRef = newTransactionRowRef.insertCell(0);
            newTypeCellRef.textContent = transactionObj["transactionType"];
            

            newTypeCellRef = newTransactionRowRef.insertCell(1);
            newTypeCellRef.textContent = transactionObj["transactionDescription"];

            newTypeCellRef = newTransactionRowRef.insertCell(2);
            newTypeCellRef.textContent = transactionObj["transactionAmount"];

            newTypeCellRef = newTransactionRowRef.insertCell(3);
            newTypeCellRef.textContent = transactionObj["transactionCategory"];

            let newDeleteCell = newTransactionRowRef.insertCell(4);
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            newDeleteCell.appendChild(deleteButton);

            deleteButton.addEventListener("click", (event) => {
                let transactionRow = event.target.parentNode.parentNode
                let transactionId = transactionRow.getAttribute("data-transaction-id");
               
                transactionRow.remove();
                deleteTransactionObj(transactionId);
            })

        }

        function saveTransactionObj(transactionObj){
            let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
            myTransactionArray.push(transactionObj);
            let transactionObjJSON = JSON.stringify(myTransactionArray); 
            localStorage.setItem("transactionData", transactionObjJSON);
        }

        function deleteTransactionObj(transactionId){
            let transactionObjArr = JSON.parse(localStorage.getItem("transactionData"));
            
            
            let transactionIndexInArray = transactionObjArr.findIndex(element => element.transactionId == transactionId);
            
            

           
            
            transactionObjArr.splice(transactionIndexInArray, 1);
            let transactionObjJSON = JSON.stringify(transactionObjArr); 
            localStorage.setItem("transactionData", transactionObjJSON);
        }

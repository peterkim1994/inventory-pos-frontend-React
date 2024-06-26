class Helper {
    
    Constructor(){
    }

    getNumber = (event) => {
        let value =  event.target.value;
        return parseInt(value);
    }
    
    getFloat = (event) =>{
        let value =  event.target.value;
        let parsedValue = parseFloat(value);
        return Number.isNaN(parsedValue) ? 0.00 : parsedValue;
    }

    getDate = (date) =>{
        let d = new Date(date);
        return  `${d.getDate()}/${d.getMonth() + 1}/${d.getYear().toString().substring(1)}`; 
    }

    getTime =(date)=>{
        let d = new Date(date);
        return  `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`; 
    }

    getCurrentDate = () =>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today =  dd + '/' + mm + '/' + yyyy;
        return today;
    }

    getDateMinusDays = (days) =>{
        var aDate = new Date();
        aDate.setDate(aDate.getDate() - days);
        var dd = String(aDate.getDate()).padStart(2, '0');
        var mm = String(aDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = aDate.getFullYear();
        aDate =  dd + '/' + mm + '/' + yyyy;
        return aDate;
    }

    getStartofMonth = (month) => {
        var aDate = new Date();
        aDate.setDate(aDate.getDate());
        var dd = String(aDate.getDate()).padStart(2, '0');
        var mm = String( month + 1).padStart(2, '0');
        var yyyy = aDate.getFullYear();
        aDate =   '01/' + mm + '/' + yyyy;
        return aDate;
    }
}

export default new Helper();
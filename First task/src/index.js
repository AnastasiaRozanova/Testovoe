import service from './script/service'
import './css/reset.css'
import './css/style.css'
import './css/mobile.css'

(function(){
    // Список полей, которые попадут в таблицу
    const props = [
        "number",
        "priority",
        "status",
        "cs",
        "create",
        "change",
        "finish",
        "initsiator",
        "handler"
    ];        

    var btn = document.getElementById("filter_btn");
    btn.addEventListener('click', filterList);

    var searchbtn = document.getElementById("search_btn");
    searchbtn.addEventListener('click',  filterList);

    filterList();

    /**
     * Отфильтровать список 
     */
    function filterList(){             
        let data = service.getData(getFilter(), getSearchString());  
        renderTable(data, props);
    }

    /**
     * Отрисовать таблицу
     * @param {Array} data данные таблицы
     * @param {Array} props список полей и их порядок
     */
    function renderTable(data, props){
        const table = document.getElementById("table_body");
        table.innerHTML='';
        data.forEach(element => {            
            let tr = document.createElement('tr');
            
            // Записываем первую ячейку с checkbox
            let td = document.createElement('td');
            td.innerHTML='<input type="checkbox">';
            tr.appendChild(td);   

            // Записываем остальные ячейки
            props.forEach(prop => {
                let td = document.createElement('td');
                td.appendChild(document.createTextNode(element[prop]));
                tr.appendChild(td);
            }); 

            // Записываем последнюю ячейку
            let tdLast = document.createElement('td');
            tdLast.innerHTML='<i class="fa fa-angle-right" aria-hidden="true"></i>';
            tr.appendChild(tdLast);

            table.appendChild(tr);
        }); 
    }  

    /**
     * Получить данные из строки поиска
     */
    function getSearchString(){      
        return document.forms.search.searchString.value;
    }

    /**
     * Получить данные фильтров
     */
    function getFilter(){
        let filter = {};
        const form = document.forms.filter;
        filter.number = form.number.value
        filter.priority = form.priority.value
        filter.status = form.status.value
        filter.create = form.create.value
        filter.finish = form.finish.value

        return filter;
    }

}())



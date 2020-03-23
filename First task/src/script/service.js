import data from '../data'
/**
 * Сервис доступа к данным
 */
export default  {
    /**
     * Получить отфильтрованные данные
     * @param {} filter - фильтр
     * @param {string} searchString - строка для поиска
     */
    getData: (filter, searchString) => {
        let filteredData = data;

        if (filter) {
            // ToDo настроить фильтрацию по дате
            filteredData = data.filter(item =>
                   (!filter.number   || item.number.includes(filter.number))
                && (!filter.priority || item.priority === filter.priority)
                && (!filter.status   || item.status   === filter.status)
                && (!filter.create   || item.create.includes(filter.create))
                && (!filter.finish   || item.finish.includes(filter.finish))
            )
        }

        if (searchString) {
            // Ищем по всем полям объекта
            filteredData = filteredData.filter(item => {
                for (const key in item) {
                    if (item.hasOwnProperty(key)
                        && item[key].toLowerCase().includes(searchString.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            })
        }

        return filteredData;
    }
}



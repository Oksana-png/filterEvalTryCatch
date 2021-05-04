// принимает значение выбранного селектора и с данными
const filterByType = (type, ...values) =>
    values.filter((value) => typeof value === type), //используя filter выбираем все элементы массива, удовлетворябщие условию
  hideAllResponseBlocks = () => {
    const responseBlocksArray = Array.from(
      document.querySelectorAll("div.dialog__response-block")
    ); // делаем массив из найденной коллекции
    responseBlocksArray.forEach((block) => (block.style.display = "none")); //меняет у всех responseBlocksArray display на none
  },
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    hideAllResponseBlocks(); // вызываем фукнкцию hideAllResponseBlocks
    document.querySelector(blockSelector).style.display = "block"; // ищет на странице нужный селектор и устанавливает ему display = "block"
    if (spanSelector) {
      // если передан spanSelector
      document.querySelector(spanSelector).textContent = msgText; //ищем его, и записываем в textContent переданное сообщение
    }
  },
  showError = (msgText) =>
    showResponseBlock(".dialog__response-block_error", msgText, "#error"), //принимаем сообщение (msgText), и запускаем showResponseBlock с аргументами для вызова ошибки
  showResults = (msgText) =>
    showResponseBlock(".dialog__response-block_ok", msgText, "#ok"), // принимаем сообщение (msgText), и запускаем showResponseBlock с аргументами для вызова найденных результатов
  showNoResults = () => showResponseBlock(".dialog__response-block_no-results"), // вызываем фукнкцию, если данные не передали, передаем класс, при котором не будет результата поиска
  tryFilterByType = (type, values) => {
    // принимаем значение селектора и данных в input
    try {
      // выполняем
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //вызов функции filterByType с параметрами (селектор и данные) через eval(), полученный результат разделяем в массив, разделитель ', '
      const alertMsg = valuesArray.length
        ? `Данные с типом ${type}: ${valuesArray}` //если не нашлось данных (длина = 0), выполняем вторую часть тернарного оператора
        : `Отсутствуют данные типа ${type}`;
      showResults(alertMsg); // вызываем фукнцию и передаем туда alertMsg
    } catch (e) {
      // если произошла ошибка в блоке try, переходим в catch и выполняем его
      showError(`Ошибка: ${e}`); //вызываем фукнцию showError и передаем ошибку
    }
  };

const filterButton = document.querySelector("#filter-btn"); // ищем кнопку с id = "filter-btn"

filterButton.addEventListener("click", (e) => {
  // слушатель на кнопку, при нажатии опраделяются:
  const typeInput = document.querySelector("#type"); // selector для выборки
  const dataInput = document.querySelector("#data"); // поле с данными, которые мы записываем в input

  if (dataInput.value === "") {
    // если поле с даннымы пустое
    dataInput.setCustomValidity("Поле не должно быть пустым!"); // сообщение для dataInput, т.к. здесь есть пользовательская ошибка (не ввел данные)
    showNoResults(); //вызываем функцию
  } else {
    dataInput.setCustomValidity(""); // сообщение для dataInput, т.к. здесь есть данные, пользовательской ошибки не произошло
    e.preventDefault(); // не перезагружаем страницу
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // вызываем функцию tryFilterByType и передаем туда значение selector и данных, записанных в инпут, убирая пробелы с конца и начала
  }
});

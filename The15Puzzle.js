$(function(){
    var arrayCurrent;//Массив для игры
    var arrayVictory; //Массив для проверки на победу
    var colNull;var rowNull;//Переменные для определения координат пустого блока
    var blockSize=70;

    function step(direction){
         //Определяем индекс пустого блока в массиве
        for (var i = 0; i < 15; i++){
            if (arrayCurrent[i] == ''){
                break; //Выход, если пустой блок найден
            };
        };
        //Перемещаем пустой (или нажатый) блок 
        switch(direction){
            case'left':{
                $('.block' + arrayCurrent[i - 1]);
                arrayCurrent[i] = arrayCurrent[i - 1];
                arrayCurrent[i - 1] = '';
                colNull--;
                i--;
            }break;
            case'right':{
                $('.block' + arrayCurrent[i + 1]);
                arrayCurrent[i] = arrayCurrent[i + 1];
                arrayCurrent[i + 1] = '';
                colNull++;
                i++;
            }break;
            case'up':{
                $('.block' + arrayCurrent[i - 4]);
                arrayCurrent[i] = arrayCurrent[i - 4];
                arrayCurrent[i - 4] = '';
                rowNull--;
                i -= 4;
            }break;
            case'down':{
                $('.block' + arrayCurrent[i + 4]);
                arrayCurrent[i] = arrayCurrent[i + 4];
                arrayCurrent[i + 4] = '';
                rowNull++;
                i += 4;
            }break;
        };
    };

    function write(){
        for(var i = 0; i < 15; i++){
            arrayCurrent.push(arrayCurrent[i]);//Перезапись массива
            $('.block').each(function(){        
                $(this).text(arrayCurrent[i]); //Меняем значения блоков
                i++;
            });  
        };
    };

    function newgame(){
        arrayCurrent = []; arrayVictory = []; //Обнуляем массивы
        ///Перебираем все созданные блоки, заполняем их значениями и формируем массивы
        $('.block').each(function(i){       
            if(i < $('.block').length - 1){
                arrayCurrent.push(i + 1);
                arrayVictory.push(i + 1);
                $(this).text(i + 1);
            }
            else{
                arrayCurrent.push('');
                arrayVictory.push('');
                $(this).text('');
            };    
        });
        //Определяем коoрдинаты пустого блока 
        $('.block').each(function(){    
            if($(this).text() == ''){
                rowNull = Math.ceil((parseInt($(this).css('top')) + 1) / blockSize); 
                colNull = Math.ceil((parseInt($(this).css('left')) + 1) / blockSize);
            };
        });
        var blockDirection;
        var iteration = 0;
        do{
            iteration++;
            //Определяем направление перемещения пустого блока
            blockDirection = Math.floor(Math.random() * (4) + 1);
            switch(blockDirection){
                case 1:{ 
                    if(colNull - 1 > 0){
                        step('left');
                    };
                }break;
                case 2:{ 
                    if(colNull + 1 <= 4){
                        step('right');
                    };
                }break;
                case 3:{ 
                    if(rowNull - 1 > 0){
                       step('up');
                    };
                }break;
                case 4:{ 
                    if(rowNull + 1 <= 4){
                        step('down');
                    };
                }break;
            };
        }while(iteration < 50); //Количество повторов
        write();
    };

    //Формируем блоки игрового поля
    for (var x = 1; x <= 4; x++){
        for (var y = 1; y <= 4; y++){
            $('<div></div>')
                .addClass('block')
                    .attr('id', x.toString() + '-' + y.toString())
                        .css({ top:(x - 1)*blockSize, left:(y - 1)*blockSize})
                            .appendTo('#field')
        };
    };
    newgame(); // Заполняем и перемешиваем блоки при загрузке страницы
    
    //Перемешиваем блоки при нажатии на кнопку "Новая игра"	
    $('#newGame').on('click', function(){
        newgame();
    });

    //Передвигаем нажатый блок
    $('.block').on('click', function(){
        //Определяем координаты нажатого блока
        var rowPush = Math.ceil((parseInt($(this).css('top')) + 1) / blockSize);
        var colPush = Math.ceil((parseInt($(this).css('left')) + 1) / blockSize);

        //Определяем координаты пустой блока
        $('.block').each(function(){
            if($(this).text() == ''){
                rowNull = Math.ceil((parseInt($(this).css('top')) + 1) / blockSize); 
                colNull = Math.ceil((parseInt($(this).css('left')) + 1) / blockSize);
            };
        });

        //Определяем, в какую сторону можно переместить блок и перемещаем его 
        if((colNull - colPush == 1) && (rowNull - rowPush == 0)){
            step('left'); 
        }else if((colPush - colNull == 1) && (rowNull - rowPush == 0)){
            step('right');
        }else if((colPush - colNull == 0) && (rowNull - rowPush == 1)){
            step('up');
        }else if((colPush - colNull == 0) && (rowPush - rowNull == 1)){
            step('down');
        };
        write();

        //Проверка на победу
        var victory = true;
        for(var i = 0; i <= 15; i++){
            //Если значения сформированного и исходного массивов не совпадают, меняем значение переменной
            if(arrayVictory[i] !== arrayCurrent[i]){
             	victory = false;
             	break;   	
            };
        };
        //Если значение переменной не изменилось, объявляем о победе
        if(victory){
            alert("Вы победили!")
        };    
    });
})
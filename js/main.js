// 1. Создаём новый XMLHttpRequest-объект
let xhr = new XMLHttpRequest();

// 2. Настраиваем его
xhr.open('GET', 'https://msheiko.github.io/js/dz/F1021/json/1.json'); 

// 3. Отсылаем запрос
xhr.send();

// 4. Этот код сработает после того, как мы получим ответ сервера
xhr.onload = function() {
    console.log('Onload');
    const result = xhr.response; //  Получаем ответ, это JSON строка
    const object = JSON.parse(result); // Преобразуем строку в JS объект
    const sortedByTitles = object.albums.sort( (a,b) => { 
        if ( a.title > b.title){
            return 1
        }
        else if( a.title < b.title){
            return -1
        }
        return 0
    })
    
    const sortedBySize = object.images.filter( img => img.width > parseInt('800px') && img.height > parseInt('800px'))

    object.albums.forEach( album => { 
        album.user = object.users.filter( user => user.id === album.authorId)
    })

    object.albums.forEach ( album => {
        album.images = object.images.filter( image => album.images.find( album => album.images === image.imageId) )
    })
    const sortedByLength = object.albums.filter( album => album.images.length > 5 )
    
    console.log('отсортированный объект по именам',sortedByTitles);  // 
    console.log('отсортированный объект по размеру',sortedBySize); // 
    console.log('Добавьте свойство user куда поместите объект соответствующего автора (id автора == id пользователя): \n',object)
    console.log(object.albums.images.length)
};

// Этот код сработает если мы не получим ответ от сервера
xhr.onerror = function() {
  console.error("Запрос не удался");
};
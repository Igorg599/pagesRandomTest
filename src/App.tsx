import React from 'react';
import axios from 'axios';


const App: React.FC = () => {
  const [title, setTitle] = React.useState<string>('');
  const [disabledStatus, setDisabletStatus] = React.useState<boolean>(false);
  const [pageList, setPageList] = React.useState<Array<string>>([]);
  const [tagNames, setTagNames] = React.useState<Array<string>>([]);
  const [grouping, setGrouping] = React.useState<boolean>(false);
  const [tagText, setTagText] = React.useState<string>('Введите тег');
  const [arrayPages, setArrayPages] = React.useState<Array<Array<string>>>([]); 
  
  let loading:string;
  let group:string;
  let arraystr:Array<string>;
  let pageNumber:number = 0;

  if (grouping === false) {
    group = 'Группировать'
  } else {
    group = 'Разгруппировать'
  }

  if (disabledStatus === false) {
      loading = 'Загрузить'
  } else {
      loading = 'Загрузка...'
  }

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value.replace(/[^a-z,A-Z]/g, ''));
  }

  const getPages = (tag:string) => {
    if (title.search('delay') !== -1) {
      const abc = "abc";
      let rs = "";
      setInterval(() => {
        while (rs.length < 3) {
          rs += abc[Math.floor(Math.random() * abc.length)];
        }
        tagNames.push(rs);
        arraystr = rs.split(",");
        arrayPages.push(arraystr);
        searchPages(rs, true);
      }, 5000);
    } else {
      if (title.search(',') !== -1) {
        arraystr = tag.split(",");
        arraystr.forEach(item => {
          searchPages(item, false);
          tagNames.push(item);
        });
        arrayPages.push(arraystr);
      } else {
        arraystr = tag.split(",")
        searchPages(tag, false);
        tagNames.push(tag);
        arrayPages.push(arraystr);
      }
    }
  }

  const searchPages = (url:string, bool:boolean) => {
    axios.get(`https://api.giphy.com/v1/gifs/random?api_key=gTJAO48YcpmrADUyo4opy4ES4g7iDBxx&tag=${url}`) 
      .then((data) => {
        console.log(data);
        if (data.data.data.length === 0) {
          arrayPages.pop();
          tagNames.pop();
          setDisabletStatus(false);
          setTitle(' ');
          setTitle('');
          alert(`По тегу ${url} ничего не найдено`);
        } else {
            pageList.push(data.data.data.image_url);
            setTitle(' ');
            setTitle('');
            setDisabletStatus(bool);
        }
      })
      .catch(() => alert(`Произошла http ошибка`))
  }

  const onSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (title === '') {
        alert('Заполните поле "тег"');
      } else {
        getPages(title);
        setDisabletStatus(true);
        setTitle('');
      }
      
  }

  const onClearPages = () => {
    setPageList([]);
    setTagNames([]);
    setArrayPages([]);
  }

  return (
    <div className="container">
        <form onSubmit={onSubmit} className="header" onClick={() => setTagText('Введите тег')}> 
            <input
                onChange={onValueChange}
                value={title}
                type="text"
                placeholder={tagText}
                className="header__input"
            />
            <button disabled={disabledStatus} className="header__button" type="submit">
                {loading}
            </button>
            <button className="header__button" type="button" onClick={onClearPages}>
                Очистить
            </button>
            <button className="header__button" type="button" onClick={() => {setGrouping(!grouping)}}>
                {group}
            </button>
        </form>
        <div className="pagelist">
          {grouping ? 
          tagNames.filter((item, index) => tagNames.indexOf(item) === index).map((i, index) => (
            <div key={index} className="pagelist__group">
              <h3>{i}</h3>
              {pageList.filter((_, index) => tagNames[index] === i).map((item, index) => (
                <img alt='img' key={index} src={item}/>
              ))}
              
            </div>
          )) :
          arrayPages.map((item, index) => (
            <div key={index} className="pagelist__item">
              {item.map((_, i) => (
                <div className="pagelist__item-image">
                  <img alt='Img' height={190/item.length} key={i} src={pageList[pageNumber++]} onClick={() => setTagText(tagNames[index])}/>
                </div>
              ))}
            </div>
          ))}
        </div>
    </div>
  )
}

export default App;




function Items({items , title}) {
    return (

        <div className="menu__left__items">
        <span className="menu__left__items__title">{title}</span>
        {items.map((item, index) => (
          <div key={index} className="menu__left__items__item">
            <img src={item.image} alt="" />
            <div className="menu__left__items__item__text">
              <span className="menu__left__items__item__text__name">
                {item.name}
              </span>
              <span className="menu__left__items__item__text__desc">
                {item.text}
              </span>
            </div>
          </div>
        ))}
      </div>
      );
}

export default Items;
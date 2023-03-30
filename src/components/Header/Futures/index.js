import Future from "./Future";
function Futures({futures , fcShowFutures , typeOther}) {
    return ( <div className='account__futures'>
    {futures.map((future,index) => (
       <Future typeOther={typeOther} fcShowFutures={fcShowFutures} key={index} future={future}/>
    ))}
</div> );
}

export default Futures;
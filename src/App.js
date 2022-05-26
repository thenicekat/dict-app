import { useState, useEffect } from 'react';
import './App.css';
import 'tachyons';

function App() {
  const [input, setInput] = useState('');
  const [meaning, setMeaning] = useState('');
  const [error, setError] = useState('');
  const [color, setColor] = useState('#96ccff');

  useEffect(() => {
    const localColor = localStorage.getItem("color");
    if(localColor){
      setColor(localColor);
    }
  }, [color])

  const onButtonClick = (e) => {
    e.preventDefault();
    console.log(input);
    //Future Update: Find set of all possible words possible and give result
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
    .then(resp => resp.json())
    .then(answer => {
      setMeaning(answer[0]["meanings"])
      setError('');
    })
    .catch(err => {
      setError("Error: " + err);
      setMeaning('');
    });
  }

  const onInputChange = (e) => {
    setInput(e.target.value);
  }

  const changeColor = (color) => {
    setColor(color);
    localStorage.setItem("color", color);
    console.log("Saved Color");
  }


  return (
    <div className="App">

      <div className='App-header'>
      <div className="pa4-l">
        <form className="mw7 center pa4 br2-ns ba b--black-10" style={{"background": color}}>
          <h3 className='black'>Dictionary App<br />(which practically does nothing)</h3>
          <hr className='black b--black-10'/>
          <div>
            <span className='bg-blue circle' onClick={() => changeColor("#96ccff")}></span>
            <span className='bg-red circle' onClick={() => changeColor("#ff725c")}></span>
            <span className='bg-yellow circle' onClick={() => changeColor("#fbf1a9")}></span>
            <span className='bg-green circle' onClick={() => changeColor("#9eebcf")}></span>
          </div>
          <hr className='black b--black-10'/>
          <fieldset className="cf bn ma0 pa0">
            <legend className="pa0 f5 f4-ns mb3 black-80"><b>Enter any word :)</b></legend>
            <div className="cf">
              <label className="clip" htmlFor="email-address">Letters</label>
              <input className="f6 f5-l input-reset bn fl black-80 bg-white pa3 w-100 w-60-m w-80-l br2-ns br--left-ns" placeholder="Enter letters" type="text" name="letters" value={input} id="letters" onChange={onInputChange}/>
              <input className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-40-m w-20-l br2-ns br--right-ns" type="submit" value="Enter" onClick={onButtonClick} />
            </div>
            <div className="cf pa2">
              {meaning ? 
                meaning.map(item => {
                  return (
                    <div>
                      <legend className="pa2 f5 f4-ns mb3 black-80 center" key={item.key}><b><u>{item.partOfSpeech}</u></b> : {item.definitions[0].definition} </legend>
                    </div>
                  )
                })
                : null
              }
              <legend className="pa2 f5 f4-ns mb3 black"><b>{error}</b></legend>
            </div>
          </fieldset>
        </form>
      </div>
      </div>

    </div>
  );
}

export default App;

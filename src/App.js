import { Component } from "react";

// import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }
  componentDidMount() {
    fetch("http://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            console.log(this.state);
          }
        )
      );
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  }

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(
        searchField.toLocaleLowerCase()
      );
    });

    return (
      <div className="App">
        <input
          className="search-box"
          type="search"
          placeholder="search-monster"
          onChange={onSearchChange}
        />
        {filteredMonsters.map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;


// import { useState, useEffect } from "react";

// const App = () => {
//   const [monsters, setMonsters] = useState([]);
//   const [searchField, setSearchField] = useState("");

//   useEffect(() => {
//     fetch("http://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) => setMonsters(users));
//   }, []);

//   const filteredMonsters = monsters.filter((monster) =>
//     monster.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase())
//   );

//   return (
//     <div className="App">
//       <input
//         className="search-box"
//         type="search"
//         placeholder="search-monster"
//         onChange={(event) => {
//           console.log(event.target.value);
//           setSearchField(event.target.value);
//         }}
//       />
//       {filteredMonsters.map((monster) => (
//         <div key={monster.id}>
//           <h1>{monster.name}</h1>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default App;

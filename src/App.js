import { Component } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box";
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
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name
        .toLocaleLowerCase()
        .includes(searchField.toLocaleLowerCase());
    });

    return (
      <div className="App">
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
          className="monsters-search-box"
        />

        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;

// import { useState, useEffect } from "react";

// import CardList from "./components/card-list/card-list.component";
// import "./App.css";

// const App = () => {
//   const [monsters, setMonsters] = useState([]);
//   const [searchField, setSearchField] = useState("");

//   useEffect(() => {
//     fetch("http://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) => setMonsters(users));
//   }, []);

//   const onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     setSearchField(searchField);
//   };

//   const filteredMonsters = monsters.filter((monster) => {
//     return monster.name.toLocaleLowerCase().includes(
//       searchField.toLocaleLowerCase()
//     );
//   });

//   return (
//     <div className="App">
//       <input
//         className="search-box"
//         type="search"
//         placeholder="search-monster"
//         onChange={onSearchChange}
//       />

//       <CardList monsters={filteredMonsters}/>
//     </div>
//   );
// };

// export default App;
